
// Lire et écrire les données dans un fichier JSON.
import { readFile, writeFile } from 'node:fs/promises';

// Lire le fichier JSON et renvoyer le tableau qu'il contient.
export async function chargerJson(chemin) {
  const contenu = await readFile(chemin, 'utf-8');

  return JSON.parse(contenu);
}

// Écrire le tableau dans le fichier JSON.
export async function enregistrerJson(chemin, enregistrements) {
  const contenu = JSON.stringify(enregistrements, null, 2);

  await writeFile(chemin, contenu, 'utf-8');
}
