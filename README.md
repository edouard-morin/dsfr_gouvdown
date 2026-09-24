# dsfr_gouvdown

## Utilisation
Afin d’utiliser le composant `dsfr_gouvdown`, dans votre gitbook, il est necessaire d'appeler le fichier comp_dsfr.html dans votre _output.yml :\n

```yml
bookdown::gitbook:
  includes:
    in_header: comp_dsfr.html
```
**C'est le seul fichier que vous avez à charger dans votre projet Bookdown, tout le reste est appelé en ligne !!!**

Cette version de test est basée sur la version 1.15 du dsfr (https://www.systeme-de-design.gouv.fr)

Vous pouvez paramétrer le logo, le titre, le sous-titre et la phrase de pied de page directement depuis le fichier comp_dsfr.html, sinon il sont définis automatiquement.

```js
// Intitulé du logo mariane, exemple : "Préfet <br>de la région <br>Pays de la Loire". 
// par défaut, "République <br>Française"
const intitule_logo = "";
// Titre du document dans l'en-tête. par défaut, le titre dans le yaml du gitbook.
// A remplir uniquement si on souhaite un titre plus court.
const titre_doc = "";
// Sous-titre du document dans l'en-tête. par défaut, vide.
// A remplir uniquement si on souhaite un sous titre.
const sous_titre_doc = "";
// Phrase visible dans le pied de page. par défaut, vide.
// A remplir uniquement si on souhaite remplir le pied de page.
const sentence_footer_doc = "";
```