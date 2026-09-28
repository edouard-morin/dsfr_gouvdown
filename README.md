![Experimental](https://img.shields.io/badge/status-Experimental-orange)
[![R](https://img.shields.io/badge/R-276DC3?logo=r&logoColor=white)](https://www.r-project.org/)
[![R Markdown](https://img.shields.io/badge/R%20Markdown-75AADB?logo=r&logoColor=white)](https://rmarkdown.rstudio.com/)

# dsfr_gouvdown

Dépôt prépraratoire à l'intégration d'une présentation DSFR gitbook dans le package R gouvdown (https://github.com/spyrales/gouvdown)

## Utilisation
Afin d’utiliser le composant `dsfr_gouvdown`, dans votre gitbook, il est necessaire d'avoir l'ensemble des fichiers du dépôt dans _book/libs/gouvdown-default-0.0.0.9001/ tels que :


_book/libs/gouvdown-default-0.0.0.9001/

├── hidden.css

├── dsfrinmygitbookgouvdown.js

└── dsfr_1_15_min/dist/
    

Ensuite, il faut que le contenu du fichier dsfr_gouvdown.html soit dans le head de vos pages html.
Une façon d'y parvenir est d'appeler le fichier dsfr_gouvdown.html dans votre _output.yml :


```yml
bookdown::gitbook:
  includes:
    in_header: dsfr_gouvdown.html
```

Téléchargé le fichier depuis : https://github.com/edouard-morin/dsfr_gouvdown/blob/main/dsfr_gouvdown.html

Cette version de test est basée sur la version 1.15 du dsfr (https://www.systeme-de-design.gouv.fr)

Vous pouvez paramétrer le logo, le titre, le sous-titre et la phrase de pied de page directement depuis les méthadonnées du fichier dsfr_gouvdown.html, sinon il sont définis automatiquement.

```html
<!-- Intitulé du logo mariane, exemple : "Préfet <br>de la région <br>Pays de la Loire". !-->
<!-- par défaut, "République <br>Française" !-->
<meta property="gd_dsfr:intitule_logo" content="">
<!-- Titre du document dans l'en-tête. par défaut, le titre dans le yaml du gitbook. !-->
<!-- A remplir uniquement si on souhaite un titre plus court. !-->
<meta property="gd_dsfr:titre_doc" content="">
<!-- Sous-titre du document dans l'en-tête. par défaut, vide. !-->
<!-- A remplir uniquement si on souhaite un sous titre. !-->
<meta property="gd_dsfr:sous_titre_doc" content="">
<!-- Phrase visible dans le pied de page. par défaut, vide. !-->
<!-- A remplir uniquement si on souhaite remplir le pied de page. !-->
```
