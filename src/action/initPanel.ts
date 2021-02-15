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
export function initPanel() {
  // app.eventNotifier = (event, descriptor) => {
  //   console.log(event, JSON.stringify(descriptor, null, " "));
  // };
  console.log("jk");
  console.log(app.currentTool);

  let panel: string = document.querySelector(uxpPanel).getAttribute(`panel`);

  switch (panel) {
    case `main`:
      insertHtmlFromPath("./panel/main.html");
      break;

    case `compress-export`:
      insertHtmlFromPath("./panel/compressAndexport.html");
      break;

    case `duplice-vector`:
      break;
    default:
      break;
  }
}

/**
 * add listener for top panel
 */
