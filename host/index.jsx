function showAlert(){
    alert('I AM MIANXIU')
}

function createDoc(){
    // 文件名一致会冲突

var FilePath = "/c/Users/mianx/Desktop/PS ExtendScript/"
/*
var docRef = app.documents.add(40,40)
app.activeDocument = docRef

theChannels = new Array(docRef.channels[0],docRef.channels[2])
docRef.activeChannels = theChannels

*/
/*
var fileRef = File("/c/Users/mianx/Desktop/PS ExtendScript/IMG_0034.psd")
var docRef = app.open(fileRef)
*/

/*
var originalRulerUnits = app.preferences.rulerUnits
app.preferences.rulerUnits = Units.PIXELS

var fileRef = new File(FilePath + "/Samples.pdf")

var pdfOpenOptions = new PDFOpenOptions
pdfOpenOptions.antiAlias = true
pdfOpenOptions.mode = OpenDocumentMode.CMYK
pdfOpenOptions.resolution =72
pdfOpenOptions.page = 3

app.open(fileRef,pdfOpenOptions)
*/

DialogModes.ALL

var docRef = app.documents.add(200,200,72,"Simple Line")
docRef.artLayers.add()

var layerSetRef = docRef.layerSets.add()
var layerRef = docRef.artLayers[0].duplicate(layerSetRef,ElementPlacement.PLACEAFTER)

var shapeRef = [
[10,10],[20,15],[30,5],[30,60]
]
docRef.selection.select(shapeRef)

docRef.activeLayer = docRef.artLayers[1]

strokeColor = new SolidColor
strokeColor.cmyk.cyan = 20
strokeColor.cmyk.magenta= 50
strokeColor.cmyk.yellow = 30
strokeColor.cmyk.black = 0

app.activeDocument.selection.stroke(strokeColor,4,StrokeLocation.CENTER,ColorBlendMode.VIVIDLIGHT,75,false)

var selRef = app.activeDocument.selection
selRef.expand (5)
selRef.contract (5)
selRef.feather (5)

var fillColor = new SolidColor()
fillColor.rgb.red = 125
fillColor.rgb.green = 10
fillColor.rgb.blue = 120
app.activeDocument.selection.fill(fillColor, ColorBlendMode.NORMAL,100,false)

// 通道创建和选区储存
var chanRef = docRef.channels.add()
chanRef.name = "My Channel"
chanRef.kind = ChannelType.SELECTEDAREA

docRef.selection.store(docRef.channels["My Channel"],SelectionType.EXTEND)

selRef.load(docRef.channels["My Channel"],SelectionType.EXTEND)

// 文档信息
var docInfoRef = docRef.info
docInfoRef.copyrighted = CopyrightedType.COPYRIGHTEDWORK
docInfoRef.ownerUrl = "mianxiu.me"

var lineArray = new Array()
lineArray[0] = new PathPointInfo
lineArray[0].kind = PointKind.CORNERPOINT
lineArray[0].anchor = Array(100,100)
lineArray[0].leftDirection = lineArray[0].anchor
lineArray[0].rightDirection = lineArray[0].anchor

lineArray[1] = new PathPointInfo
lineArray[1].kind = PointKind.CORNERPOINT
lineArray[1].anchor = Array(150,200)
lineArray[1].leftDirection = lineArray[0].anchor
lineArray[1].rightDirection = lineArray[0].anchor

var lineSubPathArray = new Array()
lineSubPathArray[0] = new SubPathInfo()
lineSubPathArray[0].operation = ShapeOperation.SHAPEXOR
lineSubPathArray[0].closed = false
lineSubPathArray[0].entireSubPath = lineArray

var myPathItem = docRef.pathItems.add("A Line",lineSubPathArray)

myPathItem.strokePath(ToolType.BRUSH)




//  根据层级自下而上的选择，比如下面的命令就不包含组里的图层
// app.activeDocument.activeLayer = app.activeDocument.artLayers[1]

}