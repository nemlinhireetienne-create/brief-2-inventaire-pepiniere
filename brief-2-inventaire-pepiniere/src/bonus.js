// BONUS — Pour aller plus loin.
// Fiche : fiches/7-bonus.md · Vérifier : npm run test:bonus
import { versNombre } from './outils.js';
import { trouverParId, verifierPlant } from './registre.js';
import { syntheseParGroupe } from './synthese.js';

// Les champs qu'on a le droit de modifier. L'identifiant n'en fait pas partie.
export const CHAMPS_MODIFIABLES = ['nomCommun', 'groupe', 'nombrePlants', 'dateReleve'];

/**
 * Supprime de l'inventaire le plant qui a cet identifiant.
 * Renvoie le plant supprimé, ou undefined s'il n'existe pas.
 */
export function supprimerPlant(plants, id) {
  const index = plants.findIndex((plant) => plant.id === id);
  if (index === -1) {
    return undefined;
  }
  const [retire] = plants.splice(index, 1);
  return retire;
}

/**
 * Modifie un champ d'un plant.
 * valeur arrive sous forme de TEXTE.
 * Renvoie un tableau d'erreurs : [] si la modification est faite.
 */
export function modifierPlant(plants, id, champ, valeur) {
  const plant = trouverParId(plants, id);
  if (!plant) {
    return [`Plant ${id} introuvable.`];
  }

  if (champ === 'id') {
    return [`Le champ « id » n'est pas modifiable.`];
  }
  if (!CHAMPS_MODIFIABLES.includes(champ)) {
    return [`Champ « ${champ} » inconnu ou non modifiable.`];
  }

  // Prépare une saisie pour réutiliser verifierPlant
  // (on garde l'id du plant pour qu'il ne soit pas vu comme un doublon)
  const saisieTest = {
    id: plant.id,
    nomCommun: champ === 'nomCommun' ? valeur : plant.nomCommun,
    groupe: champ === 'groupe' ? valeur : plant.groupe,
    nombrePlants: champ === 'nombrePlants' ? valeur : String(plant.nombrePlants),
    dateReleve: champ === 'dateReleve' ? valeur : plant.dateReleve
  };

  // Inventaire temporaire sans le plant courant
  const plantsSansLui = plants.filter((p) => p.id !== id);
  const erreurs = verifierPlant(saisieTest, plantsSansLui);

  if (erreurs.length > 0) {
    return erreurs;
  }

  // Application de la modification
  if (champ === 'nombrePlants') {
    plant.nombrePlants = versNombre(valeur);
  } else {
    plant[champ] = valeur;
  }

  return [];
}

/**
 * Renvoie une COPIE triée par nombre de plants décroissant.
 */
export function trierParNombrePlantsDecroissant(plants) {
  return [...plants].sort((a, b) => b.nombrePlants - a.nombrePlants);
}

/**
 * Renvoie { groupe, plants } pour le groupe qui a le plus de plants,
 * ou null si l'inventaire est vide.
 * En cas d'égalité, garde le premier groupe rencontré.
 */
export function groupeLePlusFourni(plants) {
  if (plants.length === 0) {
    return null;
  }

  const synthese = syntheseParGroupe(plants);
  let meilleur = null;

  for (const [groupe, infos] of Object.entries(synthese)) {
    if (meilleur === null || infos.plants > meilleur.plants) {
      meilleur = { groupe, plants: infos.plants };
    }
  }

  return meilleur;
}