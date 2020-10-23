# **Gendiff.js**
**FRONTEND-PROJECT Lvl 2**

### Hexlet tests and linter status:
![Actions Status](/workflows/hexlet-check/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/85303ccfa256cfbe3cdb/maintainability)](https://codeclimate.com/github/alex-kurkov/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/85303ccfa256cfbe3cdb/test_coverage)](https://codeclimate.com/github/alex-kurkov/frontend-project-lvl2/test_coverage)
[![Node CI](https://github.com/alex-kurkov/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/alex-kurkov/frontend-project-lvl2/actions)

### **Content**
  - [Installation](#installation)
  - [Getting Help](#getting-help)
  - [Usage](#Usage)
  - [Setting output format](#Setting-output-format)
  - [Supported file types](#Supported-file-types)
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
Example of [json output](https://asciinema.org/a/1667udLqWTVRN0sHhdWuSzcD5)

or may be specified as the *third* parameter when used as a js-library function. In this case it should be `string`
```js
import genDiff from 'gendiff';

const diff = genDiff(filepath1, filepath2, 'plain');
console.log(diff);
```
Gendiff supports output in `json`, `stylish` or `plain` formats. `stylish` is set by default. Example of [`plain` and 'stylish' output](https://asciinema.org/a/LhSpGzdBAzrnlUW9rD1ZCAeIU)

## Supported file types
Gendiff supports `json` `yml` `yaml` files
(example comparing `yaml` files [ASCIINEMA](https://asciinema.org/a/2CkYibYuvyxenPjyTCzd8qjBX))

Formats supported are `'json'`, `'yaml'`, `'yml'`, `'text'`
The default format is `'text'`

 
--------
[connect me via email](mailto:alexkourkov@yandex.ru "Email")
