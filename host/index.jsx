/*
var folderSrc = Folder.selectDialog (prompt)
alert(folderSrc)
*/

// alert(app.activeDocument.layerSets[0].bounds)

function getElementSize(element){
    /*
        @param element
        retrun elemetn width and height array of unitValue,.
        */
    
    var ref = element 
    var doc = app.activeDocument

    var docWidth = doc.width
    var docHeight = doc.height

    var refBounds = ref.bounds
    
    var refWidth = ref.bounds[2] - ref.bounds[0]
    var refHeight = ref.bounds[3] - ref.bounds[1]

    return new Array(refWidth,refHeight)
    
    }

function cropElement(element,padding){
    var ref = element
    var doc = app.activeDocument
    }


alert (getElementSize(app.activeDocument.layerSets[0]))