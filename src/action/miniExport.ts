import * as layerComponent from '../module/layercomponent'
import * as initPanel from './initPanel'

export async function listen() {
  initPanel.initClikcListeners([
    {
      selector: `#compress-export`,
      listener: () => {
        console.log(`i'm compress`)
      },
    },
    {
      selector: `#uncompress-export`,
      listener: () => {
        console.log(`i'm uncompress`)
      },
    },
  ])
}
