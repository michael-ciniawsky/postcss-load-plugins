# Autoload Plugins for [PostCSS](https://github.com/postcss/postcss)

## Install

```bash
(sudo) npm i -D postcss-loads-plugins
```
[![npm](https://badge.fury.io/js/postcss-loads-plugins.svg)](https://badge.fury.io/js/postcss-loads-plugins) [![dependencies](https://david-dm.org/michael-ciniawsky/postcss-loads-plugins.svg)](https://david-dm.org/michael-ciniawsky/postcss-loads-plugins)

## Usage

Plugins will be loaded directly from your projects ***package.json*** file.
Install them as usual with ``` npm i -S ``` or ``` npm i -D ```.

[PostCSS Plugins](https://postcss.parts)

After installing your plugins there a three ways to declare your plugin options.

- Set options directly as arguments.
- Set options in your ***package.json***.
- Create a separated ***[name].[ext]*** file, where ***[name]*** is any name you like and ***[ext]*** should be either ``` .js ``` or ``` .json ```.
For an example of well formed options file see below.

## Options

### package.json

```json
{
 "dependencies": {
   "postcss-bem": "^0.2.2",
   "postcss-for": "^1.0.1",
   "posthtml-import": "^1.0.2"
 },
 "devDependencies": {
   "postcss-conditionals": "^0.1.1"
 },

 "postcss": {
   "bem": {
     "defaultNamespace": "undefined",
     "style": "bem",
     "separators": {
       "namespace": "-",
       "descendent":"__",
       "modifier": "--"
     },
     "shortcuts": {
       "component": "block",
       "descendent": "elem",
       "modifier": "mods"
     }
   }  
 }
}
```

### [name].[ext]

#### JS
```js
module.exports = {
  bem: {
    defaultNamespace: undefined,
    style: 'bem',
    separators: {
      namespace: '-',
      descendent: '__',
      modifier: '--'
    },
    shortcuts: {
      component: 'block',
      descendent: 'elem',
      modifier: 'mods'
    }
  }
}
```
#### JSON

```json
{
  "bem": {
    "defaultNamespace": "undefined",
    "style": "bem",
    "separators": {
      "namespace": "-",
      "descendent":"__",
      "modifier": "--"
    },
    "shortcuts": {
      "component": "block",
      "descendent": "elem",
      "modifier": "mods"
    }
  }
}
```

## Usage
For general usage and build process integration see [PostCSS Docs](https://github.com/postcss/postcss#usage)

### Examples using Node API
#### Default

```js
'use strict'

const fs = require('fs')

const postcss = require('postcss')
const plugins = require('postcss-load-plugins')()

let css = fs.readFileSync('./index.css', 'utf-8')

postcss(plugins)
  .process(css)
  .then(result => console.log(result.css))
```

#### Options file (e.g postcss.json)

```js
'use strict'

const fs = require('fs')

const postcss = require('postcss')
const plugins = require('postcss-load-plugins')('postcss.(js|json)')

let css = fs.readFileSync('./index.css', 'utf-8')

postcss(plugins)
  .process(css)
  .then(result => console.log(result.css))
```
