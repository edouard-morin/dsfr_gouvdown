/*
dsfrinmygitbookgouvdown.js
Copyright (c) 2026, DREAL Pdl, Edouard MORIN
Ce fichier a été développé avec l'assistance d'une intelligence artificielle.
License MIT - LICENSE.txt
*/
// version dsfr basé sur shinygouv
// version 1.15.3 sur intranet
const urlcssdsfr = ["https://cdn.jsdelivr.net/gh/edouard-morin/dsfr_gouvdown@main/dsfr.min.css","https://cdn.jsdelivr.net/gh/edouard-morin/dsfr_gouvdown@main/utility/utility.min.css"];
const urljsdsfr = "https://cdn.jsdelivr.net/gh/edouard-morin/dsfr_gouvdown@main/dsfr.module.min.js";
const urljsdsfr_nomodule = "https://cdn.jsdelivr.net/gh/edouard-morin/dsfr_gouvdown@main/dsfr.nomodule.min.js";
// création d'un élément spinner en attentandant la refonte du html
const loading = document.createElement("div");
loading.id = "loading";
loading.innerHTML = `<div class="spinner"></div>`;

// récupération variables
const logo = (typeof intitule_logo !== "undefined" && intitule_logo.trim() !== "")
  ? intitule_logo.replace(/\n/g, "<br>")
  : "République <br>Française";
function definirTitre() {
  const titrePage =
    document.querySelector("head > title")?.textContent.trim() || "";

  return (typeof titre_doc !== "undefined" ? titre_doc?.trim() : "") ||
    (titrePage.includes("|")
      ? titrePage.split("|").slice(1).join("|").trim()
      : titrePage);
}
const titre = definirTitre();
const sous_titre = (typeof sous_titre_doc !== "undefined" && sous_titre_doc.trim() !== "")
  ? sous_titre_doc.trim()
  : "";
const content_footer = (typeof sentence_footer_doc !== "undefined" && sentence_footer_doc.trim() !== "")
  ? sentence_footer_doc.trim()
  : "";

document.head.insertAdjacentHTML("beforeend", `
  <style>
	html {
	  /*on refixe le rem à 16px */
	  font-size: 16px;
	}

    #loading {
      position: fixed;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      z-index: 9999;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #ddd;
      border-top-color: #3498db;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .fr-sidemenu--sticky-full-height .fr-sidemenu__inner {
	  padding-bottom: 1.25rem !important;
	  padding-top: 1.5rem !important;
    }
    .content-editorial {
	  margin: 1.25rem 0;
    }
    .fr-summary {
	  margin-bottom: 1.5rem;
    }
    .fr-sidemenu__title {
	   display: none !important;
    }
    .content-editorial pre {
    	overflow: auto;
    	word-wrap: normal;
    	margin: 0 0 1.275em;
    	padding: .85em 1em;
    	background: #f7f7f7;
    }
    .content-editorial .fa {
    	display: inline-block;
    	font: normal normal normal 14px/1 FontAwesome;
    	font-size: inherit;
    	text-rendering: auto;
    	-webkit-font-smoothing: antialiased;
    	-moz-osx-font-smoothing: grayscale;
    }
    div.sourceCode {
    	margin-bottom: 0.5rem;
    }
    h2 {
    	margin-top: 1rem !important;
    }
  </style>
`);

async function verifierConnexionInternet() {
  if (!navigator.onLine) {
    return false;
  }

  try {
    await fetch(
      urlcssdsfr,
      {
        method: "HEAD",
        cache: "no-store"
      }
    );

    return true;
  } catch (error) {
    return false;
  }
}

function desactiverDefaultCSS() {
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    if (link.href.includes("gouvdown") && link.href.endsWith("/default.css")) {
      link.disabled = true;
    }
	if (link.href.includes("gitbook") && link.href.endsWith("/style.css")) {
      link.disabled = true;
    }
  });
}

function configurerBaliseHTML() {
  document.documentElement.setAttribute("lang", "fr");
  document.documentElement.setAttribute("data-fr-scheme", "system");
}

function ajouterMetaOpenGraph() {
  // Éviter les doublons
  if (document.querySelector('meta[property="og:locale"]')) {
    return;
  }

  const meta = document.createElement("meta");
  meta.setAttribute("property", "og:locale");
  meta.setAttribute("content", "fr_FR");

  document.head.appendChild(meta);
}

function ajouterSkiplinksDSFR() {
  // Éviter les doublons
  if (document.querySelector(".fr-skiplinks")) {
    return;
  }

  const skiplinksHTML = `
    <div class="fr-skiplinks">
      <nav
        role="navigation"
        aria-label="Accès rapide"
        class="fr-container"
      >
        <ul class="fr-skiplinks__list">
          <li>
            <a class="fr-link" href="#content">Contenu</a>
          </li>
          <li>
            <a class="fr-link" href="#header-navigation">Menu</a>
          </li>
          <li>
            <a class="fr-link" href="#header-search">Recherche</a>
          </li>
          <li>
            <a class="fr-link" href="#footer">Pied de page</a>
          </li>
        </ul>
      </nav>
    </div>
  `;

  // Insérer juste après l'ouverture de <body>
  document.body.insertAdjacentHTML("afterbegin", skiplinksHTML);
}

function ajouterHeaderDSFR() {
  // Éviter les doublons
  if (document.querySelector(".fr-header")) {
    return;
  }

  const headerHTML = `
    <header role="banner" class="fr-header">
      <div class="fr-header__body">
        <div class="fr-container">
          <div class="fr-header__body-row">

            <div class="fr-header__brand fr-enlarge-link">
              <div class="fr-header__brand-top">
                <div class="fr-header__logo">
                  <a href="/" title="Accueil - ${titre}">
                    <p class="fr-logo">
                      ${logo}
                    </p>
                  </a>
                </div>
              </div>
			  <div class="fr-header__service">
				<a href="/" title="Accueil - ${titre}">
				  <p class="fr-header__service-title">
					${titre}
				  </p>
				</a>
				<p class="fr-header__service-tagline">${sous_titre}</p>
			  </div>
            </div>

          </div>
        </div>
      </div>
	  <div class="fr-header__menu fr-modal" id="modal-header" aria-labelledby="button-header">
        <div class="fr-container">
            <button aria-controls="modal-header" title="Fermer" type="button" id="button-2168" class="fr-btn--close fr-btn">Fermer</button>
            <div class="fr-header__menu-links">
            </div>
            <nav class="fr-nav" role="navigation" aria-label="Menu principal" style="height: 1px !important;">
            </nav>
        </div>
    </div>
    </header>
  `;

  // Insérer juste après les skiplinks
  const skiplinks = document.querySelector(".fr-skiplinks");

  if (skiplinks) {
    skiplinks.insertAdjacentHTML("afterend", headerHTML);
  } else {
    // Solution de secours : au début du body
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }
}

let liensFooter = [];

function ajouterLiensHeaderDSFR() {
  const headerBrand = document.querySelector(".fr-header__brand");

  if (!headerBrand) {
    console.warn("Élément .fr-header__brand introuvable.");
    return;
  }

  const liens = [
    ...document.querySelectorAll(
      "ul.summary > li:not(.chapter) > a"
    )
  ];

  if (liens.length === 0) {
    return;
  }

  // ---------------------------------------------------------
  // 1. Ignorer les liens vers ./index.html
  // ---------------------------------------------------------

  const liensAAnalyser = liens.filter(lien => {
    const href = (lien.getAttribute("href") || "").trim();

    return href !== "./index.html";
  });

  // ---------------------------------------------------------
  // 2. Identifier les liens "Code source"
  // ---------------------------------------------------------

  const liensCodeSource = liensAAnalyser.filter(lien => {
    const libelle = lien.textContent
      .trim()
      .toLowerCase();

    const href = (
      lien.getAttribute("href") || ""
    ).toLowerCase();

    const libelleCorrespond =
      libelle.includes("code") ||
      libelle.includes("sources") ||
      libelle.includes("gitlab") ||
      libelle.includes("github");

    const hrefCorrespond =
      href.includes("gitlab") ||
      href.includes("github");

    return (
      libelleCorrespond &&
      hrefCorrespond
    );
  });

  // ---------------------------------------------------------
  // 3. Identifier les liens "Contact"
  // ---------------------------------------------------------

  const liensContact = liensAAnalyser.filter(lien => {
    const libelle = lien.textContent
      .trim()
      .toLowerCase();

    return (
      libelle.includes("contact") ||
      libelle.includes("nous joindre")
    );
  });

  // ---------------------------------------------------------
  // 4. Un seul lien Code source et un seul Contact
  // ---------------------------------------------------------

  const lienCodeSource =
    liensCodeSource[0] || null;

  const lienContact =
    liensContact[0] || null;

  const liensHeader = [
    lienCodeSource,
    lienContact
  ].filter(Boolean);

  // ---------------------------------------------------------
  // 5. Liens restants
  // ---------------------------------------------------------

  const liensRestants = liensAAnalyser.filter(
    lien => !liensHeader.includes(lien)
  );

  // ---------------------------------------------------------
  // 6. Trois premiers liens restants -> Footer
  // ---------------------------------------------------------

  liensFooter = liensRestants
    .slice(0, 3)
    .map(lien => ({
      href: lien.getAttribute("href"),
      text: lien.textContent.trim()
    }));

  liensFooter.forEach(lienFooter => {
    const lienOriginal = liensRestants.find(
      lien =>
        lien.getAttribute("href") ===
          lienFooter.href &&
        lien.textContent.trim() ===
          lienFooter.text
    );

    lienOriginal
      ?.closest("li")
      ?.remove();
  });

  // ---------------------------------------------------------
  // 7. Création des liens dans le header
  // ---------------------------------------------------------

  if (liensHeader.length === 0) {
    return;
  }

  const tools = document.createElement("div");
  tools.className = "fr-header__tools";

  const toolsLinks = document.createElement("div");
  toolsLinks.className = "fr-header__tools-links";

  const ul = document.createElement("ul");
  ul.className = "fr-btns-group";

  liensHeader.forEach(lien => {

    const li = document.createElement("li");

    const a = document.createElement("a");

    a.href = lien.getAttribute("href");
    a.className = "fr-btn";
    a.textContent = lien.textContent.trim();

    if (lien.target) {
      a.target = lien.target;
    }

    if (lien.rel) {
      a.rel = lien.rel;
    }

    const href = (
      lien.getAttribute("href") || ""
    ).toLowerCase();

    // -------------------------------------------------------
    // Contact
    // -------------------------------------------------------

    if (lien === lienContact) {
      a.classList.add(
        "fr-icon-mail-line",
        "fr-btn--icon-left",
        "fr-btn--team"
      );
    }

    // -------------------------------------------------------
    // Code source
    // -------------------------------------------------------

    if (lien === lienCodeSource) {

      a.classList.add("fr-btn--briefcase");

      if (href.includes("github")) {

        a.classList.add(
          "fr-icon-github-fill",
          "fr-btn--icon-left"
        );

      } else if (href.includes("gitlab")) {

        a.classList.add(
          "fr-icon-git-merge-fill",
          "fr-btn--icon-left"
        );
      }
    }

    li.appendChild(a);
    ul.appendChild(li);

    // Suppression du lien original
    lien.closest("li")?.remove();
  });

  toolsLinks.appendChild(ul);
  tools.appendChild(toolsLinks);

  headerBrand.insertAdjacentElement(
    "afterend",
    tools
  );
}

function transformerBookEnMain() {
  const book = document.querySelector(".book");

  if (!book) {
    console.warn("Aucun élément avec la classe .book trouvé.");
    return;
  }

  // Si .book est déjà dans <main id="content">, ne rien faire
  if (book.closest("main#content")) {
    return;
  }

  const main = document.createElement("main");
  main.id = "content";
  main.setAttribute("role", "main");

  const container = document.createElement("div");
  container.className = "fr-container";

  const gridRow = document.createElement("div");
  gridRow.className =
    "fr-grid-row fr-grid-row--gutters fr-grid-row--center";

  // Déplacer le contenu HTML de l'ancien .book
  gridRow.innerHTML = book.innerHTML;

  container.appendChild(gridRow);
  main.appendChild(container);

  book.replaceWith(main);
}

let sommairePage = "";

function transformerMenuDSFR() {
  const summary = document.querySelector("ul.summary");

  const grid = document.querySelector(
    ".fr-grid-row.fr-grid-row--gutters.fr-grid-row--center"
  );

  if (!summary || !grid) {
    console.warn(
      "Menu d'origine ou grille DSFR introuvable."
    );
    return;
  }

  if (grid.querySelector(".fr-sidemenu")) {
    return;
  }

  const colonneMenu = document.createElement("div");
  colonneMenu.className = "fr-col-12 fr-col-md-4";

  colonneMenu.innerHTML = `
    <nav
      class="fr-sidemenu fr-sidemenu--sticky-full-height"
      role="navigation"
      aria-labelledby="sidemenu-title"
    >
      <div class="fr-sidemenu__inner">

        <button
          aria-expanded="false"
          aria-controls="sidemenu"
          type="button"
          class="fr-sidemenu__btn"
        >
          Menu
        </button>

        <div
          class="fr-collapse"
          id="sidemenu"
        >
          <p
            class="fr-sidemenu__title"
            id="sidemenu-title"
          >
            Menu latéral
          </p>

          <ul class="fr-sidemenu__list"></ul>
        </div>

      </div>
    </nav>
  `;

  const listeMenu = colonneMenu.querySelector(
    ".fr-sidemenu__list"
  );

  const urlCourante = new URL(
    window.location.href,
    window.location.origin
  );

  function estPageCourante(href) {
    if (!href) {
      return false;
    }

    try {
      const urlLien = new URL(
        href,
        window.location.href
      );

      return (
        urlLien.origin === urlCourante.origin &&
        urlLien.pathname === urlCourante.pathname
      );
    } catch (error) {
      return false;
    }
  }

  function creerLienMenu(lienOriginal) {
    const li = document.createElement("li");
    li.className = "fr-sidemenu__item";

    const a = document.createElement("a");

    a.className = "fr-sidemenu__link";
    a.href = lienOriginal.getAttribute("href");
    a.textContent = lienOriginal.textContent.trim();

    a.setAttribute(
      "data-fr-js-sidemenu-link-actionee",
      "true"
    );

    if (
      estPageCourante(
        lienOriginal.getAttribute("href")
      )
    ) {
      a.setAttribute(
        "aria-current",
        "page"
      );
    }

    if (lienOriginal.target) {
      a.target = lienOriginal.target;
    }

    if (lienOriginal.rel) {
      a.rel = lienOriginal.rel;
    }

    li.appendChild(a);

    return li;
  }

  // ---------------------------------------------------------
  // Construction du menu
  // ---------------------------------------------------------

  const elementsMenu = summary.querySelectorAll(
    ":scope > li"
  );

  elementsMenu.forEach(element => {

    const estChapter =
      element.classList.contains("chapter");

    const lien = element.querySelector(
      ":scope > a"
    );

    if (!lien) {
      return;
    }

    const href = (
      lien.getAttribute("href") || ""
    ).trim();

    // -------------------------------------------------------
    // Les liens non-chapter vers ./index.html sont ignorés
    // -------------------------------------------------------

    if (
      !estChapter &&
      href === "./index.html"
    ) {
      return;
    }

    // -------------------------------------------------------
    // Ajout du lien au menu
    // -------------------------------------------------------

    const liPrincipal =
      creerLienMenu(lien);

    listeMenu.appendChild(liPrincipal);

    // -------------------------------------------------------
    // Sous-chapitres
    // -------------------------------------------------------

    if (!estChapter) {
      return;
    }

    const sousMenus = element.querySelectorAll(
      ":scope > ul > li.chapter"
    );

    // -------------------------------------------------------
    // Sommaire de la page courante
    // -------------------------------------------------------

    if (
      estPageCourante(href) &&
      sousMenus.length > 0
    ) {

      const navSommaire =
        document.createElement("nav");

      navSommaire.className =
        "fr-summary";

      navSommaire.setAttribute(
        "role",
        "navigation"
      );

      navSommaire.setAttribute(
        "aria-labelledby",
        "fr-summary-title"
      );

      const titre =
        document.createElement("p");

      titre.className =
        "fr-summary__title";

      titre.id =
        "fr-summary-title";

      titre.textContent =
        "Sommaire";

      const ol =
        document.createElement("ol");

      sousMenus.forEach(sousMenu => {

        const sousLien =
          sousMenu.querySelector(
            ":scope > a"
          );

        if (!sousLien) {
          return;
        }

        const sousLi =
          document.createElement("li");

        const a =
          document.createElement("a");

        a.className =
          "fr-summary__link";

        a.href =
          sousLien.getAttribute("href");

        a.textContent =
          sousLien.textContent.trim();

        sousLi.appendChild(a);
        ol.appendChild(sousLi);
      });

      navSommaire.appendChild(titre);
      navSommaire.appendChild(ol);

      sommairePage =
        navSommaire.outerHTML;
    }
  });

  grid.insertAdjacentElement(
    "afterbegin",
    colonneMenu
  );

  summary.remove();
}

function transformerCorpsDSFR() {
  const bodyInner = document.querySelector(".book-body > .body-inner");
  const grid = document.querySelector(
    ".fr-grid-row.fr-grid-row--gutters.fr-grid-row--center"
  );

  if (!bodyInner || !grid) {
    console.warn("Corps de page ou grille DSFR introuvable.");
    return;
  }

  const section = bodyInner.querySelector(".page-inner > section.normal");

  if (!section) {
    console.warn("Section principale introuvable.");
    return;
  }

  /*
   * Création de la colonne éditoriale
   */
  const colonne = document.createElement("div");
  colonne.className = "content-editorial fr-col-12 fr-col-md-8";

  /*
   * Récupération du premier H1
   */
  const premierH1 = section.querySelector("h1");

  if (premierH1) {
    colonne.appendChild(premierH1.cloneNode(true));
  }

  /*
   * Récupération de l'auteur et de la date
   */
  const author = section.querySelector(".author");
  const date = section.querySelector(".date");

  if (author) {
    colonne.appendChild(author.cloneNode(true));
  }

  if (date) {
    colonne.appendChild(date.cloneNode(true));
  }

  /*
   * Ajout du sommaire
   */
  if (sommairePage) {
    colonne.insertAdjacentHTML("beforeend", sommairePage);
  }

  /*
   * Copie du contenu
   */
  const contenu = section.cloneNode(true);

  /*
   * Suppression du premier H1 dans la copie
   */
  const h1Clone = contenu.querySelector("h1");

  if (h1Clone) {
    h1Clone.remove();
  }

  /*
   * Suppression de l'ancien header éventuel
   */
  contenu.querySelector("#header")?.remove();

  /*
   * Ajout du contenu restant
   */
  while (contenu.firstChild) {
    colonne.appendChild(contenu.firstChild);
  }

  /*
   * Ajout de la colonne en deuxième position
   */
  grid.appendChild(colonne);

  /*
   * Suppression de l'ancien corps
   */
  document.querySelector(".book-body")?.remove();
}

function ajusterLargeurImages() {
  const contentEditorial = document.querySelector(".content-editorial");

  if (!contentEditorial) {
    console.warn("Élément .content-editorial introuvable.");
    return;
  }

  const largeurContent = contentEditorial.clientWidth;

  contentEditorial.querySelectorAll("img").forEach(img => {
    // On ne traite que les images sans class ni style
    if (
      img.hasAttribute("class") ||
      img.hasAttribute("style")
    ) {
      return;
    }

    // getBoundingClientRect() permet de récupérer la largeur
    // réellement occupée par l'image
    const largeurImage = img.getBoundingClientRect().width;
    if (largeurImage > largeurContent) {
      img.style.width = "100%";
    }
  });
}

function creerFooterDSFR() {
  const book = document.querySelector("main");

  // Vérifier que la div existe
  if (!book) {
    console.warn("Aucun élément main trouvé.");
    return;
  }

  // Éviter de créer plusieurs fois le footer
  if (document.querySelector(".fr-footer")) {
    return;
  }
  
  

  const footerHTML = `
    <footer class="fr-footer" role="contentinfo" id="footer">
      <div class="fr-container">
        <div class="fr-footer__body">

          <div class="fr-footer__brand fr-enlarge-link">
            <a
              id="footer-brand-link-6954"
              title="Retour à l’accueil du site - Nom de l’entité"
              href="/"
            >
              <p class="fr-logo">
                ${logo}
              </p>
            </a>
          </div>

          <div class="fr-footer__content">
            <p class="fr-footer__content-desc">
              ${content_footer}
            </p>

            <ul class="fr-footer__content-list">
              <li class="fr-footer__content-item">
                <a
                  title="info.gouv.fr - nouvelle fenêtre"
                  href="https://info.gouv.fr"
                  target="_blank"
                  rel="noopener external"
                  class="fr-footer__content-link"
                >
                  info.gouv.fr
                </a>
              </li>

              <li class="fr-footer__content-item">
                <a
                  title="service-public.gouv.fr - nouvelle fenêtre"
                  href="https://service-public.gouv.fr"
                  target="_blank"
                  rel="noopener external"
                  class="fr-footer__content-link"
                >
                  service-public.gouv.fr
                </a>
              </li>

              <li class="fr-footer__content-item">
                <a
                  title="legifrance.gouv.fr - nouvelle fenêtre"
                  href="https://legifrance.gouv.fr"
                  target="_blank"
                  rel="noopener external"
                  class="fr-footer__content-link"
                >
                  legifrance.gouv.fr
                </a>
              </li>

              <li class="fr-footer__content-item">
                <a
                  title="data.gouv.fr - nouvelle fenêtre"
                  href="https://data.gouv.fr"
                  target="_blank"
                  rel="noopener external"
                  class="fr-footer__content-link"
                >
                  data.gouv.fr
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div class="fr-footer__bottom">
          <ul class="fr-footer__bottom-list">

            <li class="fr-footer__bottom-item">
              <a href="#" class="fr-footer__bottom-link">
                Accessibilité : partiellement conforme
              </a>
            </li>

          </ul>

          <div class="fr-footer__bottom-copy">
            <p>
              Sauf mention explicite de propriété intellectuelle détenue par
              des tiers, les contenus de ce site sont proposés sous
              <a
                href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                target="_blank"
                rel="noopener external"
                title="Licence etalab - nouvelle fenêtre"
              >
                licence etalab-2.0
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  `;

  book.insertAdjacentHTML("afterend", footerHTML);
}

function ajouterLiensFooterDSFR() {
  const listeFooter = document.querySelector(
    ".fr-footer__bottom-list"
  );

  if (!listeFooter) {
    console.warn("Liste du footer introuvable.");
    return;
  }

  liensFooter.forEach(lien => {
    const li = document.createElement("li");
    li.className = "fr-footer__bottom-item";

    const a = document.createElement("a");
    a.href = lien.href;
    a.className = "fr-footer__bottom-link";
    a.textContent = lien.text;

    li.appendChild(a);
    listeFooter.appendChild(li);
  });
}

function ajouterModaleThemeDSFR() {
  // Ne pas créer la modale si elle existe déjà
  if (document.getElementById("fr-theme-modal")) {
    return;
  }

  const modal = document.createElement("dialog");

  modal.id = "fr-theme-modal";
  modal.className = "fr-modal";
  modal.setAttribute("aria-labelledby", "fr-theme-modal-title");

  modal.innerHTML = `
    <div class="fr-container fr-container--fluid fr-container-md">
      <div class="fr-grid-row fr-grid-row--center">
        <div class="fr-col-12 fr-col-md-6 fr-col-lg-4">

          <div class="fr-modal__body">

            <div class="fr-modal__header">
              <button
                aria-controls="fr-theme-modal"
                title="Fermer"
                type="button"
                class="fr-btn--close fr-btn"
              >
                Fermer
              </button>
            </div>

            <div class="fr-modal__content">

              <h1
                id="fr-theme-modal-title"
                class="fr-modal__title"
              >
                Paramètres d’affichage
              </h1>

              <div id="fr-display" class="fr-display">

                <fieldset
                  class="fr-fieldset"
                  id="display-fieldset"
                >

                  <legend
                    class="fr-fieldset__legend--regular fr-fieldset__legend"
                    id="display-fieldset-legend"
                  >
                    Choisissez un thème pour personnaliser
                    l’apparence du site.
                  </legend>

                  <!-- Thème clair -->
                  <div class="fr-fieldset__element">
                    <div class="fr-radio-group fr-radio-rich">

                      <input
                        value="light"
                        type="radio"
                        id="fr-radios-theme-light"
                        name="fr-radios-theme"
                      >

                      <label
                        class="fr-label"
                        for="fr-radios-theme-light"
                      >
                        Thème clair
                      </label>

                      <div class="fr-radio-rich__pictogram">
                        <img
                          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAJPHN0eWxlPgoJCS5mci1hcnR3b3JrLWRlY29yYXRpdmUgewoJCQlmaWxsOiAjRUNFQ0ZGOwoJCX0KCQkuZnItYXJ0d29yay1taW5vciB7CgkJCWZpbGw6ICNFMTAwMEY7CgkJfQoJCS5mci1hcnR3b3JrLW1ham9yIHsKCQkJZmlsbDogIzAwMDA5MTsKCQl9Cgk8L3N0eWxlPgoJPHN5bWJvbCBpZD0iYXJ0d29yay1kZWNvcmF0aXZlIj4KICAgIDxwYXRoIGQ9Ik0xOSw3MmMtMC41NTE0LDAtMS0wLjQ0ODYtMS0xczAuNDQ4Ni0xLDEtMXMxLDAuNDQ4NiwxLDFTMTkuNTUxNCw3MiwxOSw3MnogTTMxLDEwYy0wLjU1MTQsMC0xLTAuNDQ4Ni0xLTEKCWMwLTAuNTUxNDUsMC40NDg2LTEsMS0xczEsMC40NDg1NSwxLDFDMzIsOS41NTE0LDMxLjU1MTQsMTAsMzEsMTB6IE02Nyw2NmMtMC41NTE0LDAtMS0wLjQ0ODYtMS0xczAuNDQ4Ni0xLDEtMXMxLDAuNDQ4NiwxLDEKCVM2Ny41NTE0LDY2LDY3LDY2eiBNNjcsMTZjLTAuNTUxNCwwLTEtMC40NDg2LTEtMXMwLjQ0ODYtMSwxLTFzMSwwLjQ0ODYsMSwxUzY3LjU1MTQsMTYsNjcsMTZ6IE05LDMyYy0wLjU1MTQsMC0xLTAuNDQ4Ni0xLTEKCXMwLjQ0ODYtMSwxLTFzMSwwLjQ0ODYsMSwxUzkuNTUxNCwzMiw5LDMyeiIvPgogIDwvc3ltYm9sPgogIDxzeW1ib2wgaWQ9ImFydHdvcmstbWlub3IiPgogICAgPHBhdGggZD0iTTMyLjQ0NTMsNDQuMTY3OWMwLjQ1OTUtMC4zMDYzLDEuMDgwNC0wLjE4MjEsMS4zODY3LDAuMjc3NEMzNS4zMTU2LDQ2LjY3MDYsMzguNTA2MSw0OCw0MSw0OAoJYzAuNTUyMywwLDEsMC40NDc3LDEsMXMtMC40NDc3LDEtMSwxYy0zLjEwNjEsMC02LjkzMS0xLjU5MzctOC44MzIxLTQuNDQ1M0MzMS44NjE2LDQ1LjA5NTIsMzEuOTg1OCw0NC40NzQzLDMyLjQ0NTMsNDQuMTY3OXoiLz4KICA8L3N5bWJvbD4KICA8c3ltYm9sIGlkPSJhcnR3b3JrLW1ham9yIj4KICAgIDxwYXRoIGQ9Ik0zOS4wMDY3MSwyMC4wNDY1MUwzOSwxOS45Mjk4MXYtNS40NzM2OWMwLTAuNTUyMjUsMC40NDc2OS0xLDEtMWMwLjUxMjgyLDAsMC45MzU0OSwwLjM4NjExLDAuOTkzMjksMC44ODMzNgoJTDQxLDE0LjQ1NjEydjUuNDczNjljMCwwLjU1MjMxLTAuNDQ3NjksMS0xLDFDMzkuNDg3MTgsMjAuOTI5ODEsMzkuMDY0NTEsMjAuNTQzODIsMzkuMDA2NzEsMjAuMDQ2NTF6IE0xOS4zNzkyNywzOUgxNAoJbC0wLjExNjU4LDAuMDA2NzFDMTMuMzg1OTksMzkuMDY0NTEsMTMsMzkuNDg3MTgsMTMsNDBjMCwwLjU1MjMxLDAuNDQ3NjksMSwxLDFoNS4zNzkyN2wwLjExNjY0LTAuMDA2NzEKCWMwLjQ5NzM4LTAuMDU3OCwwLjg4MzM2LTAuNDgwNDcsMC44ODMzNi0wLjk5MzI5QzIwLjM3OTI3LDM5LjQ0NzY5LDE5LjkzMTU4LDM5LDE5LjM3OTI3LDM5eiBNNjYsMzloLTUuMzc5MjdsLTAuMTE2NjQsMC4wMDY3MQoJYy0wLjQ5NzM4LDAuMDU3OC0wLjg4MzM2LDAuNDgwNDctMC44ODMzNiwwLjk5MzI5YzAsMC41NTIzMSwwLjQ0NzY5LDEsMSwxSDY2bDAuMTE2NTgtMC4wMDY3MUM2Ni42MTQwMSw0MC45MzU0OSw2Nyw0MC41MTI4Miw2Nyw0MAoJQzY3LDM5LjQ0NzY5LDY2LjU1MjMxLDM5LDY2LDM5eiBNNDAsNTkuMDcwMTljLTAuNTUyMzEsMC0xLDAuNDQ3NjktMSwxdjUuNDczNjlsMC4wMDY3MSwwLjExNjY0CgljMC4wNTc4LDAuNDk3MjUsMC40ODA0NywwLjg4MzM2LDAuOTkzMjksMC44ODMzNmMwLjU1MjMxLDAsMS0wLjQ0NzY5LDEtMXYtNS40NzM2OWwtMC4wMDY3MS0wLjExNjU4CglDNDAuOTM1NDksNTkuNDU2MTgsNDAuNTEyODIsNTkuMDcwMTksNDAsNTkuMDcwMTl6IE0yNC4wNDU0MSw1My44OTU1N2wtMS43OTMwOSwxLjgyNDUybC0wLjA4MjQsMC4wOTUwMwoJYy0wLjMwMTY0LDAuMzk0OS0wLjI2ODkyLDAuOTYxODUsMC4wOTQ2NywxLjMxOTE1YzAuMzkzOTIsMC4zODcxNSwxLjAyNzA0LDAuMzgxNTksMS40MTQxMi0wLjAxMjI3bDEuNzkzMDktMS44MjQ1OGwwLjA4MjQtMC4wOTQ5MQoJYzAuMzAxNTctMC4zOTQ5LDAuMjY4OTgtMC45NjE5MS0wLjA5NDYtMS4zMTkyMUMyNS4wNjU2MSw1My40OTYyMiwyNC40MzI1LDUzLjUwMTcxLDI0LjA0NTQxLDUzLjg5NTU3eiBNNTUuOTU0NTksMjQuMjc5OTEKCWwxLjc5MzA5LTEuODI0NThsMC4wODI0LTAuMDk0OTFjMC4zMDE2NC0wLjM5NDksMC4yNjg5Mi0wLjk2MTkxLTAuMDk0NjctMS4zMTkyMWMtMC4zOTM5Mi0wLjM4NzIxLTEuMDI3MDQtMC4zODE1OS0xLjQxNDEyLDAuMDEyMzMKCWwtMS43OTMyMSwxLjgyNDQ2TDU0LjQ0NTgsMjIuOTcyOWMtMC4zMDE1NywwLjM5NTAyLTAuMjY4OTgsMC45NjE5MSwwLjA5NDYsMS4zMTkyNwoJQzU0LjkzNDM5LDI0LjY3OTMyLDU1LjU2NzUsMjQuNjczODMsNTUuOTU0NTksMjQuMjc5OTF6IE0yMy42Nzg3MSwyMS4wNTM1M2wtMC4wOTMzOC0wLjA4NDA1CgljLTAuMzg5NzEtMC4zMDg0Ny0wLjk1NzE1LTAuMjg1NzEtMS4zMjA3NCwwLjA3MTcyYy0wLjM5Mzg2LDAuMzg3MDgtMC4zOTk0MSwxLjAyMDItMC4wMTIyNywxLjQxNDEybDEuNzkzMDksMS44MjQ1OAoJbDAuMDkzNTEsMC4wODM5OGMwLjM4OTU5LDAuMzA4NDEsMC45NTY5NywwLjI4NTU4LDEuMzIwNjgtMC4wNzE3MmMwLjM5MzkyLTAuMzg3MDgsMC4zOTk0MS0xLjAyMDI2LDAuMDEyMjEtMS40MTQxOAoJTDIzLjY3ODcxLDIxLjA1MzUzeiBNNTUuOTU0NTksNTMuODk1NTdsLTAuMDkzNTEtMC4wODM5OGMtMC4zODk1OS0wLjMwODQ3LTAuOTU2OTctMC4yODU3MS0xLjMyMDY4LDAuMDcxNzIKCWMtMC4zOTM5MiwwLjM4NzA4LTAuMzk5NDEsMS4wMjAyLTAuMDEyMzMsMS40MTQxMmwxLjc5MzIxLDEuODI0NThsMC4wOTMzOCwwLjA4Mzk4CgljMC4zODk3MSwwLjMwODQxLDAuOTU3MTUsMC4yODU1OCwxLjMyMDc0LTAuMDcxNzJjMC4zOTM4Ni0wLjM4NzA4LDAuMzk5NDEtMS4wMjAyNiwwLjAxMjI3LTEuNDE0MThMNTUuOTU0NTksNTMuODk1NTd6IE00MCwyNgoJYy03LjczMTk5LDAtMTQsNi4yNjgwMS0xNCwxNGMwLDEuOTE1MjgsMC4zODUzOCwzLjc3ODM4LDEuMTIzMjMsNS41MDI4MWMwLjIxNzE2LDAuNTA3ODEsMC44MDQ5OSwwLjc0MzI5LDEuMzEyNjgsMC41MjYwNgoJYzAuNTA3ODEtMC4yMTcyOSwwLjc0MzI5LTAuODA0OTksMC41MjYwNi0xLjMxMjc0QzI4LjMzMDAyLDQzLjIzOTIsMjgsNDEuNjQzNjIsMjgsNDBjMC02LjYyNzM4LDUuMzcyNjItMTIsMTItMTJzMTIsNS4zNzI2MiwxMiwxMgoJcy01LjM3MjYyLDEyLTEyLDEyYy0zLjU0OTUsMC02Ljg0NTIxLTEuNTQ4NzEtOS4xMTIxMi00LjE5MTQxYy0wLjM1OTU2LTAuNDE5MDctMC45OTA5MS0wLjQ2NzQ3LTEuNDEwMS0wLjEwNzkxCgljLTAuNDE5MTksMC4zNTk2Mi0wLjQ2NzQ3LDAuOTkwOTEtMC4xMDc5MSwxLjQxMDFDMzIuMDEyODIsNTIuMTkxNzcsMzUuODYwNzIsNTQsNDAsNTRjNy43MzE5OSwwLDE0LTYuMjY4MDEsMTQtMTQKCVM0Ny43MzE5OSwyNiw0MCwyNnoiLz4KICA8L3N5bWJvbD4KICA8dXNlIGNsYXNzPSJmci1hcnR3b3JrLWRlY29yYXRpdmUiIGhyZWY9IiNhcnR3b3JrLWRlY29yYXRpdmUiLz4KICA8dXNlIGNsYXNzPSJmci1hcnR3b3JrLW1pbm9yIiBocmVmPSIjYXJ0d29yay1taW5vciIvPgogIDx1c2UgY2xhc3M9ImZyLWFydHdvcmstbWFqb3IiIGhyZWY9IiNhcnR3b3JrLW1ham9yIi8+Cjwvc3ZnPgo="
                          aria-hidden="true"
                          width="80"
                          height="80"
                          class="fr-artwork"
                        >
                      </div>

                    </div>
                  </div>

                  <!-- Thème sombre -->
                  <div class="fr-fieldset__element">
                    <div class="fr-radio-group fr-radio-rich">

                      <input
                        value="dark"
                        type="radio"
                        id="fr-radios-theme-dark"
                        name="fr-radios-theme"
                      >

                      <label
                        class="fr-label"
                        for="fr-radios-theme-dark"
                      >
                        Thème sombre
                      </label>

                      <div class="fr-radio-rich__pictogram">
                        <img
                          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAJPHN0eWxlPgoJCS5mci1hcnR3b3JrLWRlY29yYXRpdmUgewoJCQlmaWxsOiAjRUNFQ0ZGOwoJCX0KCQkuZnItYXJ0d29yay1taW5vciB7CgkJCWZpbGw6ICNFMTAwMEY7CgkJfQoJCS5mci1hcnR3b3JrLW1ham9yIHsKCQkJZmlsbDogIzAwMDA5MTsKCQl9Cgk8L3N0eWxlPgoJPHN5bWJvbCBpZD0iYXJ0d29yay1kZWNvcmF0aXZlIj4KICAgIDxwYXRoIGQ9Ik02NywxNmMtMC41NTE0LDAtMS0wLjQ0ODYtMS0xczAuNDQ4Ni0xLDEtMXMxLDAuNDQ4NiwxLDFTNjcuNTUxNCwxNiw2NywxNnogTTE5LDcyYy0wLjU1MTQsMC0xLTAuNDQ4Ni0xLTEKCXMwLjQ0ODYtMSwxLTFzMSwwLjQ0ODYsMSwxUzE5LjU1MTQsNzIsMTksNzJ6IE0zMSwxMGMtMC41NTE0LDAtMS0wLjQ0ODYtMS0xYzAtMC41NTE0NSwwLjQ0ODYtMSwxLTFzMSwwLjQ0ODU1LDEsMQoJQzMyLDkuNTUxNCwzMS41NTE0LDEwLDMxLDEweiBNNjksNjBjLTAuNTUxNCwwLTEtMC40NDg2LTEtMXMwLjQ0ODYtMSwxLTFzMSwwLjQ0ODYsMSwxUzY5LjU1MTQsNjAsNjksNjB6IE00NSw3MAoJYy0wLjU1MTQsMC0xLTAuNDQ4Ni0xLTFzMC40NDg2LTEsMS0xczEsMC40NDg2LDEsMVM0NS41NTE0LDcwLDQ1LDcweiBNOSwzMmMtMC41NTE0LDAtMS0wLjQ0ODYtMS0xczAuNDQ4Ni0xLDEtMXMxLDAuNDQ4NiwxLDEKCVM5LjU1MTQsMzIsOSwzMnoiLz4KICA8L3N5bWJvbD4KICA8c3ltYm9sIGlkPSJhcnR3b3JrLW1pbm9yIj4KICAgIDxwYXRoIGQ9Ik00MSwzMGMtMC41NTIzLDAtMSwwLjQ0NzctMSwxczAuNDQ3NywxLDEsMXMxLTAuNDQ3NywxLTFTNDEuNTUyMywzMCw0MSwzMHogTTU5LDM4Yy0wLjU1MjMsMC0xLDAuNDQ3Ny0xLDEKCXMwLjQ0NzcsMSwxLDFzMS0wLjQ0NzcsMS0xUzU5LjU1MjMsMzgsNTksMzh6IE01NSwzOGMwLjU1MjMsMCwxLDAuNDQ3NywxLDFjMCwwLjUxMjgtMC4zODYsMC45MzU1LTAuODgzNCwwLjk5MzNMNTUsNDBoLTIKCWMtMC41NTIzLDAtMS0wLjQ0NzctMS0xYzAtMC41MTI4LDAuMzg2LTAuOTM1NSwwLjg4MzQtMC45OTMzTDUzLDM4SDU1eiBNNDgsMzFjMC0wLjU1MjMtMC40NDc3LTEtMS0xaC0ybC0wLjExNjYsMC4wMDY3CglDNDQuMzg2LDMwLjA2NDUsNDQsMzAuNDg3Miw0NCwzMWMwLDAuNTUyMywwLjQ0NzcsMSwxLDFoMmwwLjExNjYtMC4wMDY3QzQ3LjYxNCwzMS45MzU1LDQ4LDMxLjUxMjgsNDgsMzF6Ii8+CiAgPC9zeW1ib2w+CiAgPHN5bWJvbCBpZD0iYXJ0d29yay1tYWpvciI+CiAgICA8cGF0aCBkPSJNNTkuOTA2NjgsNDcuMDg4OTljLTIuNDAyNCw3LjY2NjItOS40OTE4OCwxMi45MTMzMy0xNy41Mjk0OCwxMi45MTMzMwoJYy0xMC4xNDgxOSwwLTE4LjM3NTEyLTguMjY3MzMtMTguMzc1MTItMTguNDY2NDNjMC03Ljg1NDYxLDQuOTM3OTMtMTQuODI5MTYsMTIuMjczOC0xNy40MjM0NgoJYzEuODc5MjEtMC42NjQ2MSwzLjMyMzU1LDEuNjg0NTcsMS45NjEzLDMuMTA3M2MtMi4zMDg0MSwyLjQxMDk1LTMuNTkyMSw1LjU5Mzk5LTMuNTkyMSw4Ljk1NTc1CgljMCw2Ljc2Nzk0LDUuMjA0MSwxMi4zNzkzOSwxMS44OTI3LDEyLjg5NDM1YzAuNTUwNiwwLjA0MjM2LDAuOTYyNzEsMC41MjMxOSwwLjkyMDM1LDEuMDczNzkKCWMtMC4wNDI0MiwwLjU1MDY2LTAuNTIzMjUsMC45NjI3MS0xLjA3Mzg1LDAuOTIwMjljLTcuNzI5ODYtMC41OTUwMy0xMy43MzkyLTcuMDc0ODMtMTMuNzM5Mi0xNC44ODg0MwoJYzAtMy42MTA3OCwxLjI4NTgzLTcuMDQ4MTYsMy42MTMyMi05Ljc1MDY3bDAuMjI2NjgtMC4yNTY4NEwzNi4yODU0LDI2LjI0NjRjLTYuMDY1MTksMi40NDI1LTEwLjEzODQ5LDguMzA5ODEtMTAuMjc5NiwxNC45MzM5CglsLTAuMDAzNzIsMC4zNTU1OWMwLDkuMDk2NjgsNy4zMzM3NCwxNi40NjY0MywxNi4zNzUxMiwxNi40NjY0M2M2LjkyNTc4LDAsMTMuMDYzOS00LjM3NSwxNS4zOTcwMy0xMC44NDYxOWwwLjA2ODc5LTAuMTk5MTYKCWwtMC4xOTY4NCwwLjE4ODExYy0xLjk2NzQ3LDEuODIzNzMtNC4zNzczOCwzLjA3ODYxLTYuOTk0NTEsMy42MzYyOWwtMC4zOTQwNCwwLjA3ODQzCgljLTAuNTQzMDMsMC4xMDA0LTEuMDY0Ny0wLjI1ODQyLTEuMTY1MS0wLjgwMTUxYy0wLjEwMDUyLTAuNTQzMDksMC4yNTgzNi0xLjA2NDcsMC44MDE0NS0xLjE2NTE2CgljMi42MjMyOS0wLjQ4NTExLDUuMDIzMTMtMS43NzUxNSw2Ljg5MjgyLTMuNzA0MDRDNTguMTc3OTIsNDMuNzUzNzgsNjAuNDk3NSw0NS4yMDM4LDU5LjkwNjY4LDQ3LjA4ODk5eiBNMTUsNTgKCWMtMC41NTIzMSwwLTEsMC40NDc2OS0xLDFzMC40NDc2OSwxLDEsMXMxLTAuNDQ3NjksMS0xUzE1LjU1MjMxLDU4LDE1LDU4eiBNNTUsMjhoMmwwLjExNjU4LTAuMDA2NzEKCUM1Ny42MTQwMSwyNy45MzU0OSw1OCwyNy41MTI4Miw1OCwyN2MwLTAuNTUyMzEtMC40NDc2OS0xLTEtMWgtMmwtMC4xMTY1OCwwLjAwNjcxQzU0LjM4NTk5LDI2LjA2NDUxLDU0LDI2LjQ4NzE4LDU0LDI3CglDNTQsMjcuNTUyMzEsNTQuNDQ3NjksMjgsNTUsMjh6IE0yMyw1OGgtNGwtMC4xMTY1OCwwLjAwNjcxQzE4LjM4NTk5LDU4LjA2NDUxLDE4LDU4LjQ4NzE4LDE4LDU5YzAsMC41NTIzMSwwLjQ0NzY5LDEsMSwxaDQKCWwwLjExNjU4LTAuMDA2NzFDMjMuNjE0MDEsNTkuOTM1NDksMjQsNTkuNTEyODIsMjQsNTlDMjQsNTguNDQ3NjksMjMuNTUyMzEsNTgsMjMsNTh6Ii8+CiAgPC9zeW1ib2w+CiAgPHVzZSBjbGFzcz0iZnItYXJ0d29yay1kZWNvcmF0aXZlIiBocmVmPSIjYXJ0d29yay1kZWNvcmF0aXZlIi8+CiAgPHVzZSBjbGFzcz0iZnItYXJ0d29yay1taW5vciIgaHJlZj0iI2FydHdvcmstbWlub3IiLz4KICA8dXNlIGNsYXNzPSJmci1hcnR3b3JrLW1ham9yIiBocmVmPSIjYXJ0d29yay1tYWpvciIvPgo8L3N2Zz4K"
                          aria-hidden="true"
                          width="80"
                          height="80"
                          class="fr-artwork"
                        >
                      </div>

                    </div>
                  </div>

                  <!-- Système -->
                  <div class="fr-fieldset__element">
                    <div class="fr-radio-group fr-radio-rich">

                      <input
                        value="system"
                        type="radio"
                        id="fr-radios-theme-system"
                        name="fr-radios-theme"
                      >

                      <label
                        class="fr-label"
                        for="fr-radios-theme-system"
                      >
                        Système
                        <span class="fr-hint-text">
                          Utilise les paramètres système
                        </span>
                      </label>

                      <div class="fr-radio-rich__pictogram">
                        <img
                          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8c3R5bGU+CgkuZnItYXJ0d29yay1kZWNvcmF0aXZlIHsKCQlmaWxsOiAjRUNFQ0ZGOwoJfQoJLmZyLWFydHdvcmstbWlub3IgewoJCWZpbGw6ICNFMTAwMEY7Cgl9CgkuZnItYXJ0d29yay1tYWpvciB7CgkJZmlsbDogIzAwMDA5MTsKCX0KCTwvc3R5bGU+Cgk8c3ltYm9sIGlkPSJhcnR3b3JrLWRlY29yYXRpdmUiPgoJCTxwYXRoIGQ9Ik0xOSw3MCBDMTkuNTUxNDAwMSw3MCAyMCw3MC40NDg1NTI5IDIwLDcxIEMyMCw3MS41NTE0MDAxIDE5LjU1MTQwMDEsNzIgMTksNzIgQzE4LjQ0ODU5OTksNzIgMTgsNzEuNTUxNDAwMSAxOCw3MSBDMTgsNzAuNDQ4NTUyOSAxOC40NDg1OTk5LDcwIDE5LDcwIFogTTY3LDY0IEM2Ny41NTE0MDAxLDY0IDY4LDY0LjQ0ODU1MjkgNjgsNjUgQzY4LDY1LjU1MTQwMDEgNjcuNTUxNDAwMSw2NiA2Nyw2NiBDNjYuNDQ4NTk5OSw2NiA2Niw2NS41NTE0MDAxIDY2LDY1IEM2Niw2NC40NDg1NTI5IDY2LjQ0ODU5OTksNjQgNjcsNjQgWiBNOSwzMCBDOS41NTE0MDAxMSwzMCAxMCwzMC40NDg1NTI5IDEwLDMxIEMxMCwzMS41NTE0MDAxIDkuNTUxNDAwMTEsMzIgOSwzMiBDOC40NDg1OTk4OSwzMiA4LDMxLjU1MTQwMDEgOCwzMSBDOCwzMC40NDg1NTI5IDguNDQ4NTk5ODksMzAgOSwzMCBaIE02NywxNCBDNjcuNTUxNDAwMSwxNCA2OCwxNC40NDg1NTI5IDY4LDE1IEM2OCwxNS41NTE0MDAxIDY3LjU1MTQwMDEsMTYgNjcsMTYgQzY2LjQ0ODU5OTksMTYgNjYsMTUuNTUxNDAwMSA2NiwxNSBDNjYsMTQuNDQ4NTUyOSA2Ni40NDg1OTk5LDE0IDY3LDE0IFogTTMxLDggQzMxLjU1MTQwMDEsOCAzMiw4LjQ0ODU1MjkgMzIsOSBDMzIsOS41NTE0MDAxMSAzMS41NTE0MDAxLDEwIDMxLDEwIEMzMC40NDg1OTk5LDEwIDMwLDkuNTUxNDAwMTEgMzAsOSBDMzAsOC40NDg1NTI5IDMwLjQ0ODU5OTksOCAzMSw4IFoiLz4KCTwvc3ltYm9sPgoJPHN5bWJvbCBpZD0iYXJ0d29yay1taW5vciI+CgkJPHBhdGggZD0iTTUzLjMwMjI3MjYsNDYuMjE3OTI1NyBDNTUuMzg4NTQ1Myw0Ni45MzYyODcgNTYuNTAwNDM1Niw0OS4yMTYgNTUuNzgyMDc0Myw1MS4zMDIyNzI2IEM1NS4wNjM2ODA2LDUzLjM4ODYzOTQgNTIuNzg0MDM5Miw1NC41MDA0NDkxIDUwLjY5NzcyNzQsNTMuNzgyMDc0MyBDNTAuMTc1NTMxOSw1My42MDIyNjggNDkuODk3OTcwNiw1My4wMzMxODMxIDUwLjA3Nzc3Nyw1Mi41MTA5ODc2IEM1MC4yNTc1ODMzLDUxLjk4ODc5MjEgNTAuODI2NjY4Miw1MS43MTEyMzA4IDUxLjM0ODg2MzcsNTEuODkxMDM3MiBDNTIuMzkwNzk4Miw1Mi4yNDk4MDQgNTMuNTMyMjYwOCw1MS42OTMwOTg0IDUzLjg5MTAzNzIsNTAuNjUxMTM2MyBDNTQuMjQ5Nzg1OCw0OS42MDkyNTQ3IDUzLjY5MzAxOCw0OC40Njc3MTE1IDUyLjY1MTEzNjMsNDguMTA4OTYyOCBDNTEuNjU2NjEyOSw0Ny43NjY1MjEgNTAuNTcxMjgyMiw0OC4yNTgyNTgzIDUwLjE2MjY1MjMsNDkuMjA5ODM2MiBMNTAuMTA4OTYyOCw0OS4zNDg4NjM3IEM0OS45MjkxNTY1LDQ5Ljg3MTA1OTIgNDkuMzYwMDcxNiw1MC4xNDg2MjA0IDQ4LjgzNzg3NjEsNDkuOTY4ODE0MSBDNDguMzE1NjgwNiw0OS43ODkwMDc4IDQ4LjAzODExOTQsNDkuMjE5OTIyOSA0OC4yMTc5MjU3LDQ4LjY5NzcyNzQgQzQ4LjkzNjI4Nyw0Ni42MTE0NTQ3IDUxLjIxNiw0NS40OTk1NjQ0IDUzLjMwMjI3MjYsNDYuMjE3OTI1NyBaIE0zOC41LDI4LjY2OTg3MyBDMzguOTc4MjkyNiwyOC45NDYwMTU0IDM5LjE0MjE2NzgsMjkuNTU3NjA1OCAzOC44NjYwMjU0LDMwLjAzNTg5ODQgQzM4LjU4OTg4MywzMC41MTQxOTEgMzcuOTc4MjkyNiwzMC42NzgwNjYyIDM3LjUsMzAuNDAxOTIzOCBDMzYuMDY4MTI0MSwyOS41NzUyMjk5IDM0LjIyODYzOTUsMzAuMDY4MDg2MyAzMy40MDE5MjM4LDMxLjUgQzMyLjU3NTI2NTksMzIuOTMxODEzNCAzMy4wNjgxODY2LDM0Ljc3MTQxODQgMzQuNSwzNS41OTgwNzYyIEMzNS44ODA2NzcyLDM2LjM5NTIxMDYgMzcuNjQwNTM4MSwzNS45NjUzMzg5IDM4LjUwNTY5NDQsMzQuNjQ5Nzk4NSBMMzguNTk4MDc2MiwzNC41IEMzOC44NzQyMTg2LDM0LjAyMTcwNzQgMzkuNDg1ODA5LDMzLjg1NzgzMjIgMzkuOTY0MTAxNiwzNC4xMzM5NzQ2IEM0MC40NDIzOTQyLDM0LjQxMDExNyA0MC42MDYyNjk0LDM1LjAyMTcwNzQgNDAuMzMwMTI3LDM1LjUgQzM4Ljk1MTE4NDQsMzcuODg4Mzk4NiAzNS44ODgzOTg2LDM4LjcwOTA2OTYgMzMuNSwzNy4zMzAxMjcgQzMxLjExMTYwMTQsMzUuOTUxMTg0NCAzMC4yOTA5MzA0LDMyLjg4ODM5ODYgMzEuNjY5ODczLDMwLjUgQzMzLjA0ODg4MDcsMjguMTExNDg4NSAzNi4xMTE1NTE1LDI3LjI5MDkwMTYgMzguNSwyOC42Njk4NzMgWiIvPgoJPC9zeW1ib2w+Cgk8c3ltYm9sIGlkPSJhcnR3b3JrLW1ham9yIj4KCQk8cGF0aCBkPSJNNTAuNTI2OTE2MywzNiBMNTMuNTU0MDAyMywzNi4wMDMyMzg5IEw1My43MTE4NzAxLDM2LjAxOTI3ODMgQzU0LjM3NTMzMTEsMzYuMTI3NDgzNyA1NC44NzkwOTc4LDM2LjY3MDM1MDEgNTQuOTQzMzE3OSwzNy4zMzI5NjA2IEw1NC45NTAyNDk3LDM3LjQ3NjY2NjcgTDU0Ljk0OTc1NzUsMzguMjU1NjI4MyBMNTQuOTUzMjc5MiwzOC4zODU0NDAyIEM1NC45ODc1MTc3LDM4LjkxNDU3ODggNTUuMzA5NjE0NCwzOS4zODIwMDEgNTUuODI2NzQxNSwzOS42MjIyODIxIEw1Ni4zNTg5NTk1LDM5Ljg0NDcwNCBMNTYuNTYyMTAwNiwzOS45MzUwODU3IEM1Ny4wNjU2MjQxLDQwLjE2NzQxOTMgNTcuNjYwNjIzOCw0MC4wODY5IDU4LjA5MDcwNjcsMzkuNzM2NDU4MyBMNTguMjAzNzIwNiwzOS42MzQyMjMzIEw1OC44NDcxMDE1LDM4Ljk5NzcyMiBMNTguOTg1MjgyMSwzOC44ODg1MTg1IEM1OS41MjY3MDEzLDM4LjUxNjk5NzkgNjAuMjQ4MTE5NSwzOC41NDk5OTc2IDYwLjc1NTc5MjcsMzguOTYxNiBMNjAuODY4OTc0NSwzOS4wNjMyOTQyIEw2My4wMTA0MzA4LDQxLjIxMTAwMzkgTDYzLjExOTQyNDgsNDEuMzQ5MTk3MiBDNjMuNDg5NjU2OCw0MS44OTAwNjI3IDYzLjQ1NTk4NzcsNDIuNjEwNzUxMSA2My4wNDUxODc0LDQzLjExNzY0NTggTDYyLjk0MzcwNDgsNDMuMjMwNjQ3MiBMNjIuMzkwMTExMiw0My43ODQzMDY4IEw2Mi4yOTY4OTk2LDQzLjg4MjQ5MzcgQzYxLjkyMTAyOTQsNDQuMzExMjExNCA2MS44MzIwMyw0NC45MzA3MTE2IDYyLjA3OTQyOTIsNDUuNDYzMDA2NyBDNjIuMTQxNjU0MSw0NS41OTk5MTk1IDYyLjIwMjUyOTYsNDUuNzQxNzU3NCA2Mi4yNTg1OTMzLDQ1Ljg4MDAwNDMgTDYyLjM4NTA0MjEsNDYuMTk5OTM4MiBDNjIuNTkyODQ0LDQ2LjY2ODMxNDkgNjMuMDUxODcxOCw0Ni45OTMxNjcxIDYzLjU3MjkwMTIsNDcuMDQzMjQ5NCBMNjMuNzE2Mzk1Miw0Ny4wNDk5OTcyIEw2NC42MDQwMDIzLDQ3LjA1MzIzODkgTDY0Ljc2MTg3MDEsNDcuMDY5Mjc4MyBDNjUuNDI1MzMxMSw0Ny4xNzc0ODM3IDY1LjkyOTA5NzgsNDcuNzIwMzUwMSA2NS45OTMzMTc5LDQ4LjM4Mjk2MDYgTDY2LjAwMDI0OTcsNDguNTI2NjY2NyBMNjUuOTk3MDEwOCw1MS41NTM3NTI2IEw2NS45ODA5NzEzLDUxLjcxMTYyMDQgQzY1Ljg3Mjc2Niw1Mi4zNzUwODE1IDY1LjMyOTg5OTYsNTIuODc4ODQ4MSA2NC42NjcyODksNTIuOTQzMDY4MyBMNjQuNTIzNTgzLDUyLjk1IEw2My43MzY1NDUxLDUyLjk0OTcyODYgTDYzLjYwOTQyMzUsNTIuOTUyMTI1OCBDNjMuMDkwNDU1OCw1Mi45ODE2OTE1IDYyLjYyMTk2NzUsNTMuMzAwMTU0NCA2Mi4zODYyMzY4LDUzLjc5MjYxOTMgTDYyLjMyNzg1NDQsNTMuOTMxMTU1NiBMNjIuMjUwODMyOCw1NC4xMjUyMjQzIEM2Mi4xOTM0NjQ5LDU0LjI2NTcyNTkgNjIuMTMxNTE0LDU0LjQwOTM4MDcgNjIuMDYzOTQ5Nyw1NC41NTc4NDI2IEM2MS44MzExOTgyLDU1LjA1ODQ2NDYgNjEuOTEyNDcyNSw1NS42NTUyMzIxIDYyLjI2NjQzNTQsNTYuMDg3MDE5NyBMNjIuMzY5NzAwNSw1Ni4yMDA0OTM0IEw2My4wMDI1Mjc2LDU2Ljg0MDIyMTggTDYzLjExMTczMTIsNTYuOTc4NDAyNCBDNjMuNDgzMjUxOCw1Ny41MTk4MjE2IDYzLjQ1MDI1MjEsNTguMjQxMjM5OSA2My4wMzk1NTAxLDU4Ljc0ODAxMTEgTDYyLjkzODA4MDIsNTguODYwOTY4NCBMNjAuNzg2NTg3NCw2MS4wMTI3MTk0IEw2MC42NDgzNTMsNjEuMTIxNDU1IEM2MC4xMDgyNjE0LDYxLjQ4OTg3OSA1OS4zODg0MTc0LDYxLjQ1NDk3OTIgNTguODgyNDAwNyw2MS4wNDQ3Njg3IEw1OC43Njk2MDI1LDYwLjk0MzQ1NTIgTDU4LjIxNzMyMzQsNjAuMzkxMTU3NyBMNTguMTE4Njk0Niw2MC4yOTc4OTQ3IEM1Ny42ODgxOTU1LDU5LjkyMTcyNDIgNTcuMDcwNTIzNSw1OS44MzI2MjA4IDU2LjU0MDU2MzIsNjAuMDc3NjQxMyBDNTYuNDAxODQzOSw2MC4xNDA3MDg4IDU2LjI1OTM5OTYsNjAuMjAxODg1MyA1Ni4xMjA3NzExLDYwLjI1ODEyMzkgTDU1LjgwMDMxMTUsNjAuMzg0NzkyNCBDNTUuMzMxOTM0OCw2MC41OTI1OTQzIDU1LjAwNzA4MjUsNjEuMDUxNjIyMSA1NC45NTcwMDAyLDYxLjU3MjY1MTUgTDU0Ljk1MDI1MjUsNjEuNzE2MTQ1NSBMNTQuOTQ3MDEwOCw2Mi42MDM3NTI2IEw1NC45MzA5NzEzLDYyLjc2MTYyMDQgQzU0LjgyMjc2Niw2My40MjUwODE1IDU0LjI3OTg5OTYsNjMuOTI4ODQ4MSA1My42MTcyODksNjMuOTkzMDY4MyBMNTMuNDczNTgzLDY0IEw1MC40NDY0OTcsNjMuOTk2NzYxMSBMNTAuMjg4NjI5Miw2My45ODA3MjE3IEM0OS42MjUxNjgyLDYzLjg3MjUxNjMgNDkuMTIxNDAxNiw2My4zMjk2NDk5IDQ5LjA1NzE4MTQsNjIuNjY3MDM5NCBMNDkuMDUwMjQ5Nyw2Mi41MjMzMzMzIEw0OS4wNTA2ODY0LDYxLjc0MjU1MTUgTDQ5LjA0NzQyODcsNjEuNjEzNjgzMSBDNDkuMDE0MzkyOSw2MS4wODgxODEyIDQ4LjY5NDgyMjIsNjAuNjIxNDM1NSA0OC4xODUwMzk0LDYwLjM4MTI1MzMgTDQ3LjY0NTY1MzgsNjAuMTU1NDU5OCBMNDcuNDU1MDY3MSw2MC4wNzA3OTM5IEM0Ni45NTAzNDQzLDU5Ljg0NjU3NjcgNDYuNzIyOTQ5Niw1OS4yNTU2NTQxIDQ2Ljk0NzE2NjgsNTguNzUwOTMxMyBDNDcuMTU1MzY4NSw1OC4yODIyNjAxIDQ3LjY3OTc2LDU4LjA1MjcxMzcgNDguMTU3NzIwMiw1OC4yMDE4MzM0IEw0OC4yNjcwMjk0LDU4LjI0MzAzMSBMNDguNDM4MDUxMiw1OC4zMTkyNTM5IEw0OC43Njc1NjUzLDU4LjQ1ODY2NDcgQzQ5Ljk5ODg0NzEsNTguOTAzNTAyMiA1MC44NjcwOTg4LDYwLjAwMjY3ODIgNTEuMDI1ODk1LDYxLjMxMjgzNDcgTDUxLjA0NTAyMTgsNjEuNTIxMzkwMiBMNTEuMDUwMjQ5Nyw2MS43MTMgTDUxLjA1MTA0ODIsNjIgTDUyLjk1MTA0ODIsNjIgTDUyLjk1MDI1NDIsNjEuNzE3OTU0NyBDNTIuOTQ3ODk4LDYwLjQxODExODMgNTMuNjc0NjUyOCw1OS4yMjk4MDg5IDU0LjgzMzU4ODEsNTguNjMyODIzOCBMNTUuMDIwMTI2MSw1OC41NDM1NDcgTDU1LjQ1MTg1NzYsNTguMzcwNjU5OSBMNTUuNzA3MDAwMSw1OC4yNTk2MzkyIEM1Ni44ODI4ODI3LDU3LjcxNTkzNDggNTguMjU2ODg5LDU3Ljg3NjYwMDYgNTkuMjkxMzMwNCw1OC42NzYwNjU5IEw1OS40NjA1MDA5LDU4LjgxNTIxMzYgTDU5LjYwNzc5NzYsNTguOTUzOTQ4MyBMNTkuODE2MDQ4Miw1OS4xNjEgTDYxLjE1NjA0ODIsNTcuODE2IEw2MC45NTgxODA1LDU3LjYxNzM4NjEgQzU5Ljk3MzQ2MzQsNTYuNjQxNDIzOCA1OS42NjkwMDQ0LDU1LjE3NDg0MDggNjAuMTY2Mjc3Miw1My45MTAzMDg1IEw2MC4yNDY4OTYyLDUzLjcyMjIzMDYgTDYwLjMyNDczODEsNTMuNTQ2NjMyOSBMNjAuMzk1NDY4NCw1My4zNzg1NTA5IEw2MC40NTkyNjI0LDUzLjIxODY1NDMgQzYwLjkxMDcxNzMsNTEuOTg1NzI4OSA2Mi4wMTk4MjcsNTEuMTE4ODA3NCA2My4zMzEwOTk5LDUwLjk3MDc4MzggTDYzLjUyOTI1MDEsNTAuOTU0MDE2MSBMNjMuNzEzMjQ5Nyw1MC45NSBMNjQuMDAxMDQ4Miw1MC45NSBMNjQuMDAxMDQ4Miw0OS4wNSBMNjMuNzE4MjA0Myw0OS4wNDk5OTU1IEM2Mi40MTgzNjgsNDkuMDUyMzUxNyA2MS4yMzAwNTg1LDQ4LjMyNTU5NjggNjAuNjMzMDczNSw0Ny4xNjY2NjE2IEw2MC41NDM3OTY3LDQ2Ljk4MDEyMzYgTDYwLjQwNzI1NTUsNDYuNjM2ODI4NSBMNjAuMjYyMjMwMiw0Ni4yOTgyOTk4IEM1OS43MTQ4MDQyLDQ1LjEyMDY3MDEgNTkuODc1MTYwOSw0My43NDE5Mzk0IDYwLjY3NzAzMzYsNDIuNzA3MjMwOSBMNjAuODE2NjA3Niw0Mi41MzgwNTgzIEw2MC45NTQxOTgsNDIuMzkyNDUyIEw2MS4xNjIwNDgyLDQyLjE4NSBMNTkuODIyMDQ4Miw0MC44NDUgTDU5LjYxODUzMTksNDEuMDQ3ODM3MiBDNTguNjQzMDk3Myw0Mi4wMjYxODIzIDU3LjE4MzQxMDYsNDIuMzI4MDA0NyA1NS45MjQzMTY5LDQxLjgzNjU5NTIgTDU1LjczNzA0MjksNDEuNzU2OTE5OSBMNTUuNTY1Mzc1LDQxLjY4MDQwOSBMNTUuMjUwMjUyMyw0MS41NDYyMjA1IEM1NC4wMDkyNDMxLDQxLjEwNTI4ODggNTMuMTMzMDcyOSw0MC4wMDA4MjQ2IDUyLjk3NDI1NjYsMzguNjgwOTI3MyBMNTIuOTU1ODU4MywzOC40ODEzODI5IEw1Mi45NTAyNDk3LDM4LjI4NyBMNTIuOTUxMDQ4MiwzOCBMNTEuMDUxMDQ4MiwzOCBMNTEuMDUwMjQ1MiwzOC4yODIwNDUzIEM1MS4wNTI2MDE0LDM5LjU4MTg4MTcgNTAuMzI1ODQ2NSw0MC43NzAxOTExIDQ5LjE2NjkxMTIsNDEuMzY3MTc2MiBMNDguOTgwMzczMiw0MS40NTY0NTMgTDQ4LjgxNDc0NzMsNDEuNTIzMTY2OCBDNDguNjM1ODIyMyw0MS41OTEzODIgNDguNDU3ODA2Nyw0MS42NjU2ODIzIDQ4LjI4NzY4NzEsNDEuNzQzMDI1NyBDNDcuNzg0OTIzNyw0MS45NzE2MDI4IDQ3LjE5MjA1NTIsNDEuNzQ5MzMxIDQ2Ljk2MzQ3ODEsNDEuMjQ2NTY3NyBDNDYuNzM0OTAxLDQwLjc0MzgwNDMgNDYuOTU3MTcyOSw0MC4xNTA5MzU4IDQ3LjQ1OTkzNjIsMzkuOTIyMzU4NyBDNDcuNTk4NjU1NCwzOS44NTkyOTEyIDQ3Ljc0MTA5OTcsMzkuNzk4MTE0NyA0Ny44Nzk3MjgyLDM5Ljc0MTg3NjEgTDQ4LjIwMDE4NzksMzkuNjE1MjA3NiBDNDguNjY4NTY0NiwzOS40MDc0MDU3IDQ4Ljk5MzQxNjgsMzguOTQ4Mzc3OSA0OS4wNDM0OTkxLDM4LjQyNzM0ODUgTDQ5LjA1MDI0NjgsMzguMjgzODU0NSBMNDkuMDUzNDg4NSwzNy4zOTYyNDc0IEw0OS4wNjk1MjgsMzcuMjM4Mzc5NiBDNDkuMTc3NzMzNCwzNi41NzQ5MTg1IDQ5LjcyMDU5OTgsMzYuMDcxMTUxOSA1MC4zODMyMTAzLDM2LjAwNjkzMTcgTDUwLjUyNjkxNjMsMzYgWiBNMzMuODU4MTYwOCwxNiBMMzcuNzM3MTYyNSwxNi4wMDMyNTg0IEwzNy45MTc2MTEzLDE2LjAyMTE4MzMgQzM4LjY0NjM1NjIsMTYuMTQwMzk2MSAzOS4xOTgxNTIxLDE2LjczOTczODMgMzkuMjY0MjgsMTcuNDY4ODUgTDM5LjI3MDkzODUsMTcuNjE2Mjk4OCBMMzkuMjcwNDQ5MywxOC42MzI3Mjk4IEwzOS4yNzU0NTk0LDE4LjgxMDM5MjkgQzM5LjMyNzQ2MDksMTkuNjE2NDg0MSAzOS44MjM3MzQyLDIwLjMyNTY4MDggNDAuNTk2ODgxNiwyMC42NzAwNzUzIEw0MC43NjY3MzI5LDIwLjczODE5MjggTDQxLjI1OTQ5MDcsMjAuOTQ2MTY2MSBMNDEuNTE3NjQzNSwyMS4wNjEzNDIxIEM0Mi4yODA2MjY2LDIxLjQxNDQ2MDkgNDMuMTgyODE0NSwyMS4yODM3ODUyIDQzLjgyMzc2MDksMjAuNzM3NTkzMyBMNDMuOTU2OTYyMSwyMC42MTQyMTcxIEw0NC43NjY0NDMxLDE5LjgwOTM5MjYgTDQ0LjkyMzYxMywxOS42ODQwNjc3IEM0NS41MTkwNzk5LDE5LjI3NDIyMTggNDYuMzE0NzQ2MiwxOS4zMTMwMjA1IDQ2Ljg3MDc1NiwxOS43NzEyOTc5IEw0Ni45ODYwNzI1LDE5Ljg3NTkxMDIgTDQ5LjcyODA3MSwyMi42MzI0Nzc4IEw0OS44NTI1NjcxLDIyLjc4OTg1NjcgQzUwLjI1ODE1MTIsMjMuMzg0MTYyNSA1MC4yMTg5Njc3LDI0LjE3NzQxNzUgNDkuNzY0MTQ1MywyNC43MzI1ODI0IEw0OS42NjAzMzIyLDI0Ljg0Nzc0MjggTDQ4Ljk0MDY4NDgsMjUuNTY5ODQ3NiBMNDguODEzNjczOSwyNS43MDQzNzE0IEM0OC4yNTI3MTQsMjYuMzQ2MTQwOCA0OC4xMjAwNDUzLDI3LjI3MjQwODMgNDguNDg3MDMyNiwyOC4wNjQzNTQ1IEM0OC41NjU1NTQ2LDI4LjIzNzY0ODkgNDguNjQyNDE3NSwyOC40MTcyODI1IDQ4LjcxMzc4NzYsMjguNTkzODU0NSBMNDguODc5ODkzNywyOS4wMTQ3Mzk4IEM0OS4xOTYzNjQ5LDI5LjczMDIxMzMgNDkuODk4MTYwMSwzMC4yMTk3MDkyIDUwLjY4OTA1NDMsMzAuMjgwNTI2MyBMNTAuODU5Nzg3NCwzMC4yODY5MjMzIEw1MS45ODA5Mzg3LDMwLjI5MDE4NTQgTDUyLjA4MDYwODQsMzAuMjk4MjUxMiBDNTIuNjMxMDkzNiwzMC4zNDI3OTkyIDUzLjA0MTIzNjcsMzAuODI1MTY5IDUyLjk5NjY4ODcsMzEuMzc1NjU0MSBDNTIuOTU1MzIyNiwzMS44ODY4MTg5IDUyLjUzNjQ0NzEsMzIuMjc2OTc0NSA1Mi4wMzYwNjk1LDMyLjI5NDQzNTMgTDUxLjkxOTI4NTcsMzIuMjkxNzM0MyBMNTEuOTAwMjczOCwzMi4yODY5MjcgTDUwLjg2MTYwMjEsMzIuMjg2OTIxNyBDNDkuMjgzMjI1NiwzMi4yODk3OTE0IDQ3Ljg0MTYzNjcsMzEuMzk4ODExOSA0Ny4xMzAyMzAyLDI5Ljk4ODQzNTkgTDQ3LjAzNzgwMTksMjkuNzkyOTI3NyBMNDYuOTUzOTI5MSwyOS41ODQyMDg5IEM0Ni44OTQwMTI4LDI5LjQyNjU3NTIgNDYuODMwNDMyMywyOS4yNjkxODUxIDQ2Ljc2NTk0NDQsMjkuMTE4Mjc5MSBMNDYuNjY4ODc2OSwyOC44OTc1NjMyIEM0Ni4wMDQ3ODEyLDI3LjQ2NDYyNDMgNDYuMjA1Nzk2MSwyNS43ODUyODkgNDcuMTg2MDM1MiwyNC41Mzc0MjI1IEw0Ny4zMzEzNjEsMjQuMzYyMTY0MyBMNDcuNTAyNjcwMywyNC4xODAxNjQgTDQ3Ljk3Nzk0NzEsMjMuNzA0IEw0NS44Mzk5NDcxLDIxLjU2IEw0NS4zNzM5MDk4LDIyLjAyNTY4OTYgQzQ0LjE5MDQ3ODYsMjMuMjE2MjQ3NyA0Mi40MTQ5OTY3LDIzLjU3ODU1MDEgNDAuODg4MTgzOCwyMi45Njc0NzM5IEw0MC42OTA1MTM2LDIyLjg4MjIzNjIgTDQwLjQ2Mzg4MjcsMjIuNzgwOTk0NSBMNDAuMDQyNTQ2MywyMi42MDE2MTU5IEMzOC41NDAxNDc2LDIyLjA2NjE5NTIgMzcuNDgxOTM2MiwyMC43MjIzMjM0IDM3LjI5NzY5LDE5LjEyNTMzNDYgTDM3LjI3ODAyMywxOC45MDYwNDY3IEwzNy4yNzA5Mzg1LDE4LjY2NDAwNjggTDM3LjI3MDk0NzEsMTggTDM0LjI0Mzk0NzEsMTggTDM0LjI0MzcxOCwxOC42NTgxMzcyIEMzNC4yNDY1NzQ2LDIwLjIzODc1MTYgMzMuMzU5MDUwMiwyMS42ODM0MTIzIDMxLjk1MjMyMzEsMjIuMzk3MTY0MSBMMzEuNzU3MzEzMywyMi40ODk5MDc2IEwzMS41NDkxMDI3LDIyLjU3NDA4MjYgQzMxLjM5MTYyMSwyMi42MzQzMDQzIDMxLjIzNDY4NjcsMjIuNjk4MTAxNyAzMS4wODI2OTUzLDIyLjc2MzUxNTcgTDMwLjg1ODk2NDcsMjIuODYyNjA0MiBDMjkuNDI5OTEyOCwyMy41MjUzNzA3IDI3Ljc1ODAwMzYsMjMuMzIyOTgwNSAyNi41MTIzNjQ4LDIyLjM0MTM5NzcgTDI2LjMzNzM4ODQsMjIuMTk1ODgwMiBMMjYuMTU0MTQ2LDIyLjAyMjkzNjQgTDI1LjY4NTk0NzEsMjEuNTU0IEwyMy41NDU5NDcxLDIzLjcgTDI0LjAwNzkwNjgsMjQuMTY0NjgyMSBDMjUuMjAxMzg4OCwyNS4zNTExMzY2IDI1LjU2NTA4MzYsMjcuMTM2ODgxMyAyNC45NTM0NTY5LDI4LjY2Mzc2ODQgTDI0Ljg2ODEzNjQsMjguODYxMzg5MSBMMjQuNzY3NDAzNiwyOS4wODgyNzE3IEwyNC41ODIzNTY4LDI5LjUyODA1NyBDMjQuMDQyODE5OCwzMS4wMjU5ODUxIDIyLjcwMzM0OTQsMzIuMDc5ODcwMyAyMS4xMTU0ODIyLDMyLjI2MTAzNzkgTDIwLjg5NzQ2NywzMi4yODAyOTMgTDIwLjY1ODkyODEsMzIuMjg2OTI3IEwxOS45OTk5NDcxLDMyLjI4NyBMMTkuOTk5OTQ3MSwzNS4zMyBMMjAuNjUzMDU5OCwzNS4zMjkzNzcyIEMyMi4yMzE0MzYyLDM1LjMyNjUwNzQgMjMuNjczMDI1MiwzNi4yMTc0ODY5IDI0LjM4NDQzMTYsMzcuNjI3ODYyOSBMMjQuNDc2ODYsMzcuODIzMzcxMSBMMjQuNTYwNzMyNywzOC4wMzIwODk5IEMyNC42MjA2NDksMzguMTg5NzIzNiAyNC42ODQyMjk2LDM4LjM0NzExMzcgMjQuNzQ4NzE3NCwzOC40OTgwMTk3IEwyNC44NDU3ODUsMzguNzE4NzM1NiBDMjUuNTA5ODgwNiw0MC4xNTE2NzQ1IDI1LjMwODg2NTgsNDEuODMxMDA5OCAyNC4zMjg2MjY2LDQzLjA3ODg3NjMgTDI0LjE4MzMwMDksNDMuMjU0MTM0NiBMMjQuMDExOTg2LDQzLjQzNjE0MDQgTDIzLjUzOTk0NzEsNDMuOTEyIEwyNS42Nzk5NDcxLDQ2LjA1OCBMMjYuMTQ1NSw0NS41OTA2MDkyIEMyNy4zMjg5MzEyLDQ0LjQwMDA1MTEgMjkuMTA0NDEzMSw0NC4wMzc3NDg3IDMwLjYzMTEyODcsNDQuNjQ4NzgxNiBMMzEuMDU0ODYxMyw0NC44MzQ5OTg2IEwzMS40OTMwMDc0LDQ1LjAyMDQ4NDYgQzMyLjk4NzM1NDcsNDUuNTYxOTk3OSAzNC4wMzc1MTUyLDQ2LjkwNDc2MDkgMzQuMjE3OTQwNyw0OC40OTQ5NzA0IEwzNC4yMzcxMTMzLDQ4LjcxMzI5ODggTDM0LjI0Mzk0NzEsNDkgTDM4LjAwMTk0NzEsNDkgTDM4LjAwMzIxMjgsNDguNDQ2MjczNSBMMzguMDE5MjUyMiw0OC4yODg0MDU3IEMzOC4xMjc0NTc2LDQ3LjYyNDk0NDYgMzguNjcwMzI0LDQ3LjEyMTE3OCAzOS4zMzI5MzQ1LDQ3LjA1Njk1NzggTDM5LjQ3NjY0MDUsNDcuMDUwMDI2MSBMNDAuMjU3NDIyNCw0Ny4wNTA0NjI5IEw0MC4zODYyOTA4LDQ3LjA0NzIwNTIgQzQwLjkxMTc5MjcsNDcuMDE0MTY5MyA0MS4zNzg1Mzg0LDQ2LjY5NDU5ODcgNDEuNjE4NzIwNiw0Ni4xODQ4MTU5IEw0MS44NDQ1MTQsNDUuNjQ1NDMwMyBMNDEuOTM2MjczOCw0NS40MzkyMzY5IEM0Mi4xNjkwMjUzLDQ0LjkzODYxNDggNDIuMDg3NzUxMSw0NC4zNDE4NDc0IDQxLjczMzc4ODIsNDMuOTEwMDU5OCBMNDEuNjMwNTIzLDQzLjc5NjU4NjEgTDQwLjk5NzY5NTksNDMuMTU2ODU3NiBMNDAuODg4NDkyNCw0My4wMTg2NzcxIEM0MC41MTY5NzE4LDQyLjQ3NzI1NzggNDAuNTQ5OTcxNCw0MS43NTU4Mzk2IDQwLjk2MTU3MzksNDEuMjQ4MTY2NCBMNDEuMDYzMjY4MSw0MS4xMzQ5ODQ2IEw0My4yMDk4OTg5LDM4Ljk5NDQyMjYgTDQzLjI3NTY3MDgsMzguOTM5ODI4IEM0My43MDA2MzExLDM4LjU4NzA4NTYgNDQuMzMxMDgzNywzOC42NDU2Mjk3IDQ0LjY4MzgyNjEsMzkuMDcwNTg5OSBDNDUuMDA5NDM0NSwzOS40NjI4NjA5IDQ0Ljk4NDU5NzYsNDAuMDMwMjI2IDQ0LjY0NDYwNzEsNDAuMzkyNjMzMyBMNDQuNTUzMDY0Miw0MC40Nzg3NDUyIEw0NC41NTU3MDA2LDQwLjQ3MDk4OTggTDQyLjg0NTM2NzUsNDIuMTgyODg3NCBMNDMuMDQyMDQzLDQyLjM3OTY5MzQgQzQ0LjAyNjc2MDIsNDMuMzU1NjU1NyA0NC4zMzEyMTkxLDQ0LjgyMjIzODcgNDMuODM3MDY5Niw0Ni4wNzk4MjMxIEw0My42ODA3Miw0Ni40Mzc4Mjc2IEw0My41NDEzMDkxLDQ2Ljc2NzM0MTcgQzQzLjA5NjQ3MTcsNDcuOTk4NjIzNSA0MS45OTcyOTU3LDQ4Ljg2Njg3NTMgNDAuNjg3MTM5Miw0OS4wMjU2NzE0IEw0MC40Nzg1ODM3LDQ5LjA0NDc5ODIgTDQwLjI4Njk3MzksNDkuMDUwMDI2MSBMNDAuMDAwMzY3NSw0OS4wNTA4ODc0IEw0MC4wMDAzNjc1LDUwLjk1MDg4NzQgTDQwLjI4MjAxOTIsNTAuOTUwMDMwNiBDNDEuNTgxODU1NSw1MC45NDc2NzQ0IDQyLjc3MDE2NSw1MS42NzQ0MjkzIDQzLjM2NzE1MDEsNTIuODMzMzY0NSBMNDMuNDU2NDI2OSw1My4wMTk5MDI2IEw0My41MjMxNDA3LDUzLjE4NTUyODUgQzQzLjU2ODUwMDUsNTMuMzA0NTA1IDQzLjYxNjY0MDQsNTMuNDIzMzEyMyA0My42NjUxODA1LDUzLjUzNjYwMDkgTDQzLjczNzk5MzMsNTMuNzAxNzI2MyBDNDQuMjg1NDE5Myw1NC44NzkzNTYgNDQuMTI1MDYyNyw1Ni4yNTgwODY3IDQzLjMyMzE5LDU3LjI5Mjc5NTIgTDQzLjE4MzYxNTksNTcuNDYxOTY3OCBMNDMuMDQ2MDE5OSw1Ny42MDc1Nzk3IEw0Mi44NDAzNjc1LDU3LjgxMzg4NzQgTDQ0LjU0OTE0OTUsNTkuNTIyNTIyIEM0NC45MDk2MzI2LDU5Ljg4MzAwNjggNDQuOTM3MzYwNyw2MC40NTAyMzggNDQuNjMyMzM0OCw2MC44NDI1Mjg0IEw0NC41NDkxNDU5LDYwLjkzNjczNTUgQzQ0LjE4ODY2MSw2MS4yOTcyMTg2IDQzLjYyMTQyOTksNjEuMzI0OTQ2NyA0My4yMjkxMzk1LDYxLjAxOTkyMDggTDQzLjEzNDkzMjQsNjAuOTM2NzMxOSBMNDAuOTk0Njk2OSw1OC43OTA0OTQzIEw0MC44ODUzMzg2LDU4LjY1MjQ2MjcgQzQwLjUxMzA2MzksNTguMTExNDM5IDQwLjU0NDk3OTYsNTcuMzkwMDkyMSA0MC45NTYzMTMzLDU2Ljg4MTM3MDMgTDQxLjA1Nzk2MDUsNTYuNzY3OTI2MiBMNDEuNjEwMTEyNCw1Ni4yMTU3MTk0IEw0MS43MDMzMjM5LDU2LjExNzUzMjQgQzQyLjA3OTE5NDEsNTUuNjg4ODE0NyA0Mi4xNjgxOTM1LDU1LjA2OTMxNDUgNDEuOTIwNzk0Myw1NC41MzcwMTk0IEM0MS44NTg1Njk0LDU0LjQwMDEwNjYgNDEuNzk3Njk0LDU0LjI1ODI2ODggNDEuNzQxNjMwMiw1NC4xMjAwMjE5IEw0MS42MTUxODE1LDUzLjgwMDA4NzkgQzQxLjQwNzM3OTUsNTMuMzMxNzExMiA0MC45NDgzNTE4LDUzLjAwNjg1OSA0MC40MjczMjI0LDUyLjk1Njc3NjcgTDQwLjI4MzgyODQsNTIuOTUwMDI5IEwzOS4zOTYyMjEyLDUyLjk0Njc4NzIgTDM5LjIzODM1MzQsNTIuOTMwNzQ3OCBDMzguNTc0ODkyNCw1Mi44MjI1NDI0IDM4LjA3MTEyNTgsNTIuMjc5Njc2IDM4LjAwNjkwNTYsNTEuNjE3MDY1NSBMMzcuOTk5OTczOSw1MS40NzMzNTk1IEwzNy45OTk5NDcxLDUxIEwzMy4yNDM3MjM0LDUxIEMzMi43MzA4ODc1LDUxIDMyLjMwODIxNjIsNTAuNjEzOTU5OCAzMi4yNTA0NTExLDUwLjExNjYyMTEgTDMyLjI0MzcyMzQsNTAgTDMyLjI0NDE1NzUsNDguOTgxNzU0MyBMMzIuMjM5NTA1OCw0OC44MDUzMTM4IEMzMi4xODkzMDIsNDguMDA0MzAxNyAzMS42OTY5MDQ5LDQ3LjI5NjAzNzUgMzAuOTMyNzQ2OCw0Ni45NTA4NzMxIEwzMC43NjQ5MDExLDQ2Ljg4MjU2NTQgTDMwLjI2MDQ0MjQsNDYuNjcwMzMwNCBMMzAuMDAxNzY2Myw0Ni41NTQ5NTY3IEMyOS4yMzg3ODMyLDQ2LjIwMTgzOCAyOC4zMzY1OTUzLDQ2LjMzMjUxMzYgMjcuNjk1NjQ4OSw0Ni44Nzg3MDU2IEwyNy41NjI0NDc3LDQ3LjAwMjA4MTcgTDI2Ljc1Mjk2NjcsNDcuODA2OTA2MiBMMjYuNTk1Nzk2OCw0Ny45MzIyMzExIEMyNi4wMDAzMjk4LDQ4LjM0MjA3NyAyNS4yMDQ2NjM2LDQ4LjMwMzI3ODMgMjQuNjQ4NjUzNyw0Ny44NDUwMDA5IEwyNC41MzMzMzczLDQ3Ljc0MDM4ODcgTDIxLjc5MjU1NjgsNDQuOTg1Mjk0MSBMMjEuNjY3NTQ0OCw0NC44Mjc5NjcgQzIxLjI1OTYwNzcsNDQuMjMzMzE5NSAyMS4yOTY4NTg2LDQzLjQzOTM4NTQgMjEuNzUyMjE5NCw0Mi44ODIyNzYxIEwyMS44NTYxODY1LDQyLjc2NjY3OTQgTDIyLjU3Mzk3Nyw0Mi4wNDY0NTEyIEwyMi43MDA5ODgsNDEuOTExOTI3NCBDMjMuMjYxOTQ3OSw0MS4yNzAxNTggMjMuMzk0NjE2Niw0MC4zNDM4OTA1IDIzLjAyNzYyOTIsMzkuNTUxOTQ0NCBDMjIuOTQ5MTA3MywzOS4zNzg2NDk5IDIyLjg3MjI0NDQsMzkuMTk5MDE2MyAyMi44MDA4NzQyLDM5LjAyMjQ0NDMgTDIyLjYzNDc2ODIsMzguNjAxNTU5IEMyMi4zMTgyOTcsMzcuODg2MDg1NSAyMS42MTY1MDE3LDM3LjM5NjU4OTYgMjAuODI1NjA3NiwzNy4zMzU3NzI1IEwyMC42NTQ4NzQ0LDM3LjMyOTM3NTUgTDE5LjUzMzcyMzEsMzcuMzI2MTEzNCBMMTkuMzUzMjc0MywzNy4zMDgxODg1IEMxOC42MjQ1Mjk0LDM3LjE4ODk3NTggMTguMDcyNzMzNCwzNi41ODk2MzM1IDE4LjAwNjYwNTYsMzUuODYwNTIxOCBMMTcuOTk5OTQ3MSwzNS43MTMwNzMgTDE4LjAwMzE2NjUsMzEuODIzMDQ3OCBMMTguMDIwOTUxNCwzMS42NDI3NjIyIEMxOC4xMzk0ODk1LDMwLjkxMzc0NDMgMTguNzM3NDgzNywzMC4zNTk5ODI5IDE5LjQ2Njg2MDUsMzAuMjkzNjEwNSBMMTkuNjE0Mzg0NSwzMC4yODY5MjcgTDIwLjYyOTI4NzIsMzAuMjg3MzY2NCBMMjAuODA0ODk1NCwzMC4yODI3MTQ1IEMyMS42MDEyMTQ4LDMwLjIzMjUwMTkgMjIuMzA2NDQ3OCwyOS43MzkxNzkxIDIyLjY1MDY1MjEsMjguOTcyMjMwMSBMMjIuNzE4Nzg1OSwyOC44MDM3NTc1IEwyMi45MzAzMjc1LDI4LjI5Nzg5MjYgTDIzLjA0NjUyNjQsMjguMDM1ODkyOCBDMjMuNDAyNDg0NywyNy4yNjc5NDc0IDIzLjI2Nzc0NTgsMjYuMzUxNzc4NiAyMi43MTExNjU3LDI1LjcwNTA2NDcgTDIyLjU5NDI0NTUsMjUuNTc5NDM4NCBMMjEuNzk2NjM1MSwyNC43NzIyODE3IEwyMS42NzE4MjMzLDI0LjYxNDgxNjEgQzIxLjI2NDc0MjYsMjQuMDE5Nzc3OCAyMS4zMDMxODU3LDIzLjIyNTc2MjggMjEuNzU4ODc1OCwyMi42Njk3NzUyIEwyMS44NjI4OTk4LDIyLjU1NDQzNzYgTDI0LjYxMDEyMzUsMTkuODA0OTc1OCBMMjQuNzY3MjE4MSwxOS42Nzk1NDIxIEMyNS4zNjIyNDY4LDE5LjI2OTM5NjUgMjYuMTU3NjkzNSwxOS4zMDcyNDQ1IDI2LjcxNTAxOTEsMTkuNzY1MTQ0NiBMMjYuODMwNjQxNSwxOS44Njk2ODUyIEwyNy41NDY3OTc2LDIwLjU4NzgzNzEgTDI3LjY4MTQyMzQsMjAuNzE1MjE5NCBDMjguMzIxOTM0NCwyMS4yNzY1OTQgMjkuMjM5MDAwMSwyMS40MDkyODc3IDMwLjAyMzMxNjgsMjEuMDQ1NTU5NSBDMzAuMTk4NDkyOCwyMC45NjU2NzU5IDMwLjM3ODQ0MDMsMjAuODg4MTU5NCAzMC41NTUwMDc5LDIwLjgxNjMzMTggTDMwLjk3NTEyNzIsMjAuNjQ5NTEyNiBDMzEuNjg3ODk5MSwyMC4zMzIzMjMyIDMyLjE3NjYwODIsMTkuNjI3Mjg5OSAzMi4yMzczMzI1LDE4LjgzMTcwMTggTDMyLjI0MzcxOTcsMTguNjU5OTQwOSBMMzIuMjQ2OTQyOCwxNy41MzYxMjA4IEwzMi4yNjQ3Mjc2LDE3LjM1NTgzNTIgQzMyLjM4MzI2NTcsMTYuNjI2ODE3MyAzMi45ODEyNiwxNi4wNzMwNTU5IDMzLjcxMDYzNjgsMTYuMDA2NjgzNSBMMzMuODU4MTYwOCwxNiBaIE02NSwzMCBDNjUuNTUyMjg0NywzMCA2NiwzMC40NDc3MTUzIDY2LDMxIEM2NiwzMS41MTI4MzU4IDY1LjYxMzk1OTgsMzEuOTM1NTA3MiA2NS4xMTY2MjExLDMxLjk5MzI3MjMgTDY1LDMyIEw2MSwzMiBDNjAuNDQ3NzE1MywzMiA2MCwzMS41NTIyODQ3IDYwLDMxIEM2MCwzMC40ODcxNjQyIDYwLjM4NjA0MDIsMzAuMDY0NDkyOCA2MC44ODMzNzg5LDMwLjAwNjcyNzcgTDYxLDMwIEw2NSwzMCBaIE01NywzMCBDNTcuNTUxNDAwMSwzMCA1OCwzMC40NDg1OTk5IDU4LDMxIEM1OCwzMS41NTE0NDcxIDU3LjU1MTQwMDEsMzIgNTcsMzIgQzU2LjQ0ODU5OTksMzIgNTYsMzEuNTUxNDQ3MSA1NiwzMSBDNTYsMzAuNDQ4NTk5OSA1Ni40NDg1OTk5LDMwIDU3LDMwIFoiLz4KCTwvc3ltYm9sPgogIDx1c2UgY2xhc3M9ImZyLWFydHdvcmstbWFqb3IiIGhyZWY9IiNhcnR3b3JrLW1ham9yIi8+CiAgPHVzZSBjbGFzcz0iZnItYXJ0d29yay1taW5vciIgaHJlZj0iI2FydHdvcmstbWlub3IiLz4KICA8dXNlIGNsYXNzPSJmci1hcnR3b3JrLW1ham9yIiBocmVmPSIjYXJ0d29yay1tYWpvciIvPgo8L3N2Zz4K"
                          aria-hidden="true"
                          width="80"
                          height="80"
                          class="fr-artwork"
                        >
                      </div>

                    </div>
                  </div>

                </fieldset>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

function ajouterBoutonThemeDSFR() {
  const listeFooter = document.querySelector(
    ".fr-footer__bottom-list"
  );

  if (!listeFooter) {
    console.warn("Liste du footer introuvable.");
    return;
  }

  // Évite de créer le bouton plusieurs fois
  if (listeFooter.querySelector('[aria-controls="fr-theme-modal"]')) {
    return;
  }

  const li = document.createElement("li");
  li.className = "fr-footer__bottom-item";

  li.innerHTML = `
    <button
      aria-controls="fr-theme-modal"
      data-fr-opened="false"
      title="Paramètres d'affichage"
      type="button"
      class="fr-btn--display fr-btn"
    >
      Paramètres d'affichage
    </button>
  `;

  listeFooter.appendChild(li);
}

function remplacerIconesCopyDSFR() {
  document.querySelectorAll("i.fa.fa-copy").forEach(icone => {
    const nouvelleIcone = document.createElement("span");

    nouvelleIcone.className =
      "fr-icon fr-icon--lg fr-icon-clipboard-line";

    nouvelleIcone.setAttribute("aria-hidden", "true");

    icone.replaceWith(nouvelleIcone);
  });
}

function nettoyerElementsPage() {
  // Supprimer le premier <li> de <ul class="summary">
  const premierLiSummary = document.querySelector(
    "ul.summary > li:first-child"
  );
  premierLiSummary?.remove();

  // Supprimer les éléments <li class="divider">
  document.querySelectorAll("li.divider").forEach((element) => {
    element.remove();
  });
  // Supprimer les éléments <a class="navigation">
  document.querySelectorAll("a.navigation").forEach((element) => {
    element.remove();
  });

  // Supprimer la div class="book-header"
  const bookHeader = document.querySelector(
    "div.book-header"
  );
  bookHeader?.remove();

  // Supprimer la div class="book-summary"
  const bookSum = document.querySelector(
    "div.book-summary"
  );
  bookSum?.remove();

}

function ajouterCorrectionsCSSDSFR() {
  if (document.getElementById("dsfr-gouvdown-overrides")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "dsfr-gouvdown-overrides";

  style.textContent = `
    /* =====================================================
       Couleurs générales
       ===================================================== */

    .content-editorial {
      color: var(--text-default-grey);
    }

    .content-editorial h1,
    .content-editorial h2,
    .content-editorial h3,
    .content-editorial h4,
    .content-editorial h5,
    .content-editorial h6 {
      color: var(--text-title-grey);
    }

    .content-editorial a {
      color: var(--text-action-high-blue-france);
    }

    .content-editorial .author,
    .content-editorial .date,
    .content-editorial small {
      color: var(--text-mention-grey);
    }


    /* =====================================================
       Code
       ===================================================== */

    .content-editorial pre {
      background-color: var(--background-contrast-grey);
      color: var(--text-default-grey);
    }

    .content-editorial pre code.sourceCode {
      color: var(--text-default-grey);
    }

    .content-editorial pre code.sourceCode .co {
      color: var(--text-mention-grey);
    }

    .content-editorial pre code.sourceCode .kw {
      color: var(--text-action-high-blue-france);
    }

    .content-editorial pre code.sourceCode .fu {
      color: var(--text-title-blue-france);
    }

    .content-editorial pre code.sourceCode .st {
      color: var(--text-default-success);
    }

    .content-editorial pre code.sourceCode .dv,
    .content-editorial pre code.sourceCode .fl {
      color: var(--text-action-high-blue-france);
    }


    /* =====================================================
       Tableaux
       ===================================================== */

    .content-editorial table {
      color: var(--text-default-grey);
    }

    .content-editorial th {
      color: var(--text-label-grey);
      background-color: var(--background-contrast-grey);
    }

    .content-editorial td {
      color: var(--text-default-grey);
    }


    /* =====================================================
       Citations
       ===================================================== */

    .content-editorial blockquote {
      color: var(--text-default-grey);
      background-color: var(--background-alt-grey);
      border-left-color: var(--border-default-grey);
    }


    /* =====================================================
       Séparateurs
       ===================================================== */

    .content-editorial hr {
      border: 0;
      border-top: 1px solid var(--border-default-grey);
    }
  `;

  document.head.appendChild(style);
}

function chargerCSS(urls) {
  if (!Array.isArray(urls)) {
    urls = [urls];
  }
  return urls.reduce((promise, url) => {
    return promise.then(() => {
	  return new Promise((resolve, reject) => {
		const link = document.createElement("link");

		link.rel = "stylesheet";
		link.href = url;

		link.onload = () => resolve();
		link.onerror = () => reject(
		  new Error(`Impossible de charger le CSS : ${url}`)
		);

		document.head.appendChild(link);
	  });
	});
  }, Promise.resolve());
}

function chargerJS(urls, options = {}) {
  // Si une seule URL est fournie, on la transforme en tableau
  if (!Array.isArray(urls)) {
    urls = [urls];
  }

  return urls.reduce((promise, url) => {
    return promise.then(() => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src = url;

        // Permet notamment de charger un module ES
        if (options.type) {
            if(options.type == "nomodule"){
              script.nomodule = "";
            }else{
              script.type = options.type;
            }
        }

        script.onload = () => resolve();

        script.onerror = () => reject(
          new Error(`Impossible de charger le JavaScript : ${url}`)
        );

        document.head.appendChild(script);
      });
    });
  }, Promise.resolve());
}

async function initialiserPage() {

  // Désactiver les anciens styles
  desactiverDefaultCSS();

  // 1. Configurer la balise <html>
  configurerBaliseHTML();

  // 2. Ajouter les métadonnées
  ajouterMetaOpenGraph();

  // 3. Ajouter les skiplinks au début du body
  ajouterSkiplinksDSFR();

  // 4. Ajouter le header juste après les skiplinks
  ajouterHeaderDSFR();

  // 5. Ajouter au header les liens directs
  ajouterLiensHeaderDSFR();

  // 6. Transformer .book en <main>
  transformerBookEnMain();

  // 7. Transformer summary en slide-menu
  transformerMenuDSFR();

  // 8. Transformer book-body en corps de page
  transformerCorpsDSFR();

  // 9. Créer le pied de page DSFR
  creerFooterDSFR();
  ajouterLiensFooterDSFR();
  
  // 10. Gérer les thèmes
  ajouterModaleThemeDSFR();
  ajouterBoutonThemeDSFR();
  
  // 10. remplacerIconesCopyDSFR
  remplacerIconesCopyDSFR();

  // 11. Nettoyer les éléments inutiles
  nettoyerElementsPage();

  // fin. Charger le CSS et le JS DSFR
  await Promise.all([
    chargerCSS(
      urlcssdsfr
    ),
    chargerJS(
      urljsdsfr,
      { type: "module" }
    )
    /*
    chargerJS(
      urljsdsfr_nomodule,
      { type: "nomodule" }
    )
    */
  ]);
  
  // finalisation. Ajuster largeur image si besoin
  ajusterLargeurImages();
  
  // correctif css
  ajouterCorrectionsCSSDSFR()
  
}

document.addEventListener("DOMContentLoaded", async () => {
  document.body.prepend(loading);
  // On rend le spinner visible
  document.body.style.visibility = "visible";

  try {
	const connexionOK = await verifierConnexionInternet();
	if (!connexionOK) {
      console.warn("Connexion Internet indisponible.");
	  loading.remove();
      // Arrêter complètement l'initialisation
      return;
    }
    await initialiserPage();
  } finally {
    loading.remove();
  }
});









