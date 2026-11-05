// Inventaire de la pépinière — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
// Inventaire de la pépinière — point d'entrée : le menu.
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { GROUPES, ajouterPlant, formaterPlant, listerPlants, trouverParId } from './src/registre.js';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from './src/recherche.js';
import { SEUIL_STOCK_FAIBLE, especeLaPlusAbondante, stocksFaibles, syntheseParGroupe, totalPlants } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/plants.json';

async function main() {
  ouvrirSaisie();

  // --- Accueil ---
  console.log('==================================================');
  console.log('   INVENTAIRE DE LA PÉPINIÈRE');
  console.log('   Pépinière pédagogique');
  console.log('==================================================');

  // --- Chargement des données ---
  let plants = [];
  try {
    plants = await chargerJson(FICHIER_DONNEES);
    console.log(`${plants.length} espèce(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
  } catch (err) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${err.message}. L'inventaire démarre vide.`);
    plants = [];
  }

  // --- Boucle principale du menu ---
  let continuer = true;
  while (continuer) {
    console.log('');
    console.log('--------------------- MENU ---------------------');
    console.log('1. Ajouter un plant');
    console.log('2. Lister l\'inventaire');
    console.log('3. Rechercher (code, nom, groupe)');
    console.log('4. Trier (nombre de plants)');
    console.log('5. Synthèse des quantités');
    console.log('0. Quitter');

    const choix = await demander('Votre choix : ');

    if (choix === null) {
      // Ctrl+C
      continuer = false;
      break;
    }

    try {
      switch (choix) {
        case '1':
          await actionAjouter(plants);
          break;
        case '2':
          actionLister(plants);
          break;
        case '3':
          await actionRechercher(plants);
          break;
        case '4':
          await actionTrier(plants);
          break;
        case '5':
          actionSynthese(plants);
          break;
        case '0':
          console.log('Au revoir !');
          continuer = false;
          break;
        default:
          console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
      }
    } catch (err) {
      const msg = err.message || String(err);
      if (msg.startsWith('TODO')) {
        console.log(`À compléter : ${msg}`);
      } else {
        console.log(`Erreur inattendue : ${msg}`);
      }
    }
  }

  fermerSaisie();
}

// -------------------- Choix 1 : Ajouter --------------------
async function actionAjouter(plants) {
  console.log('--- Ajouter un plant ---');

  const idBrut = await demander('Code du plant (ex. N11) : ');
  if (idBrut === null) return;

  const nomBrut = await demander('Nom commun (ex. papayer) : ');
  if (nomBrut === null) return;

  const groupeBrut = await demander(`Groupe botanique (${GROUPES.join(' ou ')}) : `);
  if (groupeBrut === null) return;

  const nombreBrut = await demander('Nombre de plants (entier) : ');
  if (nombreBrut === null) return;

  const dateBrut = await demander('Date du relevé (AAAA-MM-JJ) : ');
  if (dateBrut === null) return;

  // Normalisation demandée par la fiche
  const saisie = {
    id: idBrut.toUpperCase(),
    nomCommun: nomBrut.toLowerCase(),
    groupe: groupeBrut.toLowerCase(),
    nombrePlants: nombreBrut,
    dateReleve: dateBrut
  };

  const erreurs = ajouterPlant(plants, saisie);

  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, plants);
    console.log(`Plant ${saisie.id} ajouté. L'inventaire compte ${plants.length} espèce(s).`);
  } else {
    console.log('Ajout refusé :');
    for (const e of erreurs) {
      console.log(`  - ${e}`);
    }
    console.log(`L'inventaire compte toujours ${plants.length} espèce(s).`);
  }
}

// -------------------- Choix 2 : Lister --------------------
function actionLister(plants) {
  console.log(`--- Inventaire (${plants.length} espèce(s)) ---`);
  console.log(listerPlants(plants));
}

// -------------------- Choix 3 : Rechercher --------------------
async function actionRechercher(plants) {
  console.log('--- Rechercher ---');
  console.log('1. Par code');
  console.log('2. Par nom commun');
  console.log('3. Les espèces d\'un groupe botanique');

  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) return;

  if (sousChoix === '1') {
    const codeBrut = await demander('Code : ');
    if (codeBrut === null) return;
    const code = codeBrut.toUpperCase();
    const plant = trouverParId(plants, code);
    if (plant) {
      console.log(formaterPlant(plant));
    } else {
      console.log(`Plant ${code} introuvable.`);
    }
  } else if (sousChoix === '2') {
    const texteBrut = await demander('Nom ou partie du nom : ');
    if (texteBrut === null) return;
    const texte = texteBrut.toLowerCase();
    const resultats = rechercherParNom(plants, texte);
    console.log(`${resultats.length} espèce(s) dont le nom contient « ${texte} » :`);
    console.log(listerPlants(resultats));
  } else if (sousChoix === '3') {
    const groupeBrut = await demander('Groupe (angiosperme ou gymnosperme) : ');
    if (groupeBrut === null) return;
    const groupe = groupeBrut.toLowerCase();
    const resultats = filtrerParGroupe(plants, groupe);
    console.log(`${resultats.length} espèce(s) du groupe ${groupe} :`);
    console.log(listerPlants(resultats));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

// -------------------- Choix 4 : Trier --------------------
async function actionTrier(plants) {
  console.log('--- Trier ---');
  console.log('1. Par nombre de plants croissant');

  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) return;

  if (sousChoix === '1') {
    const tries = trierParNombrePlants(plants);
    console.log(listerPlants(tries));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

// -------------------- Choix 5 : Synthèse --------------------
function actionSynthese(plants) {
  console.log('--- Synthèse de l\'inventaire ---');
  console.log(`Nombre d'espèces : ${plants.length}`);
  console.log(`Stock total : ${totalPlants(plants)} plants`);

  console.log('Par groupe botanique :');
  const synthese = syntheseParGroupe(plants);
  for (const [groupe, infos] of Object.entries(synthese)) {
    console.log(`  ${groupe} : ${infos.especes} espèce(s), ${infos.plants} plants`);
  }

  const plusAbondante = especeLaPlusAbondante(plants);
  if (plusAbondante) {
    console.log(`Espèce la plus abondante : ${formaterPlant(plusAbondante)}`);
  } else {
    console.log('Espèce la plus abondante : aucune donnée');
  }

  const faibles = stocksFaibles(plants, SEUIL_STOCK_FAIBLE);
  console.log(`Stocks faibles (≤ ${SEUIL_STOCK_FAIBLE} plants) : ${faibles.length}`);
  if (faibles.length > 0) {
    console.log(listerPlants(faibles));
  }
  console.log(`Rappel : le seuil de ${SEUIL_STOCK_FAIBLE} plants est un repère pédagogique de suivi, pas une recommandation de production.`);
}

main();