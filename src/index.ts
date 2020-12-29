const { deleteAllEmptyLayers,cropToMargin } = require('./module/main')


function doSomething() {
    //  document.getElementById("layers").innerHTML = `${showLayerNames()}`
    //  console.log(fff())
    // deleteAllEmptyLayers()
    cropToMargin(20)

}

document.getElementById("btnPopulate").addEventListener("click", doSomething);

