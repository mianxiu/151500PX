import * as layerComponent from '../module/layercomponent'
import * as initPanel from './initPanel'
import * as compressAndExport from './compressAndExport'

export async function listen() {
  initPanel.initClikcListeners([
    {
      selector: `#compress-export`,
      listener: () => {
        console.log(`i'm compress`)
        compressAndExport.exportFuckingWork()
      },
    },
    {
      selector: `#uncompress-export`,
      listener: () => {
        console.log(`i'm uncompress`)
        compressAndExport.exportFuckingWork(false)
      },
    },
  ])
}
