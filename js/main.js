/**
 * TALMATRIX MAIN CONTROLLER
 * Vanilla JS - Injects shared components, renders data cards, handles animations & form logic.
 */

// Formspree endpoint for inquiries delivered to info@talmatrix.com.
// Replace YOUR_FORM_ID with your Formspree form ID (e.g. https://formspree.io/f/xyz...).
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

document.addEventListener("DOMContentLoaded", () => {
  initSharedComponents();
  renderDynamicData();
  initHeaderScroll();
  initRevealAnimations();
  initContactForm();
});

/**
 * Returns inline SVG markup for icons (1.5px stroke, square caps, thin geometric aesthetic)
 */
function getIconSvg(name, extraClass = "") {
  switch (name) {
    case "globe":
      return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="#F26B1D" stroke-width="1.5"/>
        <line x1="2" y1="12" x2="22" y2="12" stroke="#F26B1D" stroke-width="1.5" stroke-linecap="square"/>
        <path d="M12 2C14.5 5 16 8.5 16 12C16 15.5 14.5 19 12 22C9.5 19 8 15.5 8 12C8 8.5 9.5 5 12 2Z" stroke="#F26B1D" stroke-width="1.5" stroke-linejoin="miter"/>
      </svg>`;

    case "arrow-up-right":
      return `<svg class="btn-arrow ${extraClass}" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
      </svg>`;

    case "diagonal-arrow":
      return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M5 19L19 5M19 5H9M19 5V15" stroke="#F26B1D" stroke-width="1.5" stroke-linecap="square"/>
      </svg>`;

    case "ring-circle":
      return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="#F26B1D" stroke-width="1.5"/>
      </svg>`;

    case "sparkle":
      return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" stroke="#F26B1D" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>
      </svg>`;

    case "concentric-circles":
      return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="#F26B1D" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="3.5" stroke="#F26B1D" stroke-width="1.5"/>
      </svg>`;

    case "diamond":
      return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="12" y="3" width="12.7" height="12.7" transform="rotate(45 12 3)" stroke="#F26B1D" stroke-width="1.5"/>
      </svg>`;

    case "parallelogram":
      return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polygon points="6,19 14,5 20,5 12,19" stroke="#F26B1D" stroke-width="1.5" stroke-linejoin="miter"/>
      </svg>`;

    case "square-in-square":
      return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" stroke="#F26B1D" stroke-width="1.5"/>
        <rect x="9" y="9" width="6" height="6" stroke="#F26B1D" stroke-width="1.5"/>
      </svg>`;

    case "check":
      return `<svg class="${extraClass}" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2.5 8.5L6.5 12.5L13.5 3.5" stroke="#F26B1D" stroke-width="1.5" stroke-linecap="square"/>
      </svg>`;

    case "phone":
      return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" stroke="#F26B1D" stroke-width="1.5"/>
        <line x1="10" y1="18" x2="14" y2="18" stroke="#F26B1D" stroke-width="1.5" stroke-linecap="square"/>
        <line x1="10" y1="5" x2="14" y2="5" stroke="#F26B1D" stroke-width="1.5" stroke-linecap="square"/>
      </svg>`;

    case "envelope":
      return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" stroke="#F26B1D" stroke-width="1.5"/>
        <polyline points="3,6 12,13 21,6" stroke="#F26B1D" stroke-width="1.5" stroke-linecap="square"/>
      </svg>`;

    case "social-linkedin":
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6C1.12 6 0 4.88 0 3.5C0 2.12 1.12 1 2.5 1C3.87 1 4.98 2.12 4.98 3.5ZM0.2 8H4.8V23H0.2V8ZM7.5 8H11.9V10.1H12C12.6 8.9 14.1 7.7 16.5 7.7C21.2 7.7 22.1 10.8 22.1 14.9V23H17.5V15.7C17.5 13.9 17.5 11.7 15.1 11.7C12.6 11.7 12.2 13.6 12.2 15.6V23H7.5V8Z"/>
      </svg>`;

    case "social-facebook":
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24V15.563H7.078V12.073H10.125V9.413C10.125 6.388 11.916 4.708 14.658 4.708C15.97 4.708 17.344 4.944 17.344 4.944V7.913H15.83C14.339 7.913 13.875 8.842 13.875 9.799V12.073H17.203L16.671 15.563H13.875V24C19.612 23.094 24 18.1 24 12.073Z"/>
      </svg>`;

    case "social-instagram":
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C18.055 2.288 18.71 2.49 19.146 2.659C19.723 2.884 20.136 3.152 20.569 3.585C21.002 4.018 21.27 4.431 21.495 5.008C21.664 5.444 21.866 6.099 21.921 7.304C21.979 8.57 21.991 8.95 21.991 12.154C21.991 15.358 21.979 15.738 21.921 17.004C21.866 18.209 21.664 18.864 21.495 19.3C21.27 19.877 21.002 20.29 20.569 20.723C20.136 21.156 19.723 21.424 19.146 21.649C18.71 21.818 18.055 22.02 16.85 22.075C15.584 22.133 15.204 22.145 12 22.145C8.796 22.145 8.416 22.133 7.15 22.075C5.945 22.02 5.29 21.818 4.854 21.649C4.277 21.424 3.864 21.156 3.431 20.723C2.998 20.29 2.73 19.877 2.505 19.3C2.336 18.864 2.134 18.209 2.079 17.004C2.021 15.738 2.009 15.358 2.009 12.154C2.009 8.95 2.021 8.57 2.079 7.304C2.134 6.099 2.336 5.444 2.505 5.008C2.73 4.431 2.998 4.018 3.431 3.585C3.864 3.152 4.277 2.884 4.854 2.659C5.29 2.49 5.945 2.288 7.15 2.233C8.416 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C5.775 0.131 4.903 0.333 4.14 0.63C3.351 0.936 2.682 1.346 2.015 2.013C1.348 2.68 0.938 3.349 0.632 4.138C0.335 4.901 0.133 5.773 0.074 7.051C0.016 8.331 0 8.739 0 11.998C0 15.257 0.016 15.665 0.074 16.945C0.133 18.223 0.335 19.095 0.632 19.858C0.938 20.647 1.348 21.316 2.015 21.983C2.682 22.65 3.351 23.06 4.14 23.366C4.903 23.663 5.775 23.865 7.053 23.924C8.333 23.982 8.741 23.996 12 23.996C15.259 23.996 15.667 23.982 16.947 23.924C18.225 23.865 19.097 23.663 19.86 23.366C20.649 23.06 21.318 22.65 21.985 21.983C22.652 21.316 23.062 20.647 23.368 19.858C23.665 19.095 23.867 18.223 23.926 16.945C23.984 15.665 23.998 15.257 23.998 11.998C23.998 8.739 23.984 8.331 23.926 7.051C23.867 5.773 23.665 4.901 23.368 4.138C23.062 3.349 22.652 2.68 21.985 2.013C21.318 1.346 20.649 0.936 19.86 0.63C19.097 0.333 18.225 0.131 16.947 0.072C15.667 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.162 12 18.162C15.403 18.162 18.162 15.403 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.596C16.965 6.392 17.61 7.037 18.406 7.037C19.202 7.037 19.847 6.392 19.847 5.596C19.847 4.8 19.202 4.155 18.406 4.155Z"/>
      </svg>`;

    case "social-youtube":
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186C23.226 5.166 22.424 4.364 21.404 4.092C19.559 3.597 12 3.597 12 3.597C12 3.597 4.441 3.597 2.596 4.092C1.576 4.364 0.774 5.166 0.502 6.186C0.007 8.031 0 11.895 0 11.895C0 11.895 0.007 15.759 0.502 17.604C0.774 18.624 1.576 19.426 2.596 19.698C4.441 20.193 12 20.193 12 20.193C12 20.193 19.559 20.193 21.404 19.698C22.424 19.426 23.226 18.624 23.498 17.604C23.993 15.759 24 11.895 24 11.895C24 11.895 23.993 8.031 23.498 6.186ZM9.545 15.568V8.222L15.918 11.895L9.545 15.568Z"/>
      </svg>`;

    default:
      return "";
  }
}

/**
 * Returns Logo HTML (navy or white mode)
 * Mark: bold "T" built from slanted bar + stem, with orange square notch at top-right corner.
 */
function getLogoHtml(isWhite = false) {
  const barFill = isWhite ? "#FFFFFF" : "#1B2733";
  const stemFill = isWhite ? "#FFFFFF" : "#1B2733";
  const textClass = isWhite ? "footer-logo__text" : "site-logo__text";
  const wrapperClass = isWhite ? "footer-logo" : "site-logo";

  return `
    <a href="index.html" class="${wrapperClass}" aria-label="TALMATRIX Home">
      <svg class="site-logo__mark" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Slanted top bar -->
        <polygon points="1,5 25,2 25,9 1,12" fill="${barFill}"/>
        <!-- Vertical stem -->
        <rect x="9" y="8" width="9" height="21" fill="${stemFill}"/>
        <!-- Top-right orange notch -->
        <rect x="25" y="2" width="6" height="6" fill="#F26B1D"/>
      </svg>
      <span class="${textClass}">TALMATRI<span class="accent">X</span></span>
    </a>
  `;
}

/**
 * Injects Top Bar, Header, CTA Band, and Footer
 */
function initSharedComponents() {
  const currentPath = window.location.pathname.toLowerCase();
  const isContactPage = currentPath.endsWith("contact.html") || currentPath.endsWith("/contact");

  // 1. TOP BAR
  const topBarEl = document.getElementById("site-top");
  if (topBarEl) {
    topBarEl.innerHTML = `
      <div class="top-bar">
        <div class="container top-bar__inner">
          <span>People. Performance. Progress.</span>
          <a href="mailto:info@talmatrix.com" class="top-bar__email">info@talmatrix.com</a>
        </div>
      </div>
    `;
  }

  // 2. HEADER
  const headerEl = document.getElementById("site-header");
  if (headerEl) {
    headerEl.classList.add("site-header");
    headerEl.innerHTML = `
      <div class="container site-header__inner">
        ${getLogoHtml(false)}
        <nav class="site-nav" aria-label="Primary navigation">
          <a href="about.html" class="nav-link ${isActiveLink("about.html")}">About</a>
          <a href="services.html" class="nav-link ${isActiveLink("services.html")}">Services</a>
          <a href="programs.html" class="nav-link ${isActiveLink("programs.html")}">Programs</a>
          <a href="courses.html" class="nav-link ${isActiveLink("courses.html")}">Courses</a>
        </nav>
        <div class="header-actions">
          <a href="contact.html" class="btn btn-primary">
            Get in Touch
            ${getIconSvg("arrow-up-right")}
          </a>
          <button class="mobile-toggle" aria-expanded="false" aria-label="Toggle navigation menu" id="mobile-toggle-btn">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div class="mobile-drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <nav class="mobile-drawer__links">
          <a href="about.html" class="nav-link ${isActiveLink("about.html")}">About</a>
          <a href="services.html" class="nav-link ${isActiveLink("services.html")}">Services</a>
          <a href="programs.html" class="nav-link ${isActiveLink("programs.html")}">Programs</a>
          <a href="courses.html" class="nav-link ${isActiveLink("courses.html")}">Courses</a>
          <a href="contact.html" class="nav-link ${isActiveLink("contact.html")}">Contact</a>
        </nav>
        <a href="contact.html" class="btn btn-primary" style="width: 100%;">
          Get in Touch
          ${getIconSvg("arrow-up-right")}
        </a>
      </div>
    `;

    initMobileMenu();
  }

  // 3. CTA BAND (#site-cta) - Hidden on contact.html
  const ctaEl = document.getElementById("site-cta");
  if (ctaEl) {
    if (isContactPage) {
      ctaEl.style.display = "none";
    } else {
      ctaEl.innerHTML = `
        <section class="site-cta-band">
          <div class="container site-cta-band__inner">
            <div class="site-cta-band__content">
              <span class="eyebrow">START A CONVERSATION</span>
              <h2 class="site-cta-band__h2">
                <span class="title-navy">Ready to Transform</span>
                <span class="title-orange">Your Talent?</span>
              </h2>
              <p style="margin-top: 14px; max-width: 54ch; font-size: 0.95rem; color: var(--navy); line-height: 1.6;">
                Whether you are looking for talent, HR support, payroll solutions, or meaningful learning and development opportunities, Talmatrix is here to help.
              </p>
              <p style="margin-top: 8px; font-weight: 700; color: var(--navy); font-size: 0.95rem;">
                Let's start a conversation.
              </p>
            </div>
            <a href="contact.html" class="btn btn-primary">
              Contact Us
              ${getIconSvg("arrow-up-right")}
            </a>
          </div>
        </section>
      `;
    }
  }

  // 4. FOOTER
  const footerEl = document.getElementById("site-footer");
  if (footerEl) {
    footerEl.classList.add("site-footer");
    const currentYear = new Date().getFullYear();
    footerEl.innerHTML = `
      <div class="container">
        <div class="site-footer__grid">
          <!-- Col 1: Brand & Value -->
          <div class="footer-brand">
            ${getLogoHtml(true)}
            <div class="footer-tagline">
              <div class="white">Transforming talent.</div>
              <div class="orange">Enabling growth.</div>
            </div>
            <p class="footer-desc">
              A people-focused HR and talent solutions partner for organizations ready to grow.
            </p>
            <div style="margin-top: 10px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--orange); letter-spacing: 0.04em;">
              Talent & HR Solutions | Learning & Development
            </div>
          </div>

          <!-- Col 2: Navigation -->
          <div class="footer-col">
            <div class="footer-col-title">Explore</div>
            <ul class="footer-nav-list">
              <li><a href="about.html">About us</a></li>
              <li><a href="services.html">Our services</a></li>
              <li><a href="programs.html">Programs</a></li>
              <li><a href="courses.html">Courses & Certifications</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>

          <!-- Col 3: Contact & Direct Channels -->
          <div class="footer-col">
            <div class="footer-col-title">Contact</div>
            <ul class="footer-contact-list">
              <li class="footer-contact-row">
                ${getIconSvg("phone")}
                <a href="tel:+923003032268">+92-300-3032268</a>
              </li>
              <li class="footer-contact-row">
                ${getIconSvg("envelope")}
                <a href="mailto:info@talmatrix.com">info@talmatrix.com</a>
              </li>
              <li class="footer-contact-row">
                ${getIconSvg("globe")}
                <a href="https://talmatrix.com" target="_blank" rel="noopener noreferrer">talmatrix.com</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div class="footer-bottom">
          <div>&copy; ${currentYear} Talmatrix. All rights reserved.</div>
          <div class="footer-socials">
            <a href="#" class="footer-social-link" aria-label="LinkedIn">${getIconSvg("social-linkedin")}</a>
            <a href="#" class="footer-social-link" aria-label="Facebook">${getIconSvg("social-facebook")}</a>
            <a href="#" class="footer-social-link" aria-label="Instagram">${getIconSvg("social-instagram")}</a>
            <a href="#" class="footer-social-link" aria-label="YouTube">${getIconSvg("social-youtube")}</a>
          </div>
          <div class="footer-legal">
            <a href="#">Privacy policy</a>
            <a href="#">Terms & conditions</a>
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * Checks if path matches active link
 */
function isActiveLink(filename) {
  const current = window.location.pathname.toLowerCase();
  if (current.endsWith("/" + filename) || (filename === "index.html" && (current.endsWith("/") || current.endsWith("/index.html")))) {
    return "is-active";
  }
  return "";
}

/**
 * Mobile drawer hamburger logic with full accessibility
 */
function initMobileMenu() {
  const btn = document.getElementById("mobile-toggle-btn");
  const drawer = document.getElementById("mobile-drawer");
  if (!btn || !drawer) return;

  function toggleDrawer(open) {
    const isExpanded = open !== undefined ? open : btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", isExpanded.toString());
    drawer.classList.toggle("is-open", isExpanded);
    document.body.style.overflow = isExpanded ? "hidden" : "";
  }

  btn.addEventListener("click", () => toggleDrawer());

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      toggleDrawer(false);
      btn.focus();
    }
  });

  // Close on link click
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleDrawer(false));
  });
}

/**
 * Sticky header bottom hairline after scrolling
 */
function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/**
 * Renders cards and lists from data.js
 */
function renderDynamicData() {
  if (typeof TALMATRIX_DATA === "undefined") return;

  // 1. Home Page: 7 Service Cards
  const servicesContainer = document.getElementById("services-grid");
  if (servicesContainer && TALMATRIX_DATA.services) {
    servicesContainer.innerHTML = TALMATRIX_DATA.services
      .map(
        (s) => `
        <a href="${s.link}" class="service-card reveal">
          <div class="service-card__top">
            <span class="service-card__index font-mono">${s.index}</span>
            <div class="service-card__icon">
              ${getIconSvg(s.icon)}
            </div>
          </div>
          <div class="service-card__body">
            <h3 class="service-card__title">${s.title}</h3>
            <p class="service-card__desc">${s.description}</p>
          </div>
          <span class="service-card__cta">
            Explore ↗
          </span>
        </a>
      `
      )
      .join("");
  }

  // 2. Program Cards (Shared in Home, Programs, Courses)
  const programContainers = document.querySelectorAll("[data-program-cards]");
  if (programContainers.length > 0 && TALMATRIX_DATA.programs) {
    const cardsHtml = TALMATRIX_DATA.programs
      .map(
        (p) => `
        <article class="program-card reveal">
          <div>
            <div class="program-card__top">
              <span class="program-card__type">${p.type}</span>
              <span class="program-card__index">${p.index}</span>
            </div>
            <h3 class="program-card__title">${p.title}</h3>
            <div class="program-card__meta">
              <span>${p.date}</span><span class="sep">/</span>
              <span>${p.duration}</span><span class="sep">/</span>
              <span>${p.mode}</span>
            </div>
          </div>
          <div>
            <div class="program-card__divider"></div>
            <div class="program-card__bottom">
              <span class="program-card__seats">${p.seats}</span>
              <a href="contact.html?program=${p.slug}" class="program-card__link">
                Register ↗
              </a>
            </div>
          </div>
        </article>
      `
      )
      .join("");

    programContainers.forEach((container) => {
      container.innerHTML = cardsHtml;
    });
  }

  // 3. Home Page: Why Talmatrix 4 Rows
  const whyHomeContainer = document.getElementById("why-home-list");
  if (whyHomeContainer && TALMATRIX_DATA.whyHome) {
    whyHomeContainer.innerHTML = TALMATRIX_DATA.whyHome
      .map(
        (w) => `
        <div class="why-row reveal">
          <div class="why-row__left">
            <span class="why-row__num font-mono">${w.index}</span>
            <span class="why-row__text">${w.text}</span>
          </div>
          <div class="why-row__icon">
            ${getIconSvg("check")}
          </div>
        </div>
      `
      )
      .join("");
  }

  // 4. About Page: Why Talmatrix 6 Detailed Rows
  const whyAboutContainer = document.getElementById("why-about-list");
  if (whyAboutContainer && TALMATRIX_DATA.whyAbout) {
    whyAboutContainer.innerHTML = TALMATRIX_DATA.whyAbout
      .map(
        (w) => `
        <div class="why-row why-row--detailed reveal">
          <div class="why-row__left" style="align-items: flex-start;">
            <span class="why-row__num font-mono" style="margin-top: 4px;">${w.index}</span>
            <div class="why-row__content">
              <div class="why-row__title">${w.title}</div>
              <p class="why-row__desc">${w.description}</p>
            </div>
          </div>
          <div class="why-row__icon" style="margin-top: 6px;">
            ${getIconSvg("check")}
          </div>
        </div>
      `
      )
      .join("");
  }

  // 5. Courses Page: 4 "Designed For" audience cards
  const coursesAudienceContainer = document.getElementById("courses-audience-grid");
  if (coursesAudienceContainer && TALMATRIX_DATA.coursesAudiences) {
    coursesAudienceContainer.innerHTML = TALMATRIX_DATA.coursesAudiences
      .map(
        (a) => `
        <div class="service-card reveal">
          <div class="service-card__top">
            <span class="service-card__index font-mono">${a.index}</span>
            <div class="service-card__icon">
              ${getIconSvg(a.icon)}
            </div>
          </div>
          <div class="service-card__body">
            <h3 class="service-card__title">${a.title}</h3>
            <p class="service-card__desc">${a.description}</p>
          </div>
        </div>
      `
      )
      .join("");
  }
}

/**
 * Reveal-on-scroll animations using IntersectionObserver with 70ms stagger in grids
 */
function initRevealAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  // Apply stagger delay to grid children
  const grids = document.querySelectorAll(".services-grid, .programs-grid, .vision-mission-grid, .why-grid__right");
  grids.forEach((grid) => {
    const children = grid.querySelectorAll(".reveal");
    children.forEach((child, idx) => {
      child.style.transitionDelay = `${idx * 70}ms`;
    });
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/**
 * Contact Page Form Logic: Select population, URL param parsing, validation, submission stub
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const serviceSelect = document.getElementById("form-service");
  const messageInput = document.getElementById("form-message");
  const nameInput = document.getElementById("form-name");
  const emailInput = document.getElementById("form-email");
  const orgInput = document.getElementById("form-organization");
  const phoneInput = document.getElementById("form-phone");
  const submitBtn = document.getElementById("form-submit-btn");

  const gotchaInput = document.getElementById("form-gotcha");
  const submissionErrorEl = document.getElementById("form-submission-error");

  // Populate Service Select
  if (serviceSelect && typeof TALMATRIX_DATA !== "undefined") {
    serviceSelect.innerHTML = `<option value="" disabled selected>Select a service</option>` +
      TALMATRIX_DATA.serviceSelectOptions
        .map((opt) => `<option value="${opt}">${opt}</option>`)
        .join("");
  }

  // Parse URL parameter: ?program=<slug>
  const urlParams = new URLSearchParams(window.location.search);
  const programSlug = urlParams.get("program");

  if (programSlug && typeof TALMATRIX_DATA !== "undefined") {
    if (serviceSelect) {
      serviceSelect.value = "Open Enrollment Programs";
    }
    const matchedProgram = TALMATRIX_DATA.programs.find((p) => p.slug === programSlug);
    const programTitle = matchedProgram ? matchedProgram.title : programSlug;
    if (messageInput) {
      messageInput.value = `I would like to register or inquire about the "${programTitle}" program.`;
    }
  }

  // Real-time error removal on input
  [nameInput, emailInput, messageInput, orgInput, phoneInput, serviceSelect].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => {
      input.closest(".form-group")?.classList.remove("has-error");
      if (submissionErrorEl) {
        submissionErrorEl.style.display = "none";
        submissionErrorEl.innerHTML = "";
      }
    });
  });

  // Handle Form Submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.closest(".form-group")?.classList.add("has-error");
      isValid = false;
    } else {
      nameInput.closest(".form-group")?.classList.remove("has-error");
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.closest(".form-group")?.classList.add("has-error");
      isValid = false;
    } else {
      emailInput.closest(".form-group")?.classList.remove("has-error");
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.closest(".form-group")?.classList.add("has-error");
      isValid = false;
    } else {
      messageInput.closest(".form-group")?.classList.remove("has-error");
    }

    if (!isValid) return;

    // Honeypot spam check
    if (gotchaInput && gotchaInput.value.trim() !== "") {
      showFormSuccess(form);
      return;
    }

    // Build Payload
    const payload = {
      name: nameInput.value.trim(),
      organization: orgInput ? orgInput.value.trim() : "",
      email: emailInput.value.trim(),
      phone: phoneInput ? phoneInput.value.trim() : "",
      service: serviceSelect ? serviceSelect.value : "",
      message: messageInput.value.trim(),
      _gotcha: gotchaInput ? gotchaInput.value : ""
    };

    // Disable button during submission
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending inquiry...`;
    }
    if (submissionErrorEl) {
      submissionErrorEl.style.display = "none";
      submissionErrorEl.innerHTML = "";
    }

    try {
      const response = await submitForm(payload);
      if (response && response.ok) {
        showFormSuccess(form);
      } else {
        throw new Error("Form submission response not ok");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Submit inquiry <svg class="btn-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>`;
      }
      if (submissionErrorEl) {
        submissionErrorEl.style.display = "block";
        submissionErrorEl.innerHTML = `Unable to submit inquiry at this moment. Please try again or email us directly at <a href="mailto:info@talmatrix.com" style="color:var(--navy);font-weight:700;text-decoration:underline;">info@talmatrix.com</a>.`;
      }
    }
  });
}

/**
 * Real delivery to info@talmatrix.com using Formspree
 * (fetch POST to FORM_ENDPOINT with Accept: application/json)
 */
async function submitForm(payload) {
  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return response;
}

/**
 * Replaces form container with success message
 */
function showFormSuccess(form) {
  const panel = form.closest(".form-panel");
  if (!panel) return;

  panel.innerHTML = `
    <div class="form-success-message">
      <div class="form-success-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12.5L9.5 18L20 6" stroke="#F26B1D" stroke-width="2.5" stroke-linecap="square"/>
        </svg>
      </div>
      <h3 class="form-success-title">Thank you.</h3>
      <p class="form-success-desc">
        We'll be in touch shortly to explore how Talmatrix can support your organization's talent and growth objectives.
      </p>
    </div>
  `;
}
