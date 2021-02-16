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
 *  @selector node-string;
 *  @listener EventListenerOrEventListenerObject
 */
interface InitEventListener {
  selector: string;
  listener: EventListenerOrEventListenerObject;
}
/**
 * if node Attribute initEvent === `false`
 * add listener fo nodes
 * @param selector
 * @param listener
 */
function initEventListeners(initEventListener: InitEventListener | InitEventListener[]) {
  let listener = [].concat(initEventListener);

  let intervalEvent = setInterval(() => {
    for (let i = 0; i < listener.length; i++) {
      const element = listener[i];
      let node = document.querySelector(element.selector);
      let initAttr = node !== null ? node.getAttribute(`initEvent`) : null;

      if (initAttr === `false`) {
        console.log(element.selector, true);
        document.querySelector(element.selector).addEventListener(`click`, element.listener);
        node.setAttribute(`initEvent`, `true`);
      }

      if (i >= listener.length) {
        clearInterval(intervalEvent);
      }
    }
  }, 1);
}

/**
 * init tab menu
 */
function initTab() {}

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
 * init panel and addEventListener
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
      initDupliceVector();
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

  /**
   *
   */
  let events: InitEventListener[] = [
    { selector: initTip, listener: initTipFunc },
    { selector: initBlackMetal, listener: initBlackMetalFunc },
    { selector: initWhiteMetal, listener: initWhiteMetalFunc },
    { selector: compressExport, listener: compressExportFunc },
  ];
  initEventListeners(events);
}

/**
 *
 */
async function initCompressExport() {
  insertHtmlFromPath("./panel/compressAndexport.html");
}

async function initDupliceVector() {}
