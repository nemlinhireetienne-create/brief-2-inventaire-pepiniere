# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | N01 |
| `nomCommun` | | |obligatoire : n'importe quel texte non vide |Kg |Cacao |
| `nombrePlants` | |Entier |un nombre entier positif ou nul : '2,5', '-3', 'douze' et '' sont refusés | |'2.5', '3', '75' |
| `dateReleve` | | |une date qui existe, au format AAAA-MM-JJ | |2026-10-24 |
| `groupe` | | | présent dans GROUPES| | gymnosperme|

**Listes de valeurs autorisées** : Groupe : Angiospermes ou gymnospermes

**Sources** : Plants.json et Sujet.md
