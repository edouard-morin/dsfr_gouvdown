/*
dsfrinmygitbookgouvdown.js
Copyright (c) 2026, DREAL Pdl, Edouard MORIN
Ce fichier a été développé avec l'assistance d'une intelligence artificielle.
License MIT - LICENSE.txt
*/
// version dsfr basé sur shinygouv
// version 1.15.3 sur intranet
const urlcssdsfr = ["dsfr.min.css","utility/utility.min.css"];
const urljsdsfr = "dsfr.module.min.js";
const urljsdsfr_nomodule = "dsfr.nomodule.min.js";
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
                        <svg
                          aria-hidden="true"
                          class="fr-artwork"
                          viewBox="0 0 80 80"
                          width="80px"
                          height="80px"
                        >
                          <use
                            class="fr-artwork-decorative"
                            href="artwork/pictograms/environment/sun.svg#artwork-decorative"
                          ></use>
                          <use
                            class="fr-artwork-minor"
                            href="artwork/pictograms/environment/sun.svg#artwork-minor"
                          ></use>
                          <use
                            class="fr-artwork-major"
                            href="artwork/pictograms/environment/sun.svg#artwork-major"
                          ></use>
                        </svg>
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
                        <svg
                          aria-hidden="true"
                          class="fr-artwork"
                          viewBox="0 0 80 80"
                          width="80px"
                          height="80px"
                        >
                          <use
                            class="fr-artwork-decorative"
                            href="artwork/pictograms/environment/moon.svg#artwork-decorative"
                          ></use>
                          <use
                            class="fr-artwork-minor"
                            href="artwork/pictograms/environment/moon.svg#artwork-minor"
                          ></use>
                          <use
                            class="fr-artwork-major"
                            href="artwork/pictograms/environment/moon.svg#artwork-major"
                          ></use>
                        </svg>
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
                        <svg
                          aria-hidden="true"
                          class="fr-artwork"
                          viewBox="0 0 80 80"
                          width="80px"
                          height="80px"
                        >
                          <use
                            class="fr-artwork-decorative"
                            href="artwork/pictograms/environment/system.svg#artwork-decorative"
                          ></use>
                          <use
                            class="fr-artwork-minor"
                            href="artwork/pictograms/environment/system.svg#artwork-minor"
                          ></use>
                          <use
                            class="fr-artwork-major"
                            href="artwork/pictograms/environment/system.svg#artwork-major"
                          ></use>
                        </svg>
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









