const app = require("photoshop").app;

const uxpPanel = `#uxp-panel`;

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
  // app.eventNotifier = (event, descriptor) => {
  //   console.log(event, JSON.stringify(descriptor, null, " "));
  // };
  console.log("jk");
  console.log(app.currentTool);

  let panel: string = document.querySelector(uxpPanel).getAttribute(`panel`);

  switch (panel) {
    case `main`:
      initMain();
      break;

    case `compress-export`:
      initCompressExport();
      break;

    case `duplice-vector`:
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
  let initTip = `init-tip`;
  let initBlackMetal = `init-black-metal`;
  let initWhiteMetal = `init-white-metal`;
  let compressExport = `compress-export`;

  let initTipFunc = () => {};
  let initBlackMetalFunc = () => {};
  let initWhiteMetalFunc = () => {};
  let compressExportFunc = () => {
    initPanel();
  };

  document.addEventListener(`click`, compressExportFunc);
}

/**
 *
 */
async function initCompressExport() {
  insertHtmlFromPath("./panel/compressAndexport.html");
}
