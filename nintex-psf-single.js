/*!
 * Nintex PSF K2 Single File Theme
 * Adapted from lowcodelegend/PSFUX-Square for modern Nintex styling.
 * Reference this one JavaScript file from the K2 style profile/header view.
 */
(function (window, document) {
  "use strict";

  var CONFIG = {
    logoCellName: "LogoCell",
    kpiViewName: "KPIs",
    requestListViewName: "Requests",
    headerViewName: "Header",
    footerViewName: "Footer",
    searchControlName: "Auto-Complete",
    actionButtons: {
      new: "btnNavNew",
      reports: "btnNavReporting",
      admin: "btnNavAdmin"
    }
  };

  var state = {
    initialized: false,
    mobileHeaderBound: false,
    footerResizeBound: false,
    footerTabBound: false,
    waveAnimationStarted: false
  };

  var css = String.raw`
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");

.theme-entry.psf,
body.theme-entry .psf,
.theme-entry.psf .form,
.theme-entry.psf #pgInnerPanel,
.theme-entry.psf .form-tabs > .tab-box-body,
.theme-entry.psf #pgTabContent,
.theme-entry.psf .view .innerpanel > .grid,
.theme-entry.psf .view .innerpanel > .panel,
.theme-entry.psf .view-canvas > .grid,
.theme-entry.psf .view-canvas > .panel {
  --ntx-black: #0e0e0e;
  --ntx-white: #ffffff;
  --ntx-ivory: #fff9f4;
  --ntx-orange: #ff6d00;
  --ntx-light-orange: #ff9f7b;
  --ntx-pale-orange: #fee9e3;
  --ntx-pink: #ed2891;
  --ntx-magenta: #be0075;
  --ntx-navy: #030a47;
  --ntx-deep-navy: #000426;
  --ntx-blue: #2a348a;
  --ntx-purple: #8439a6;
  --ntx-deep-purple: #3d0456;
  --ntx-line: rgba(14, 14, 14, 0.22);
  --ntx-soft-line: rgba(14, 14, 14, 0.1);
  --ntx-sidebar-width: 300px;
  --ntx-sidebar-padding: 30px;
  --ntx-shadow: 0 8px 24px rgba(0, 4, 38, 0.09);

  --main-font-family: "Plus Jakarta Sans", Arial, sans-serif;
  --heading-font-family: "Plus Jakarta Sans", Arial, sans-serif;
  --button-font-family: "Plus Jakarta Sans", Arial, sans-serif;
  --normal-text-color: #1d1d1f;
  --description-text-color: rgba(14, 14, 14, 0.74);
  --paragraph-text-color: rgba(14, 14, 14, 0.84);
  --form-background-color: var(--ntx-white);
  --page-background-color: var(--ntx-white);
  --view-background-color: var(--ntx-white);
  --page-title-text-color: #4a4a4a;
  --page-subtitle-text-color: #8b8f98;
  --heading1-text-color: var(--ntx-deep-navy);
  --heading2-text-color: var(--ntx-deep-navy);
  --heading3-text-color: var(--ntx-deep-navy);
  --view-header-text-color: #4a4a4a;
  --view-header-background-color: transparent;
  --page-title-text-size: 3.3rem;
  --page-subtitle-text-size: 2.1rem;
  --heading1-text-size: 3.1rem;
  --heading2-text-size: 2.25rem;
  --heading3-text-size: 1.75rem;
  --heading4-text-size: 1.45rem;
  --view-header-text-size: 1.35rem;
  --main-text-size: 1.35rem;
  --input-label-text-size: 1.15rem;
  --input-background-color: var(--ntx-white);
  --input-border-color: rgba(14, 14, 14, 0.34);
  --input-focus-border-color: var(--ntx-magenta);
  --input-text-color: #242424;
  --input-watermark-text-color: rgba(14, 14, 14, 0.36);
  --input-rounding: 0;
  --button-rounding: 3px;
  --primary-button-background-color: #b8b8b8;
  --primary-button-border-color: #b8b8b8;
  --primary-button-text-color: var(--ntx-black);
  --primary-button-hover-background-color: var(--ntx-magenta);
  --primary-button-hover-border-color: var(--ntx-magenta);
  --primary-button-hover-text-color: var(--ntx-white);
  --button-background-color: #b8b8b8;
  --button-border-color: #b8b8b8;
  --button-text-color: var(--ntx-black);
  --button-hover-background-color: var(--ntx-magenta);
  --button-hover-border-color: var(--ntx-magenta);
  --button-hover-text-color: var(--ntx-white);
  --list-column-header-background-color: #f7f7f7;
  --list-column-header-text-color: var(--ntx-deep-navy);
  --list-item-background-color: var(--ntx-white);
  --list-item-background-color-odd-zebra: var(--ntx-white);
  --list-item-background-color-even-zebra: #fbfbfb;
  --list-item-hover-background-color: var(--ntx-pale-orange);
  --list-item-selected-background-color: #f7e5f1;
  --list-item-selected-text-color: var(--ntx-deep-navy);
  --list-item-selected-border-color: var(--ntx-magenta);
}

html,
body {
  background: var(--ntx-white, #ffffff) !important;
  overscroll-behavior: none;
}

.theme-entry.psf,
.theme-entry.psf * {
  box-sizing: border-box;
}

.theme-entry.psf,
.theme-entry.psf input,
.theme-entry.psf textarea,
.theme-entry.psf select,
.theme-entry.psf button {
  font-family: var(--main-font-family) !important;
}

.theme-entry.psf .runtime-content {
  background: var(--ntx-white) !important;
  color: var(--normal-text-color);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
}

.theme-entry.psf .runtime-content::before,
.theme-entry.psf .runtime-content::after {
  background-repeat: repeat-x;
  background-size: contain;
  content: "";
  display: none;
  height: 170px;
  left: 0;
  opacity: 0.34;
  pointer-events: none;
  position: fixed;
  width: 260%;
  z-index: 0;
}

.theme-entry.psf .runtime-content::before {
  animation: ntx-wave 70s linear infinite;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 5392 393' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.09229 380.193C256.031 398.471 485.518 390.369 880.247 185.382C1106.65 67.8087 1461.65 -152.288 2122.03 187.076C2244.01 249.758 2521.84 361.57 2696.34 380.205M2696 380.193C2950.94 398.471 3180.43 390.369 3575.15 185.382C3801.56 67.8087 4156.56 -152.288 4816.94 187.076C4938.92 249.758 5216.75 361.57 5391.24 380.205' stroke='url(%23grad)' stroke-width='4' stroke-miterlimit='10' fill='none'/%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23FF6D00'/%3E%3Cstop offset='50%25' stop-color='%23ED2891'/%3E%3Cstop offset='100%25' stop-color='%238439A6'/%3E%3C/linearGradient%3E%3C/svg%3E");
  top: 4%;
}

.theme-entry.psf .runtime-content::after {
  animation: ntx-wave-reverse 85s linear infinite;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 5392 393' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.09229 380.193C256.031 398.471 485.518 390.369 880.247 185.382C1106.65 67.8087 1461.65 -152.288 2122.03 187.076C2244.01 249.758 2521.84 361.57 2696.34 380.205M2696 380.193C2950.94 398.471 3180.43 390.369 3575.15 185.382C3801.56 67.8087 4156.56 -152.288 4816.94 187.076C4938.92 249.758 5216.75 361.57 5391.24 380.205' stroke='url(%23grad2)' stroke-width='4' stroke-miterlimit='10' fill='none'/%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%232A348A'/%3E%3Cstop offset='100%25' stop-color='%238439A6'/%3E%3C/linearGradient%3E%3C/svg%3E");
  bottom: 3%;
  left: -35%;
  opacity: 0.24;
}

.theme-entry.psf .runtime-content > * {
  position: relative;
  z-index: 1;
}

.theme-entry.psf .ntx-wave-layer {
  background-repeat: repeat-x;
  background-size: auto 100%;
  height: 170px;
  left: 0;
  opacity: 0.28;
  pointer-events: none;
  position: fixed;
  width: 320%;
  will-change: transform;
  z-index: 0;
}

.theme-entry.psf .ntx-wave-layer--top {
  animation: ntx-bg-wave 36s linear infinite;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 5392 393' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.09229 380.193C256.031 398.471 485.518 390.369 880.247 185.382C1106.65 67.8087 1461.65 -152.288 2122.03 187.076C2244.01 249.758 2521.84 361.57 2696.34 380.205M2696 380.193C2950.94 398.471 3180.43 390.369 3575.15 185.382C3801.56 67.8087 4156.56 -152.288 4816.94 187.076C4938.92 249.758 5216.75 361.57 5391.24 380.205' stroke='url(%23grad)' stroke-width='4' stroke-miterlimit='10' fill='none'/%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23FF6D00'/%3E%3Cstop offset='50%25' stop-color='%23ED2891'/%3E%3Cstop offset='100%25' stop-color='%238439A6'/%3E%3C/linearGradient%3E%3C/svg%3E");
  top: 1.5%;
}

.theme-entry.psf .ntx-wave-layer--top-secondary {
  animation: ntx-bg-wave-secondary 52s linear infinite;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 5392 393' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.09229 380.193C256.031 398.471 485.518 390.369 880.247 185.382C1106.65 67.8087 1461.65 -152.288 2122.03 187.076C2244.01 249.758 2521.84 361.57 2696.34 380.205M2696 380.193C2950.94 398.471 3180.43 390.369 3575.15 185.382C3801.56 67.8087 4156.56 -152.288 4816.94 187.076C4938.92 249.758 5216.75 361.57 5391.24 380.205' stroke='url(%23grad3)' stroke-width='4' stroke-miterlimit='10' fill='none'/%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%232A348A'/%3E%3Cstop offset='52%25' stop-color='%238439A6'/%3E%3Cstop offset='100%25' stop-color='%23ED2891'/%3E%3C/linearGradient%3E%3C/svg%3E");
  opacity: 0.22;
  top: 4.5%;
}

.theme-entry.psf .ntx-wave-layer--bottom {
  animation: ntx-bg-wave-reverse 48s linear infinite;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 5392 393' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.09229 380.193C256.031 398.471 485.518 390.369 880.247 185.382C1106.65 67.8087 1461.65 -152.288 2122.03 187.076C2244.01 249.758 2521.84 361.57 2696.34 380.205M2696 380.193C2950.94 398.471 3180.43 390.369 3575.15 185.382C3801.56 67.8087 4156.56 -152.288 4816.94 187.076C4938.92 249.758 5216.75 361.57 5391.24 380.205' stroke='url(%23grad2)' stroke-width='4' stroke-miterlimit='10' fill='none'/%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%232A348A'/%3E%3Cstop offset='100%25' stop-color='%238439A6'/%3E%3C/linearGradient%3E%3C/svg%3E");
  bottom: 3%;
  left: -35%;
  opacity: 0.24;
}

@keyframes ntx-wave {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes ntx-wave-reverse {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

@keyframes ntx-bg-wave {
  from { background-position: 0 0; }
  to { background-position: -1200px 0; }
}

@keyframes ntx-bg-wave-reverse {
  from { background-position: -1200px 0; }
  to { background-position: 0 0; }
}

@keyframes ntx-bg-wave-secondary {
  from { background-position: -420px 0; }
  to { background-position: -1620px 0; }
}

@media (prefers-reduced-motion: reduce) {
  .theme-entry.psf .runtime-content::before,
  .theme-entry.psf .runtime-content::after {
    animation: none;
  }
}

.theme-entry.psf .runtime-content.with-sidebar {
  justify-content: start;
  margin-left: var(--ntx-sidebar-width) !important;
}

.theme-entry.psf .psf-sidebar {
  background:
    linear-gradient(180deg, rgba(3, 10, 71, 0.98) 0%, rgba(3, 10, 71, 0.96) 34%, rgba(61, 4, 86, 0.98) 100%),
    var(--ntx-deep-navy);
  color: var(--ntx-white);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 140px auto;
  height: 100vh;
  left: 0;
  overflow-y: auto;
  padding: 28px 30px 40px;
  position: fixed;
  top: 0;
  width: var(--ntx-sidebar-width);
  z-index: 10000;
}

.theme-entry.psf .psf-sidebar-logo {
  align-items: flex-start;
  display: flex;
  grid-row: 1;
  justify-content: center;
}

.theme-entry.psf .psf-sidebar-logo img {
  background: var(--ntx-white);
  border-radius: 8px;
  display: block !important;
  max-height: 108px;
  max-width: 132px;
  padding: 16px;
}

.theme-entry.psf .psf-sidebar-tabs {
  grid-row: 2;
}

.theme-entry.psf .psf-sidebar .tab-box-tabs {
  border: 0 !important;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 !important;
  padding: 0 !important;
}

.theme-entry.psf .psf-sidebar .tab-box-tabs > li {
  display: block !important;
  margin: 0 !important;
  width: 100%;
}

.theme-entry.psf .psf-sidebar .tab-box-tabs > li > a.tab {
  align-items: center;
  background: transparent !important;
  border: 0 !important;
  border-radius: 8px;
  color: var(--ntx-white) !important;
  display: flex;
  font-size: 1.5rem;
  font-weight: 650;
  line-height: 1.15;
  min-height: 58px;
  overflow: hidden;
  padding: 0 24px !important;
  position: relative;
  text-decoration: none;
  width: 100%;
}

.theme-entry.psf .psf-sidebar .tab-box-tabs > li > a.tab:hover,
.theme-entry.psf .psf-sidebar .tab-box-tabs > li > a.tab.selected {
  background: var(--ntx-white) !important;
  color: var(--ntx-deep-navy) !important;
}

.theme-entry.psf .psf-sidebar .tab-box-tabs > li > a.tab.selected::after {
  background: linear-gradient(180deg, var(--ntx-orange), var(--ntx-magenta));
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 4px;
}

.theme-entry.psf .psf-sidebar .tab-wrapper {
  align-items: center;
  border: 0 !important;
  display: flex !important;
  gap: 12px;
  width: 100%;
}

.theme-entry.psf .psf-sidebar .tab-wrapper::before {
  border: 2px solid currentColor;
  border-radius: 50%;
  content: "";
  flex: 0 0 auto;
  height: 18px;
  width: 18px;
}

.theme-entry.psf .psf-sidebar .tab-box-tabs > li > a.tab.selected .tab-wrapper::before {
  background: radial-gradient(circle at center, var(--ntx-orange) 0 4px, transparent 4.5px);
  border-color: currentColor;
}

.theme-entry.psf .psf-sidebar .tab-box-tabs > li:nth-child(2) > a.tab.selected .tab-wrapper::before {
  background: radial-gradient(circle at center, var(--ntx-purple) 0 4px, transparent 4.5px);
}

.theme-entry.psf .psf-sidebar .tab-box-tabs > li:nth-child(3) > a.tab.selected .tab-wrapper::before {
  background: radial-gradient(circle at center, var(--ntx-blue) 0 4px, transparent 4.5px);
}

.theme-entry.psf .psf-sidebar .tab-text {
  min-width: 0 !important;
}

.theme-entry.psf .psf-sidebar-toggle {
  align-items: center;
  background: var(--ntx-white);
  border: 1px solid var(--ntx-soft-line);
  box-shadow: var(--ntx-shadow);
  color: var(--ntx-deep-navy);
  cursor: pointer;
  display: none;
  height: 48px;
  justify-content: center;
  left: 14px;
  position: fixed;
  top: 14px;
  width: 48px;
  z-index: 10002;
}

.theme-entry.psf .psf-sidebar-toggle::before {
  content: "menu";
  font-family: "Material Symbols Outlined";
  font-size: 28px;
  font-variation-settings: "FILL" 0, "wght" 600, "GRAD" 0, "opsz" 24;
}

.theme-entry.psf.psf-sidebar-open .psf-sidebar-toggle::before {
  content: "close";
}

.theme-entry.psf .header {
  background: transparent !important;
  margin-bottom: 4px;
  margin-top: 0;
}

.theme-entry.psf .header * {
  background-color: transparent !important;
}

.theme-entry.psf .header span[name="LogoCell"],
.theme-entry.psf .header .psf-header-logo-source {
  display: none !important;
}

.theme-entry.psf .header .panel-body-wrapper {
  background: transparent !important;
  box-shadow: none !important;
  color: var(--normal-text-color);
  padding: 8px 10px 6px !important;
}

.theme-entry.psf .header h1 {
  color: #4a4a4a;
  font-size: var(--page-title-text-size);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.12;
  margin: 0;
}

.theme-entry.psf .header h2 {
  color: #8b8f98;
  font-size: var(--page-subtitle-text-size);
  font-weight: 400;
  line-height: 1.12;
  margin: 0;
  transform: translateY(-22px);
}

.theme-entry.psf .header .description,
.theme-entry.psf .header p {
  color: var(--ntx-deep-navy) !important;
  font-size: 0.9rem !important;
  font-weight: 500;
}

.theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] {
  grid-template-columns: 1fr 220px !important;
  overflow: visible !important;
}

.theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] > span[col="1"][row="1"] > div {
  grid-template-columns: 0 1fr !important;
  overflow: visible !important;
  width: 100%;
}

.theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] .editor-cell {
  overflow: visible !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] > span[col="1"][row="1"] > div > span[col="2"][row="1"] > div > span {
  justify-content: left !important;
}

.theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] > span[col="1"][row="1"] > div > span[col="2"][row="1"] {
  position: relative !important;
  top: -28px;
}

.theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] > span[col="1"][row="1"] > div > span[col="2"][row="1"] > div {
  align-content: start !important;
  overflow: visible !important;
}

.theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] > span[col="2"][row="1"] {
  position: relative !important;
  top: -16px;
}

.theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] > span[col="2"][row="1"] > div {
  align-content: start !important;
  justify-items: start !important;
}

.theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] > span[col="2"][row="1"] p,
.theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] > span[col="2"][row="1"] span.SFC {
  color: rgba(0, 4, 38, 0.82) !important;
  font-size: 0.95rem !important;
  font-weight: 500 !important;
  line-height: 1.35 !important;
}

.theme-entry.psf .panel-header-wrapper,
.theme-entry.psf .grid-header-wrapper {
  background: transparent !important;
  border: 0 !important;
}

.theme-entry.psf .panel-header-wrapper > div.panel-header-text,
.theme-entry.psf .grid-header-wrapper > div.grid-header-text {
  color: var(--view-header-text-color);
  font-size: var(--view-header-text-size);
  font-weight: 700;
  height: 100%;
}

.theme-entry.psf .view.footer {
  margin-top: auto !important;
  padding-top: 28px;
}

.theme-entry.psf .view.footer.psf-footer-push {
  margin-top: var(--psf-footer-push, 0px) !important;
}

.theme-entry.psf .view.footer,
.theme-entry.psf .view.footer .panel,
.theme-entry.psf .view.footer .panel-body-wrapper,
.theme-entry.psf .view.footer .panel-body-m-c {
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}

.theme-entry.psf .view.footer .panel-body-wrapper {
  color: rgba(0, 4, 38, 0.82);
  font-size: 1rem;
  padding: 0 10px 20px !important;
}

.theme-entry.psf .view.footer .SFC.SourceCode-Forms-Controls-Web-Label {
  color: inherit !important;
  font-size: inherit !important;
  font-weight: 500;
  line-height: 1.35;
}

.theme-entry.psf .view,
.theme-entry.psf .grid,
.theme-entry.psf .panel,
.theme-entry.psf .view-canvas > .grid,
.theme-entry.psf .view-canvas > .panel {
  border-color: transparent !important;
  box-shadow: none !important;
}

.theme-entry.psf .panel-body-wrapper,
.theme-entry.psf .grid-body {
  background: var(--ntx-white) !important;
}

.theme-entry.psf .SFC.SourceCode-Forms-Controls-Web-TextBox.watermark,
.theme-entry.psf .input-control-watermark {
  color: rgba(14, 14, 14, 0.36) !important;
  font-size: var(--main-text-size);
}

.theme-entry.psf label.SFC.SourceCode-Forms-Controls-Web-Label.input-label,
.theme-entry.psf input.SFC.SourceCode-Forms-Controls-Web-TextBox.SFE {
  padding: 0.8rem 1rem !important;
}

.theme-entry.psf .input-control.text-input:not(.control-group-container) .input-control-m-c {
  background: transparent !important;
  border: 0 !important;
  border-bottom: 1px solid var(--input-border-color) !important;
  box-shadow: none !important;
  padding: 0.4rem 0.6rem;
}

.theme-entry.psf div.picker,
.theme-entry.psf div.picker div.input-control-m-c,
.theme-entry.psf div.input-control.lookup-box,
.theme-entry.psf div.input-control.select-box {
  min-height: 40px !important;
}

.theme-entry.psf .input-control.text-input.control-group-container div.input-control-m-c {
  border: 1px solid var(--input-border-color) !important;
  box-shadow: none !important;
}

.theme-entry.psf .calendar-control.datepicker > .styling-outer-wrapper,
.theme-entry.psf .dropdown-box > .styling-outer-wrapper {
  border-bottom: 1px solid var(--input-border-color) !important;
}

.theme-entry.psf .calendar-control.datepicker .input-control-body,
.theme-entry.psf .calendar-control.datepicker .input-control-buttons,
.theme-entry.psf .dropdown-box .input-control-body,
.theme-entry.psf .dropdown-box .input-control-buttons {
  border-bottom: 0 !important;
}

.theme-entry.psf .calendar-control.datepicker .input-control-b,
.theme-entry.psf .calendar-control.datepicker .input-control-b-l,
.theme-entry.psf .calendar-control.datepicker .input-control-b-c,
.theme-entry.psf .calendar-control.datepicker .input-control-b-r,
.theme-entry.psf .dropdown-box .input-control-b,
.theme-entry.psf .dropdown-box .input-control-b-l,
.theme-entry.psf .dropdown-box .input-control-b-c,
.theme-entry.psf .dropdown-box .input-control-b-r {
  border: 0 !important;
  height: 0 !important;
  min-height: 0 !important;
}

.theme-entry.psf .calendar-control.datepicker > .styling-outer-wrapper > .input-control-buttons,
.theme-entry.psf .dropdown-box > .styling-outer-wrapper > .input-control-buttons {
  vertical-align: middle !important;
}

.theme-entry.psf .calendar-control.datepicker .calender-control-button svg,
.theme-entry.psf .calendar-control.datepicker .svg-icon-calendar-date {
  height: 28px !important;
  width: 28px !important;
}

.theme-entry.psf .SFC.SourceCode-Forms-Controls-Web-TextBox.readonly,
.theme-entry.psf input[type="text"].input-control.readonly,
.theme-entry.psf input[type="password"].input-control.readonly,
.theme-entry.psf .readonly {
  background-color: transparent !important;
  border: 0 !important;
}

.theme-entry.psf div.search-control .input-control.text-input .input-control-m-c {
  align-items: center;
  display: flex;
}

.theme-entry.psf div.search-control .input-control.text-input .input-control-m-c > .input-control-wrapper {
  width: calc(100% - 42px);
}

.theme-entry.psf div.search-control .input-control.text-input .input-control-m-c::after,
.theme-entry.psf div.kpi div.card .kpi-icon::after,
.theme-entry.psf .toolbar-button .button-icon::after {
  font-family: "Material Symbols Outlined";
  font-variation-settings: "FILL" 0, "wght" 500, "GRAD" 0, "opsz" 24;
  line-height: 1;
}

.theme-entry.psf div.search-control .input-control.text-input .input-control-m-c::after {
  border-left: 1px solid var(--input-border-color);
  color: var(--ntx-magenta);
  content: "search";
  display: grid;
  font-size: 24px;
  height: 28px;
  margin-left: 10px;
  place-items: center;
  width: 32px;
}

.theme-entry.psf .button,
.theme-entry.psf a.SourceCode-Forms-Controls-Web-Button,
.theme-entry.psf input[type="button"],
.theme-entry.psf button {
  border-radius: 3px !important;
  font-size: 1rem !important;
  font-weight: 700 !important;
}

.theme-entry.psf a.SFC.SourceCode-Forms-Controls-Web-Button,
.theme-entry.psf a.SourceCode-Forms-Controls-Web-Button:not(.toolbar-button),
.theme-entry.psf input[type="button"].SourceCode-Forms-Controls-Web-Button,
.theme-entry.psf input[type="submit"].SourceCode-Forms-Controls-Web-Button {
  align-items: center !important;
  background: linear-gradient(90deg, var(--ntx-navy) 0%, #452073 52%, var(--ntx-purple) 100%) !important;
  border: 0 !important;
  border-radius: 8px !important;
  box-shadow: 0 3px 8px rgba(0, 4, 38, 0.13);
  color: var(--ntx-white) !important;
  display: inline-flex !important;
  font-family: var(--button-font-family) !important;
  font-size: 1.12rem !important;
  font-weight: 700 !important;
  justify-content: center !important;
  line-height: 1.1 !important;
  min-height: 40px;
  min-width: 112px;
  padding: 0.75rem 1.35rem !important;
  text-decoration: none !important;
  transition: box-shadow 160ms ease, filter 160ms ease, transform 160ms ease;
}

.theme-entry.psf a.SFC.SourceCode-Forms-Controls-Web-Button:hover,
.theme-entry.psf a.SourceCode-Forms-Controls-Web-Button:not(.toolbar-button):hover,
.theme-entry.psf input[type="button"].SourceCode-Forms-Controls-Web-Button:hover,
.theme-entry.psf input[type="submit"].SourceCode-Forms-Controls-Web-Button:hover {
  box-shadow: 0 5px 10px rgba(0, 4, 38, 0.16);
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.theme-entry.psf a.SFC.SourceCode-Forms-Controls-Web-Button:focus,
.theme-entry.psf a.SourceCode-Forms-Controls-Web-Button:not(.toolbar-button):focus,
.theme-entry.psf input[type="button"].SourceCode-Forms-Controls-Web-Button:focus,
.theme-entry.psf input[type="submit"].SourceCode-Forms-Controls-Web-Button:focus {
  box-shadow: 0 0 0 3px rgba(237, 40, 145, 0.2), 0 8px 18px rgba(0, 4, 38, 0.16);
  outline: 0 !important;
}

.theme-entry.psf a.SFC.SourceCode-Forms-Controls-Web-Button.disabled,
.theme-entry.psf a.SourceCode-Forms-Controls-Web-Button:not(.toolbar-button).disabled,
.theme-entry.psf input[type="button"].SourceCode-Forms-Controls-Web-Button:disabled,
.theme-entry.psf input[type="submit"].SourceCode-Forms-Controls-Web-Button:disabled {
  cursor: default !important;
  filter: grayscale(0.35);
  opacity: 0.55;
}

.theme-entry.psf .toolbar-wrapper {
  padding-bottom: 1.2rem;
  padding-top: 0.8rem;
}

.theme-entry.psf .toolbar-button {
  border-right: 1px solid var(--ntx-line);
  margin-left: 1rem !important;
}

.theme-entry.psf .toolbar-button:last-child {
  border-right: 0 !important;
}

.theme-entry.psf .toolbar-button .button-icon {
  background-image: none !important;
}

.theme-entry.psf .toolbar-button .button-icon::after {
  color: var(--ntx-magenta);
  font-size: 2rem;
}

.theme-entry.psf .toolbar-button.exceldocument .button-icon::after { content: "newspaper"; color: #0f8f21; }
.theme-entry.psf .toolbar-button.filter .button-icon::after { content: "filter_alt"; }
.theme-entry.psf .toolbar-button.refresh .button-icon::after { content: "refresh"; }

.theme-entry.psf .grid-column-headers {
  background: #f7f7f7 !important;
  border-bottom: 1px solid var(--ntx-line) !important;
  padding: 0 !important;
}

.theme-entry.psf .grid-body table.grid-content-table {
  border-collapse: collapse;
}

.theme-entry.psf .grid-body table.grid-content-table > tbody > tr {
  border-bottom: 1px solid var(--ntx-line);
}

.theme-entry.psf .grid-body table.grid-content-table > tbody > tr > td {
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.theme-entry.psf .grid-body table.grid-content-table > tbody > tr > td:first-child {
  padding-left: 1rem;
}

.theme-entry.psf div.grid-footer div.toolbar-wrapper {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
  position: static !important;
  width: 100%;
}

.theme-entry.psf div.grid-footer div.toolbar-wrapper > a.toolbar-button {
  background-color: transparent !important;
  border: 0 !important;
  position: static !important;
}

.theme-entry.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"] {
  display: grid !important;
  grid-template-columns: 100% !important;
  grid-template-rows: auto auto !important;
  width: 100%;
}

.theme-entry.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"] > span:nth-child(2) {
  display: none !important;
}

.theme-entry.psf div.kpi div[name="tblKPIs"] {
  display: grid !important;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(180px, 1fr)) !important;
  padding: 0 !important;
}

.theme-entry.psf div.kpi div.card {
  background: var(--ntx-white);
  border: 1px solid var(--ntx-soft-line) !important;
  box-shadow: 0 4px 12px rgba(0, 4, 38, 0.06);
  display: grid;
  gap: 0.2rem 1rem;
  grid-template-columns: minmax(0, 1fr) auto auto;
  grid-template-rows: auto auto;
  min-height: 112px;
  padding: 1.4rem;
}

.theme-entry.psf div.kpi div.card.actions,
.theme-entry.psf div.kpi div.card.actions * {
  cursor: pointer;
}

.theme-entry.psf div.kpi div.card span {
  padding-left: 0 !important;
  text-align: left;
}

.theme-entry.psf div.kpi div.card .kpi-label {
  align-content: center;
  display: inline-flex;
  flex-wrap: wrap;
  grid-column: 1 / 2 !important;
  grid-row: 1 / 2 !important;
}

.theme-entry.psf div.kpi div.card .kpi-label > span {
  background: transparent !important;
  color: var(--ntx-deep-navy);
  font-size: 1.05rem !important;
  font-weight: 700;
}

.theme-entry.psf div.kpi div.card .kpi-text {
  align-content: center;
  grid-column: 1 / 2 !important;
  grid-row: 2 / 3 !important;
}

.theme-entry.psf div.kpi div.card .kpi-text > span {
  color: rgba(14, 14, 14, 0.58);
  font-size: 0.95rem !important;
  white-space: pre-line;
}

.theme-entry.psf div.kpi div.card .kpi-number {
  align-content: center;
  color: var(--ntx-deep-navy);
  display: inline-flex;
  flex-wrap: wrap;
  font-weight: 800;
  grid-column: 2 / 3 !important;
  grid-row: 1 / 3 !important;
}

.theme-entry.psf div.kpi div.card .kpi-icon {
  align-content: center;
  display: inline-flex;
  flex-wrap: wrap;
  grid-column: 3 / 4 !important;
  grid-row: 1 / 3 !important;
}

.theme-entry.psf div.kpi div.card .kpi-icon > img {
  display: none;
}

.theme-entry.psf div.kpi div.card .kpi-icon::after {
  font-size: 42px;
}

.theme-entry.psf div.kpi div.card.active .kpi-icon::after { content: "speed"; color: var(--ntx-blue); }
.theme-entry.psf div.kpi div.card.overdue .kpi-icon::after { content: "crisis_alert"; color: var(--ntx-orange); }
.theme-entry.psf div.kpi div.card.urgent .kpi-icon::after { content: "emergency_home"; color: var(--ntx-magenta); }
.theme-entry.psf div.kpi div.card.new .kpi-icon::after { content: "add_notes"; color: var(--ntx-orange); }
.theme-entry.psf div.kpi div.card.reports .kpi-icon::after { content: "lab_profile"; color: var(--ntx-blue); }
.theme-entry.psf div.kpi div.card.admin .kpi-icon::after { content: "admin_panel_settings"; color: var(--ntx-purple); }

.theme-entry.psf .dd-container {
  background-color: var(--ntx-white) !important;
  box-shadow: 0 4px 12px rgba(0, 4, 38, 0.08);
  margin: 1rem;
  padding: 1rem !important;
}

.theme-entry.psf .dd-container .dd-select {
  border: 0;
  margin-top: 0;
  width: 100% !important;
}

.theme-entry.psf .dd-container .dd-selected {
  display: flex;
  justify-content: space-between;
}

.theme-entry.psf .dd-container .dd-selected-text {
  display: none;
  width: 0 !important;
}

.theme-entry .popup,
.theme-entry .dialog,
.theme-entry .drop-menu {
  z-index: 20000 !important;
}

@media (max-width: 768px) {
  .theme-entry.psf .runtime-content.with-sidebar {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .theme-entry.psf .runtime-content::before {
    top: 1%;
  }

  .theme-entry.psf .runtime-content::before,
  .theme-entry.psf .runtime-content::after {
    height: 120px;
  }

  .theme-entry.psf .ntx-wave-layer {
    height: 120px;
  }

  .theme-entry.psf .psf-sidebar-toggle {
    display: flex;
  }

  .theme-entry.psf .psf-sidebar {
    max-width: min(86vw, 320px);
    transform: translateX(-105%);
    transition: transform 0.22s ease;
    width: min(86vw, 320px);
  }

  .theme-entry.psf.psf-sidebar-open .psf-sidebar {
    transform: translateX(0);
  }

  .theme-entry.psf .view.footer {
    display: none !important;
  }

  .theme-entry.psf.psf-sidebar-open::after {
    background: rgba(0, 4, 38, 0.45);
    content: "";
    inset: 0;
    position: fixed;
    z-index: 9999;
  }

  .theme-entry.psf .header.fixed {
    background-color: var(--ntx-white);
    box-shadow: var(--ntx-shadow);
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }

  .theme-entry.psf .header {
    margin-top: 0;
  }

  .theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] > span[col="1"][row="1"] > div > span[col="2"][row="1"] {
    top: 0;
  }

  .theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] > span[col="2"][row="1"] {
    top: 0;
  }

  .theme-entry.psf form {
    margin-left: 5px;
    margin-right: 5px;
    overflow: auto !important;
  }

  .theme-entry.psf .header .panel-body-wrapper {
    padding: 70px 16px 18px !important;
  }

  .theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] {
    grid-template-columns: 1fr !important;
  }

  .theme-entry.psf .header .panel-body-wrapper div[name="tblLargeHeader"] > span[col="2"][row="1"] > div {
    display: none !important;
  }

  .theme-entry.psf .header h1 {
    font-size: 2.45rem;
  }

  .theme-entry.psf .header h2 {
    font-size: 1.65rem;
    transform: none;
  }

  .theme-entry.psf div.kpi div[name="tblKPIs"] {
    grid-template-columns: 1fr !important;
  }

  .theme-entry.psf div.kpi div.card {
    grid-template-columns: minmax(0, 1fr) auto;
    min-height: 92px;
    padding: 1rem;
  }

  .theme-entry.psf div.kpi div.card .kpi-label,
  .theme-entry.psf div.kpi div.card .kpi-text {
    display: none;
  }

  .theme-entry.psf div.kpi div.card .kpi-number {
    grid-column: 1 / 2 !important;
    grid-row: 1 / 2 !important;
  }

  .theme-entry.psf div.kpi div.card .kpi-icon {
    grid-column: 2 / 3 !important;
    grid-row: 1 / 2 !important;
  }

  .theme-entry.psf div.grid-footer div.toolbar-wrapper {
    display: none;
  }
}
`;

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
      return;
    }
    callback();
  }

  function injectStyles() {
    if (document.getElementById("nintex-psf-single-style")) {
      return;
    }

    var style = document.createElement("style");
    style.id = "nintex-psf-single-style";
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function isMobile() {
    return document.documentElement.classList.contains("mobile") || window.matchMedia("(max-width: 768px)").matches;
  }

  function getJQuery() {
    return window.jQuery || window.$;
  }

  function applyThemeClasses($) {
    $("body, form, .runtime-content, .runtime-form").addClass("psf");
  }

  function markView($, areaName, className) {
    var view = $('div[name="' + areaName + '"]').closest(".view");
    if (view.length) {
      view.addClass(className);
    }
    return view;
  }

  function renderBackground($) {
    var runtime = $(".runtime-content").first();
    if (!runtime.length) {
      return;
    }

    if (!runtime.children(".ntx-wave-layer").length) {
      runtime.prepend('<div class="ntx-wave-layer ntx-wave-layer--bottom" aria-hidden="true"></div>');
      runtime.prepend('<div class="ntx-wave-layer ntx-wave-layer--top-secondary" aria-hidden="true"></div>');
      runtime.prepend('<div class="ntx-wave-layer ntx-wave-layer--top" aria-hidden="true"></div>');
    }

    startWaveAnimation();
  }

  function startWaveAnimation() {
    if (state.waveAnimationStarted) {
      return;
    }

    state.waveAnimationStarted = true;
    var start = Date.now();

    var paint = function () {
      var elapsed = Date.now() - start;
      var top = document.querySelector(".ntx-wave-layer--top");
      var topSecondary = document.querySelector(".ntx-wave-layer--top-secondary");
      var bottom = document.querySelector(".ntx-wave-layer--bottom");

      if (top) {
        top.style.backgroundPosition = (-elapsed / 18) + "px 0";
      }

      if (topSecondary) {
        topSecondary.style.backgroundPosition = (-420 - elapsed / 27) + "px 0";
      }

      if (bottom) {
        bottom.style.backgroundPosition = (elapsed / 24) + "px 0";
      }
    };

    var animate = function () {
      paint();
      window.requestAnimationFrame(animate);
    };

    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(animate);
    } else {
      window.setInterval(paint, 33);
    }
  }

  function cloneLogoImage($, logoSpan) {
    var img = logoSpan.find("img").first();
    if (!img.length) {
      return $();
    }

    var clone = img.clone(false);
    clone.removeAttr("id name tabindex data-options");
    return clone;
  }

  function renderHeader($) {
    var header = markView($, CONFIG.headerViewName, "header");
    $('span[name="' + CONFIG.logoCellName + '"]').addClass("logo psf-header-logo-source");

    if (!header.length || state.mobileHeaderBound) {
      return;
    }

    state.mobileHeaderBound = true;
    $("form").on("scroll.nintexPsfHeader", function () {
      if (!isMobile()) {
        header.removeClass("fixed");
        return;
      }

      var offset = Math.max(header.outerHeight() / 2, 60);
      header.toggleClass("fixed", $(this).scrollTop() >= offset);
    });
  }

  function renderNavigation($) {
    var runtime = $(".runtime-content").first();
    var tabs = $("ul.tab-box-tabs").first();

    if (!runtime.length || !tabs.length || $("#psf-sidebar").length) {
      return;
    }

    var sidebar = $('<nav id="psf-sidebar" class="psf-sidebar" aria-label="Form navigation"></nav>');
    var logoSpan = $('span[name="' + CONFIG.logoCellName + '"]').first();
    var logoImage = cloneLogoImage($, logoSpan);
    if (logoImage.length) {
      sidebar.append($('<div class="psf-sidebar-logo"></div>').append(logoImage));
      logoSpan.addClass("psf-header-logo-source").attr("aria-hidden", "true");
    }

    sidebar.append($('<div class="psf-sidebar-tabs"></div>').append(tabs));
    runtime.prepend(sidebar).addClass("with-sidebar");

    var toggle = $('<button type="button" id="psf-sidebar-toggle" class="psf-sidebar-toggle" aria-controls="psf-sidebar" aria-expanded="false"></button>');
    runtime.prepend(toggle);

    toggle.on("click.nintexPsfSidebar", function () {
      var root = $(".theme-entry.psf").first();
      var open = !root.hasClass("psf-sidebar-open");
      root.toggleClass("psf-sidebar-open", open);
      toggle.attr("aria-expanded", String(open));
    });

    tabs.on("click.nintexPsfSidebar", "a.tab", function () {
      $(".theme-entry.psf").removeClass("psf-sidebar-open");
      toggle.attr("aria-expanded", "false");
    });
  }

  function moveIntoCard($, card, elements) {
    elements.forEach(function (element) {
      if (element && element.length) {
        card.append(element);
      }
    });
  }

  function renderKpiCard($, name, cardIndex) {
    if ($("#psf-kpi-" + name).length) {
      return;
    }

    var table = $('div[name="tblKPIs"]').first();
    if (!table.length) {
      return;
    }

    var card = $('<div id="psf-kpi-' + name + '" class="card ' + name + '"></div>');
    table.prepend(card);

    var base = '.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"] > span[col="1"] > div > ';
    var label = $(base + 'span[col="' + cardIndex + '"][row="1"]').addClass("kpi-label");
    var icon = $(base + 'span[col="' + cardIndex + '"][row="2"]').addClass("kpi-icon");
    var number = $(base + 'span[col="' + (cardIndex + 1) + '"][row="2"]').addClass("kpi-number");
    var text = $(base + 'span[col="' + cardIndex + '"][row="3"]').addClass("kpi-text");

    moveIntoCard($, card, [label, icon, number, text]);
  }

  function renderActionCard($, name, cardIndex, buttonName) {
    if ($("#psf-action-" + name).length) {
      return;
    }

    var table = $('div[name="tblKPIs"]').first();
    if (!table.length) {
      return;
    }

    var card = $('<div id="psf-action-' + name + '" class="actions card ' + name + '" role="button" tabindex="0"></div>');
    table.append(card);

    var base = '.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"] > span[col="3"] > div > ';
    var label = $(base + 'span[col="' + cardIndex + '"][row="1"]').addClass("kpi-label");
    var icon = $(base + 'span[col="' + cardIndex + '"][row="2"]').addClass("kpi-icon");
    var text = $(base + 'span[col="' + cardIndex + '"][row="3"]').addClass("kpi-text");

    moveIntoCard($, card, [label, icon, text]);

    card.on("click.nintexPsfAction keydown.nintexPsfAction", function (event) {
      if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      $('[name="' + buttonName + '"]').trigger("click");
    });
  }

  function renderKpis($) {
    var kpiView = markView($, CONFIG.kpiViewName, "kpi");
    if (!kpiView.length) {
      return;
    }

    renderKpiCard($, "active", 1);
    renderKpiCard($, "overdue", 3);
    renderKpiCard($, "urgent", 5);
    renderActionCard($, "new", 1, CONFIG.actionButtons.new);
    renderActionCard($, "reports", 2, CONFIG.actionButtons.reports);
    renderActionCard($, "admin", 3, CONFIG.actionButtons.admin);
  }

  function renderSearch($) {
    $('div[name="' + CONFIG.searchControlName + '"]').addClass("search-control");
  }

  function renderLists($) {
    markView($, CONFIG.requestListViewName, "requests");
  }

  function findFooterView($) {
    var footer = $('div[name="' + CONFIG.footerViewName + '"]').closest(".view");
    if (footer.length) {
      return footer.first();
    }

    footer = $('[name="lblCopyright"]').closest(".view");
    if (footer.length) {
      return footer.first();
    }

    footer = $(".SFC.SourceCode-Forms-Controls-Web-Label").filter(function () {
      return ($(this).text() || "").indexOf("Nintex Solution Gallery") !== -1;
    }).closest(".view");
    if (footer.length) {
      return footer.first();
    }

    footer = $('div[name$="Area Item2"]').closest(".view");
    return footer.first();
  }

  function layoutFooter($, runtime, footer) {
    if (isMobile()) {
      footer.css("--psf-footer-push", "0px").removeClass("psf-footer-push");
      return;
    }

    footer.css("--psf-footer-push", "0px").addClass("psf-footer-push");

    var occupiedHeight = 0;
    footer.prevAll().each(function () {
      var item = $(this);
      var position = item.css("position");
      if (!item.is(":visible") || position === "fixed" || position === "absolute") {
        return;
      }
      occupiedHeight += item.outerHeight(true) || 0;
    });

    var runtimeTop = runtime.offset().top || 0;
    var runtimeVerticalMargins = (parseFloat(runtime.css("margin-top")) || 0) + (parseFloat(runtime.css("margin-bottom")) || 0);
    var availableHeight = Math.max(0, window.innerHeight - runtimeTop - runtimeVerticalMargins);
    var footerHeight = footer.outerHeight(true) || 0;
    var targetGap = Math.max(0, availableHeight - occupiedHeight - footerHeight - 16);

    footer.css("--psf-footer-push", targetGap + "px");
  }

  function renderFooter($) {
    var runtime = $(".runtime-content").first();
    var footer = findFooterView($);
    if (!runtime.length || !footer.length) {
      return;
    }

    footer.addClass("footer");
    layoutFooter($, runtime, footer);
    [0, 120, 500].forEach(function (delay) {
      window.setTimeout(function () {
        layoutFooter($, runtime, footer);
      }, delay);
    });

    if (!state.footerResizeBound) {
      state.footerResizeBound = true;
      $(window).on("resize.nintexPsfFooter", function () {
        renderFooter($);
      });
    }

    if (!state.footerTabBound) {
      state.footerTabBound = true;
      $("ul.tab-box-tabs").first().on("click.nintexPsfFooter keydown.nintexPsfFooter", "a.tab", function (event) {
        if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") {
          return;
        }

        [0, 80].forEach(function (delay) {
          window.setTimeout(function () {
            renderFooter($);
          }, delay);
        });
      });
    }
  }

  function refresh() {
    var $ = getJQuery();
    if (!$) {
      window.setTimeout(refresh, 100);
      return;
    }

    applyThemeClasses($);
    renderBackground($);
    renderHeader($);
    renderNavigation($);
    renderKpis($);
    renderSearch($);
    renderLists($);
    renderFooter($);
  }

  function init() {
    if (state.initialized) {
      refresh();
      return;
    }

    state.initialized = true;
    injectStyles();
    refresh();
  }

  window.NintexPSFTheme = {
    init: init,
    refresh: refresh
  };

  ready(init);
})(window, document);
