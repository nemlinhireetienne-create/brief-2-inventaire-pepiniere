# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : refaites à la main les résultats de référence de `SUJET.md`, puis comparez avec votre programme. 
Angiosperme : 30+45+20+50+25+18+12+22 = 222
Total plants angiosperme : 222 plants et espèces: 8
Gymnospermes : 8+10 = 18
Total plants gymnospermes : 18 et espèces: 2
stock total : 240 plants ; angiospermes : 8 espèces, 222 plants ; gymnospermes : 2 espèces, 18 plants ;

Ligne à 10 plans ou moins : 
N09 : nombrePlants 8
N10 : nombrePlants 10

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| Ajout plan N14 |Plan N14 ajouté |L'inventaire compte 11 espèces |Hire Etienne NEMLIN |
| Ajout id existant existant |Ajout réfusé : Id déjà existant |Ajout refusé |Hire Etienne NEMLIN |
| Ajout nombre décimal(2.6) |Ajout refusé :Le nombre de plants doit être un nombre entier positif ou nul  |Ajout refusé |Hire Etienne NEMLIN |
| Ajout groupe invalide |Ajout refusé : Le groupe botanique est invalide. | Ajout refusé|Hire Etienne NEMLIN |
| Ajout date invalide |Ajout refusé : La date du relevé est invalide |Ajout refusé |Hire Etienne NEMLIN |
| Recherche code N16 |Plan N16 introuvable. |Plant N16 introuvable |Hire Etienne NEMLIN |

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : Florent KONAN
