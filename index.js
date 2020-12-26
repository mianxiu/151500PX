const {foo, bar} = require("./module/main.js");

function doSomething() {
   document.getElementById("layers").innerHTML = `${foo(3)}`
}

document.getElementById("btnPopulate").addEventListener("click", doSomething);

