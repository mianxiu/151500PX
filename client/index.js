var csInterface = new csInterface();

var openButton = document.querySelector("#open-button")
openButton.addEventListener("click", openDoc)

function openDoc() {
    csInterface.evalScript("openDocument()")
}

function openDocument() {
    alert('123')
}