# **Gendiff.js**
**FRONTEND-PROJECT Lvl 2**

### Hexlet tests and linter status:
![Actions Status](/workflows/hexlet-check/badge.svg)

[![Maintainability](https://api.codeclimate.com/v1/badges/85854609ef666849c490/maintainability)](https://codeclimate.com/github/alex-kurkov/frontend-project-lvl1/maintainability)
![Node.js CI](https://github.com/alex-kurkov/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg)



### **Content**
---------------------

Gendiff is a simple application comparing and showing difference between 2 configuration files. 
Gendiff can be used either as a js-library or as a Cli-utility run on Node.js

## Installation
- To install locally clone repository to your directory
```bash
git clone https://github.com/alex-kurkov/frontend-project-lvl2.git
```
- Run 
```bash
cd frontend-project-lvl2
npm install
npm link
```

After local installation to use as a js-library import gendiff in your js-module
```js
import genDiff from 'gendiff';
```

## Getting help
```bash
gendiff --help
```
or
```bash
gendiff -h
```
## Usage
When used on command line type
```bash
gendiff ./path/to/myfile1.json ./path/to/myfile2.json
```
(example [ASCIINEMA](https://asciinema.org/a/Ppb8qI7HEP8oHJkmmGSSdUgO1))

## Setting output format
Output format can be set by using `-f` or `--format` flag when using on command line
```bash
gendiff ./path/to/myfile1.json ./path/to/myfile2.json --format json
```
(example [ASCIINEMA](https://asciinema.org/a/mBU32SwyvMaYdptjJ12lrL99Q))

or may be specified as the *third* parameter when used as a js-library function. In this case it should be `string`
```js
import genDiff from 'gendiff';

const diff = genDiff(filepath1, filepath2, format);
console.log(diff);
```

Formats supported are `'json'`, `'yaml'`, `'yml'`, `'text'`
The default format is `'text'`

 
--------
[connect me via email](mailto:alexkourkov@yandex.ru "Email")
