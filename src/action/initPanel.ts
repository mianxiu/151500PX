import { compileFunction } from "vm";

const app = require("photoshop").app;

const uxpPanel = `#uxp-panel`;
const panelMode = {
  main: `main`,
  compressExport: `compress-export`,
  dupliceVector: `duplice-vector`,
};

/**
 * obesever
 */
// let uxpPanelNode = document.querySelector(uxpPanel);
// let obeseverPanel = new MutationObserver(initPanel);
// obeseverPanel.observe(uxpPanelNode, {
//   attributes: true,
// });

/**
 * if node Attribute initEvent === `false`
 * @param selector
 * @param listener
 */
function initEvent(selector: string, listener: EventListenerOrEventListenerObject) {
  let initEventAttr = document.querySelector(selector);
  if (initEventAttr.getAttribute(`initEvent`) === `false`) {
    document.querySelector(selector).addEventListener(`click`, listener);
    initEventAttr.setAttribute(`initEvent`, `true`);
  }
}

/**
 * init main panel
 */
async function insertHtmlFromPath(path: string) {
  let res = await fetch(path).then(response => {
    return response.text();
  });
  document.querySelector(uxpPanel).innerHTML = res;
}

/**
 * init main panel and addEventListener
 */
export async function initPanel() {
  console.log(app.currentTool);

  let panel: string = document.querySelector(uxpPanel).getAttribute(`panel`);
  console.log(panel);
  switch (panel) {
    case panelMode.main:
      initMain();
      break;

    case panelMode.compressExport:
      initCompressExport();
      break;

    case panelMode.dupliceVector:
      break;
    default:
      break;
  }
}

/**
 * add listener for main panel
 */
async function initMain() {
  insertHtmlFromPath("./panel/main.html");

  /**
   * init top panel
   */
  let initTip = `#init-tip`;
  let initBlackMetal = `#init-black-metal`;
  let initWhiteMetal = `#init-white-metal`;
  let compressExport = `#compress-export`;

  let initTipFunc = () => {};
  let initBlackMetalFunc = () => {};
  let initWhiteMetalFunc = () => {};
  let compressExportFunc = () => {
    console.log(123);
    document.querySelector(uxpPanel).setAttribute(`panel`, panelMode.compressExport);
    initPanel();
  };

  let intervalEvent = setInterval(() => {
    initEvent(compressExport, compressExportFunc);
    clearInterval(intervalEvent);
  }, 1);
}

/**
 *
 */
async function initCompressExport() {
  insertHtmlFromPath("./panel/compressAndexport.html");
}
