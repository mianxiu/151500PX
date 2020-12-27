# 151500PX
A Adobe UXP simple my workflow for PhotoShop CC 2021. 🙃🐟
## Wolkflow
use [Adobe UXP Developer Tool](https://www.adobe.io/photoshop/uxp/) (I told it `AUDT`) to `Create Plugin`,`Tamplate` is `ps-start`(other is `ps-start-react`，then the folder tree like this:
```
- plugin name
  - /icons/...png
  - index.html
  - index.js
  - LICENSE
  - manifest.json
  - package.json
  - README.json
  - watch.sh
```
now you can open `PhotoShope CC 2021`,use `AUDT` to `load`/`debug`/`watch file` etc, and use `VSC` or other to wirte Script.
## What Language you need to know ?
- JavaScript/HTML/CSS `write plugin panel,interface`
- Adobe ExtendScript  `Adobe API,but UXP has some change,look this `[PhotoShop JS API](https://adobe-photoshop.github.io/uxp-api-docs/docs/)
- other look this [Adobe Developer](hhttps://www.adobe.io/photoshop/uxp/)
- todo PDF

## Use TypeScript
until now,i no all idea to use PhotoShop UXP typing for develop, but we can use TypeScript,`open the plugin floder`,and you can change file to this like me:

``` 
- Plugin name
  - /css/index.css
  - /icons/...png
  - /module/main.js //separate the file to use ExtendScript
  - index.html
  - index.js
  - manifest.json
```
## Tool
- [Adobe UXP Developer Tool](https://www.adobe.io/photoshop/uxp/)