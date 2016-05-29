[![NPM][npm]][npm-url]
[![Node][node]][node-url]
[![Dependencies][deps]][deps-url]
[![DevDependencies][devdeps]][devdeps-url]
[![Standard Code Style][style]][style-url]

# PostCSS Load Plugins

## Status

| Branch               | Build                     | Coverage                 |
|:--------------------:|:-------------------------:|:------------------------:|
|  Master              | ![travis]                 | ![cover]                 |
|  Release/v1.0.0      | ![travis-rel]             | ![cover-rel]             |

## Install

```bash
npm i -D postcss-loads-plugins
```

## Usage

Need a Plugin? [PostCSS Plugins](https://postcss.parts)

Plugins will load directly from your projects ***package.json*** file.
Install them as usual with ``` npm i -S postcss-plugin``` or ``` npm i -D postcss-plugin ```.

After installing your plugins there a two common ways to declare your plugin options.

- Create **postcss.plugins** section in your projects **package.json**.
- Create a **postcss.config.js**  or  **postcssrc.json** file.

## Options

#### package.json

```json
{
 "dependencies": {
   "postcss-bem": "^0.2.2",
 },
 "devDependencies": {},
 "postcss": {
   "parser": "sugarss",
   "plugins": {
     "postcss-bem": {
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
}
```

#### postcss.config.js

```js
module.exports = {
  parser: "sugarss",
  plugins: {
    'postcss-bem': {
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
}
```
#### postcssrc.json

```json
"parser": "sugarss",
"plugins": {
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
#### Default

```js
'use strict'

const fs = require('fs')

const postcss = require('postcss')
const plugins = require('postcss-load-plugins')

const css = fs.readFileSync('./index.css', 'utf-8')

postcss(plugins())
  .process(css)
  .then(result => console.log(result.css))
```

#### Custom

```js
'use strict'

const fs = require('fs')

const postcss = require('postcss')
const plugins = require('postcss-load-plugins')

const css = fs.readFileSync('./index.css', 'utf-8')

postcss(plugins('./postcssrc.json'))
  .process(css)
  .then(result => console.log(result.css))
```

## LICENSE [![License MIT][license]][license-url]

> License (MIT)

> Copyright (c) 2016 Michael Ciniawsky

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[npm]: https://img.shields.io/npm/v/postcss-load-plugins.svg
[npm-url]: https://npmjs.com/package/postcss-load-plugins

[node]: https://img.shields.io/node/v/gh-badges.svg?maxAge=2592000
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/michael-ciniawsky/postcss-load-plugins.svg
[deps-url]: https://david-dm.org/michael-ciniawsky/postcss-load-plugins

[devdeps]: https://david-dm.org/michael-ciniawsky/postcss-load-plugins/dev-status.svg
[devdeps-url]: https://david-dm.org/michael-ciniawsky/postcss-load-plugins#info=devDependencies

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[travis]: http://img.shields.io/travis/michael-ciniawsky/postcss-load-plugins.svg
[travis-url]: https://travis-ci.org/michael-ciniawsky/postcss-load-plugins

[travis-rel]: http://img.shields.io/travis/michael-ciniawsky/postcss-load-plugins.svg?branch=release/1.0.0
[travis-rel-url]:https://travis-ci.org/michael-ciniawsky/postcss-load-plugins?branch=release/1.0.0

[travis-dev]: http://img.shields.io/travis/michael-ciniawsky/postcss-load-plugins.svg?branch=develop
[travis-dev-url]: https://travis-ci.org/michael-ciniawsky/postcss-load-plugins?branch=develop

[cover]: https://coveralls.io/repos/github/michael-ciniawsky/postcss-load-plugins/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/michael-ciniawsky/postcss-load-plugins?branch=master

[cover-rel]: https://coveralls.io/repos/github/michael-ciniawsky/postcss-load-plugins/badge.svg?branch=release/1.0.0
[cover-rel-url]: https://coveralls.io/github/michael-ciniawsky/postcss-load-plugins?branch=release/1.0.0

[cover-dev]: https://coveralls.io/repos/github/michael-ciniawsk/postcss-load-plugins/badge.svg?branch=develop
[cover-dev-url]: https://coveralls.io/github/michael-ciniawsky/postcss-load-plugins?branch=develop

[license]: https://img.shields.io/github/license/michael-ciniawsky/postcss-load-plugins.svg
[license-url]: https://raw.githubusercontent.com/michael-ciniawsky/postcss-load-plugins/master/LICENSE
