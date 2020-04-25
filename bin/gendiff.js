#!/usr/bin/env node

const { program } = require('commander');

program
.version('1.0.0')
.description('Compares two configuration files and shows a difference.')
.arguments('<firstConfig> <secondConfig>')
.action((firstConfig, secondConfig) => {
    console.log('do somthing');
  })

program
.option('-f, --format [type]', 'output format')
.parse(process.argv);
