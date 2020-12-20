var csInterface = new csInterface();

var openButon = document.querySelector("#open-button")
openButon.addEventListener("click",openDoc)

function openDoc(){
    csInterface.evalSCript("openDocument()")
}

function openDocument(){
 alert('123')
}