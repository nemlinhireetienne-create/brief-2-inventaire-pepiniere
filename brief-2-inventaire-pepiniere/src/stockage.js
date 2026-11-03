// Lire et écrire les données dans un fichier JSON. À coder EN PREMIER : le menus en a besoin pour démarrer.
// Fiche : fiches/2-donnees-json.md · Vérifier : npm run test:stockage
import { readFile, writeFile } from 'node:fs/promises';

// Lit le fichier JSON et renvoie le tableau qu'il contient.
// Si le fichier n'existe pas ou n'est pas du JSON valide, laissez l'erreur remonter : le menu l'affichera.
export async function chargerJson(chemin) {
  const contenu = await readFile(chemin, 'utf-8');

  return JSON.parse(contenu);
}

// Écrire le tableau dans le fichier JSON.
export async function enregistrerJson(chemin, enregistrements) {
  const contenu = JSON.stringify(enregistrements, null, 2);

  await writeFile(chemin, contenu, 'utf-8');
}
