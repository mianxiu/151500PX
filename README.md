# 151500PX
A Adobe UXP simple my workflow for PhotoShop CC 2021. 🙃🐟
## Wolkflow in Window 10 2024H
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
now you can open `PhotoShop CC 2021`,use `AUDT` to `load`/`debug`/`watch file` etc, and use `VSC` or other to wirte Script.
## What Language you need to know ?
- JavaScript/HTML/CSS `write plugin panel,interface`
- Adobe ExtendScript  `Adobe API,but UXP has some change,look this `[PhotoShop JS API](https://adobe-photoshop.github.io/uxp-api-docs/docs/)
- other look this [Adobe Developer](hhttps://www.adobe.io/photoshop/uxp/)
- you should need to use `batchPlay` in PhotoShop.

## Use TypeScript
until now,i no all idea to use PhotoShop UXP typing for develop, but we can use TypeScript,`open the plugin floder`,and you can change file to this like me:

``` 
- Plugin name
  - /plugin
    - /css/index.css
    - /icons/...png
    - /module/main.js //separate the file to use ExtendScript
    - index.html
    - index.js
    - plugin.js
    - manifest.json
    - watch.bat
  - /src
    - /module/main.ts
    - plugin.ts
  - package.json
  - README.md
  - watch.sh
```
### 😳now let's start
### 1. index.html replace stylesheet
```html
<head>
    <link rel="stylesheet" href="./css/index.css">
</head>
```
### 2. main.ts (or other module.ts)
```typescript
...
    // module.exports = {
    //     // export module,UXP must be use this now,
    //     // https://www.adobe.io/photoshop/uxp/guides/how-to/
    //     deleteAllEmptyLayers
    // }
    function doSomeThing(){}
    export {doSomeThing}

```
### 3. plugin.ts (just rename defult index.js to plugin.ts)
```typescript
   // DOM main file
   // import module
   // const  { deleteAllEmptyLayers } = require('./module/main')
   import * as main from './module/main'

   document.getElementById("btnPopulate").addEventListener("click", main.doSomeThing());
...

```
### 4. install TypeScript & tsc-watch & npm-run-all , and `[chokidar-cli](https://github.com/kimmobrunfeldt/chokidar-cli)` to watch 
```
npm install -i typescript
npm install -i tsc-watch
npm install -i chokidar-cli
npm install -i npm-run-all
```

### 5. create `tsconfig.json` & modify `package.json`
create a `tsconfig.json` in `/plugin name/tscofig.json`, write:
```json
{
    "compilerOptions": {
      "outDir": "./plugin",
      "allowJs": true,
      "target": "es5"
    },
    "include": ["./src/**/*"],
    "exclude": [
    "node_modules"
  ]
  }
```
modify `package.json`, add this (of course, you can change path or other)
```json
  ...
  "scripts": {
    "watch": "npm-run-all --parallel watch:*",
    "watch:tsc": "tsc-watch --onSuccess \"node ./plugin\"/",
    "watch:plugin": "chokidar \"./src/**/*.ts\" -c \"npm run removeEmodule\"",
    "removeEmodule": "cd plugin && watch.bat"
  }
  ...
```


### 6. create .bat to delete `Object.defineProperty(exports, "__esModule", { value: true });` & > index.js
last step we add `removeEmoudle` and use `chokidar` to watch `plugin.ts` to compile `index.js`, now create the `watch.bat` in `./plugin/` folder, write this:
```bat
  findstr /V "Object.defineProperty(exports, " plugin.js > index.js
```
### 😤 use `npm run watch` in vsc terminal, or other.
powershell policy set
```
set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```
use `Terminal -> Run Task -> typescript -> tsc:watch `
## 🔔 Use batchPlay -> actionJSON
[use tool to recode action json](https://github.com/jardicc/alchemist)
## Tool
- [Adobe UXP Developer Tool](https://www.adobe.io/photoshop/uxp/)
