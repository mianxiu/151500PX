import * as compressAndExport from "./compressAndExport";
import * as dupliceVector from "./dupliceVector";
import * as mainPanel from "./mainpanel";

const app = require("photoshop").app;

const uxpPanel = `#uxp-panel`;
const panelMode = {
  main: `main`,
  compressExport: `compress-export`,
  dupliceVector: `duplice-vector`,
};

/**
 * inin when plugin load
 */
export function initPanel() {
  upgradeNav();
  upGradePanel();
}

export function shortcutsListener() {
  /** not support */
}
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
 * @summary initEvent = "false"
 * need add attribute for node
 *
 * @param initEventListener
 */
function initClikcListeners(initEventListener: InitEventListener | InitEventListener[]) {
  let listener = [].concat(initEventListener);

  let intervalEvent = setInterval(() => {
    if (document.querySelector(`#uxp-panel`).innerHTML !== "") {
      for (let i = 0; i < listener.length; i++) {
        const el = listener[i];
        let node = document.querySelector(el.selector);
        let initAttr = node !== null ? node.getAttribute(`initEvent`) : null;

        if (initAttr === `false`) {
          console.log(el.selector, `initEventListener`, true);
          document.querySelector(el.selector).addEventListener(`click`, el.listener);
          node.setAttribute(`initEvent`, `true`);
        }
      }

      clearInterval(intervalEvent);
    }
  }, 1);
}

/**
 * init tab menu
 */
function upgradeNav() {
  let navNode = document.querySelector(`#nav`);
  let menu = document.querySelector(`#sp-menu`);
  let menuImg: HTMLImageElement = document.querySelector(`#sp-menu>img`);
  let navTypeAttr: string = navNode !== null ? navNode.getAttribute(`type`) : null;

  console.log(navTypeAttr);

  let menuFunc = () => {
    console.log(1234);
    let navTypeAttr: string = navNode !== null ? navNode.getAttribute(`type`) : null;
    /**
     * upgrade icon
     */
    switch (navTypeAttr) {
      case `back`:
        menuImg.src = `./icons/svg/general_menu.svg`;
        navNode.setAttribute(`type`, `menu`);
        upgradeMain();
        break;
      default:
        break;
    }
  };

  if (navNode.getAttribute(`init`) === `false`) {
    menu.addEventListener(`click`, menuFunc);
    navNode.setAttribute(`init`, `true`);
  }

  /**
   * upgrade icon
   */
  let upgradeIcons = () => {
    switch (navTypeAttr) {
      case `menu`:
        break;
      case `back`:
        menuImg.src = `./icons/svg/general_back.svg`;
        break;
      default:
        break;
    }
  };

  upgradeIcons();
}

/**
 * insertHtmlFromPath
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
async function upGradePanel() {
  let panel: string = document.querySelector(uxpPanel).getAttribute(`panel`);

  switch (panel) {
    case panelMode.main:
      upgradeMain();
      break;

    case panelMode.compressExport:
      upgradeCompressExport();
      break;

    case panelMode.dupliceVector:
      upgradeDupliceVector();
      break;
    default:
      break;
  }
}

/** todo
 * add listener for all button
 */
async function upgradeMain() {
  insertHtmlFromPath("./panel/main.html");

  /**
   * init top panel
   */

  let initBlackMetalId = `#init-black-metal`;
  let initBlackMetalFunc = () => {
    mainPanel.fff();
    console.log(`initblackmetal`);
  };

  let initWhiteMetalId = `#init-white-metal`;
  let initWhiteMetalFunc = () => {
    //compressAndExport.fuck(false);
    compressAndExport.mergeMainToSmartObjectUnCompress();
  };

  let compressExportId = `#compress-export`;
  let compressExportFunc = () => {
    document.querySelector(`#nav`).setAttribute(`type`, `back`);
    document.querySelector(uxpPanel).setAttribute(`panel`, panelMode.compressExport);
    upgradeNav();
    upGradePanel();

    //compressAndExport.fuck();
    compressAndExport.mergeMainToSmartObjectCompress();
  };

  let dupliceVectorId = `#duplice-vector`;
  let dupliceVectorFunc = () => {
    document.querySelector(`#nav`).setAttribute(`type`, `back`);
    document.querySelector(uxpPanel).setAttribute(`panel`, panelMode.dupliceVector);
    upgradeNav();
    upGradePanel();
    dupliceVector.dupliceBaseSpacing(0, 0, 10);
  };
  /**
   *
   */

  initClikcListeners([
    { selector: initBlackMetalId, listener: initBlackMetalFunc },
    { selector: initWhiteMetalId, listener: initWhiteMetalFunc },
    { selector: compressExportId, listener: compressExportFunc },
    { selector: dupliceVectorId, listener: dupliceVectorFunc },
  ]);
}

/**
 *
 */
async function upgradeCompressExport() {
  upgradeNav();
  insertHtmlFromPath("./panel/compressAndexport.html");
}

async function upgradeDupliceVector() {
  upgradeNav();
  insertHtmlFromPath("./panel/dupliceVector.html");
}

export let Ttest = () => {
  console.log(`onclick`);
};
