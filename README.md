[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Tests][travis]][travis-url]
[![Coverage][cover]][cover-url]
[![Standard Code Style][style]][style-url]

<div align="center">
  <a href="https://github.com/postcss/postcss">
    <img width="108" height="108" title="PostCSS"           src="http://postcss.github.io/postcss/logo.svg" hspace="20">
  </a>
  <h1>Load Plugins</h1>
  <p>Autoload Plugins for PostCSS<p>
</div>

## Install

```bash
npm i -D postcss-load-plugins
```

## Usage
Install plugin as usual and make sure saving them to your ***package.json*** dependencies and/or devDependencies.

```
npm i -S postcss-plugin
npm i -D postcss-plugin
```

After installing your plugins there a two common ways to declare your plugins and options.

- Create **postcss** section in your projects **package.json**.
- Create a **postcss.config.js**  or  **postcssrc.json** file.

## Options

Plugin **options** can either take ```null``` or an object literal ```{}```
as value.

```null``` : Plugin loads with no options (defaults).

```[Object]``` : Plugin loads with set options.

## Ordering

Plugin **order** is determined by declaration in the plugins section.

```js

postcss: {
  plugins: {
    'postcss-plugin1': null,
    'postcss-plugin2': null,
    'postcss-plugin3': {option1: '', option2: ''}
  }
}

// Loaded Plugin Setup

[
  require('postcss-plugin1')(),
  require('postcss-plugin2')(),
  require('postcss-plugin3')(options)
]
```

## Examples
#### package.json

```json
{
 "dependencies": {
   "postcss-bem": "^0.2.2",
   "postcss-nested": "^1.0.0",
   "postcss-import": "^8.1.2"
 },
 "postcss": {
   "plugins": {
     "postcss-import": null,
     "postcss-nested": null,
     "postcss-bem": {
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
  plugins: {
    'postcss-import': null,
    'postcss-nested': null,
    'postcss-bem': {
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
{
  "plugins": {
    "postcss-import": null,
    "postcss-nested": null,
    "postcss-bem": {
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

## Usage
#### Default

```js
'use strict'

const { readFileSync } = require('fs')

const postcss = require('postcss')
const pluginsrc = require('postcss-load-plugins')()

const css = readFileSync('./index.css', 'utf8')

pluginsrc.then((plugins) => {
  postcss(plugins)
    .process(css)
    .then(result => console.log(result.css))
}))
```

#### Custom

```js
'use strict'

const { readFileSync } = require('fs')

const postcss = require('postcss')
const pluginsrc = require('postcss-load-plugins')('./path/to/postcssrc.json')

const css = fs.readFileSync('./index.css', 'utf8')

pluginsrc.then((plugins) => {
  postcss(plugins)
    .process(css)
    .then(result => console.log(result.css))
}))
```

## LICENSE

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

[deps]: https://david-dm.org/michael-ciniawsky/postcss-load-plugins.svg
[deps-url]: https://david-dm.org/michael-ciniawsky/postcss-load-plugins

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[travis]: http://img.shields.io/travis/michael-ciniawsky/postcss-load-plugins.svg
[travis-url]: https://travis-ci.org/michael-ciniawsky/postcss-load-plugins

[cover]: https://coveralls.io/repos/github/michael-ciniawsky/postcss-load-plugins/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/michael-ciniawsky/postcss-load-plugins?branch=master
