# **Gendiff.js**
**FRONTEND-PROJECT Lvl 2**

### Hexlet tests and linter status:
![Actions Status](/workflows/hexlet-check/badge.svg)

[![Maintainability](https://api.codeclimate.com/v1/badges/85854609ef666849c490/maintainability)](https://codeclimate.com/github/alex-kurkov/frontend-project-lvl1/maintainability)
[![Node.js CI](https://github.com/alex-kurkov/frontend-project-lvl1/workflows/Node.js%20CI/badge.svg)](https://github.com/alex-kurkov/frontend-project-lvl1/actions)



### **Content**
---------------------

Gendiff is a simple application comparing and showing difference between 2 configuration files. 
Gendiff can be used either as a js-library or as a Cli-utility run on Node.js

1. **Installation**
- Clone repository to your directory with command git clone https://github.com/alex-kurkov/frontend-project-lvl2.git
- Run `cd frontend-project-lvl2/`
- Run `npm install`
- Run `npm link`

To use as a js-library import gendiff in your js-module
>> `import genDiff from 'gendiff';`

2. **Getting help** \
run `gendiff -h` or `gendiff --help`

3. **Usage**
When used on command line type
>> `gendiff ./path/to/myfile1.json ./path/to/myfile2.json`

(example [ASCIINEMA](https://asciinema.org/a/Ppb8qI7HEP8oHJkmmGSSdUgO1))

4. **Setting output format** \
Output format can be set by using `-f` or `--format` flag when using on command line
>> `gendiff ./path/to/myfile1.json ./path/to/myfile2.json --format json`

(example [ASCIINEMA](https://asciinema.org/a/mBU32SwyvMaYdptjJ12lrL99Q))

or may be specified as the *third* parameter when used as a js-library function. In this case it should be `string`
>> `import genDiff from 'gendiff';`\
>> \
>> `const diff = genDiff(filepath1, filepath2, format);`\
>> `console.log(diff);`

Formats supported are `'json'`, `'yaml'`, `'yml'`, `'text'`
The default format is `'text'`

 
--------
[connect me via email](mailto:alexkourkov@yandex.ru "Email")
