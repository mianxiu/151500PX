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
  - /plugin
    - /css/index.css
    - /icons/...png
    - /module/main.js //separate the file to use ExtendScript
    - index.html
    - index.js
    - manifest.json
  - /src
    - /module/main.ts
    - index.ts
  - package.json
  - README.md
  - watch.sh
```
### index.html replace stylesheet
```html
<head>
    <link rel="stylesheet" href="./css/index.css">
</head>
```
### main.ts
```typescript
...
    module.exports = {
        // export module,UXP must be use this now,
        // https://www.adobe.io/photoshop/uxp/guides/how-to/
        deleteAllEmptyLayers
    }

    // if I don't use ,is has // XXX was also declared here
    export {}

```
### index.ts
```typescript
    // import module
    const  { deleteAllEmptyLayers } = require('./module/main')
...

```
### install TypeScript & tsc-watch
```
npm install -i typescript
npm install -i tsc-watch
```
create a `tsconfig.json` in `/plugin name/tscofig.json`, write:
```json
{
    "compilerOptions": {
      "outDir": "./plugin",
      "allowJs": true,
      "target": "es5"
    },
    "include": ["./src/**/*"]
  }
```
modify `package.json`, add 
```json
  ...
  "scripts": {
    "start": "tsc-watch --onSuccess \"node ./plugin\"/"
  }
  ...
```
**create `.vscode/tasks.json`** folder and file in root, wirte:
```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"type": "npm",
			"script": "start",
			"problemMatcher": [],
			"label": "npm: start",
			"detail": "./node_modules/.bin/tsc-watch --onSuccess \"node ./plugin\""
		},
		{
			"type": "typescript",
			"tsconfig": "tsconfig.json",
			"option": "watch",
			"problemMatcher": [
				"$tsc-watch"
			],
			"group": {
				"kind": "build",
				"isDefault": true
			},
			"label": "tsc: watch - tsconfig.json"
		}
	]
}
```

##

### 😤 use `npm run start` in vsc terminal, or other.
powershell policy set
```
set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```
use `Terminal -> Run Task -> typescript -> tsc:watch `
## 🔔 Use batchPlay -> actionJSON
[use tool to recode action json](https://github.com/jardicc/alchemist)
## Tool
- [Adobe UXP Developer Tool](https://www.adobe.io/photoshop/uxp/)
