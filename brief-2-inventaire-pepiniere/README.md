# Inventaire de la pépinière

> Projet individuel du SAS DFS, brief 2 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

L'outils est utilisé par un assitant de pepinière et développeur Agritech Junior. Son geste professionnel est d'observer les étiquettes et les organes présentés, reproduire la classification fournie, compter les plants. Son besoin est de structurer un inventaire et appliquer une classification botanique simple à partir d'une fiche de référence. Il saisira l'origine du relevé (étiquette, photo ou spécimen, qui a compté, quand). Le programme lui permettra de retrouver une espèce, lire son groupe botanique fourni et voir les quantités disponibles.


## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-2-inventaire-pepiniere.git
cd brief-2-inventaire-pepiniere
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [ ] Données lues et enregistrées dans `donnees/plants.json`
- [ ] Ajouter un plant, saisies invalides refusées sans arrêter le programme
- [ ] Lister l'inventaire, message si l'inventaire est vide
- [ ] Rechercher par code ou par nom ; filtrer par groupe botanique
- [ ] Trier par nombre de plants
- [ ] Synthèse : stock total, espèces et plants par groupe, espèce la plus abondante, stocks faibles (≤ 10 plants)
- [ ] Bonus : supprimer et modifier un plant (choix 6 et 7)
- [ ] Bonus : tri décroissant, groupe le plus fourni

## Données

✏️ *Le fichier, le nombre de lignes, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), l'unité. Rappelez qu'elles sont fictives et que les groupes sont fournis par le coach.*

## Limites

✏️ *Au moins trois. Par exemple : le seuil de 10 plants est un repère de suivi, pas une recommandation de production.*

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *Prénom NOM, compte GitHub. Entraide : avec qui, sur quoi.*
Hire Etienne NEMLIN, https://github.com/nemlinhireetienne-create
Entraide : Avec quelques membres ayant le projet 2 (Inventaire d'une pépinière) dont Abdallah SALIA, KONATE Kaba, Patrick KOUAMELAN, Ducelvie BATSIMBA, Sitafa TOURE, Arnaud DOGBE, Adama KONATE, Latifatou sur la comprehension générale du sujet.