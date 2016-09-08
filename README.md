# bdd-js
> test automation exercises from Amodeo's [Learning BDD with JS][1]  

____

## highlights
- test command for this project set via npm: `testit`

## automated tests using

Tool | Purpose | Reference
-----|------|----------------
node | you know, that thing it does... | [nodejs.org][2]
npm | node package manager to install libraries, manage the dependencies, define a set of build commands | [npmjs.com][6]
mocha | js test runner | [mocha wiki][3]
chai | assertion library for mocha | [chaijs.com][4]
sinon | Standalone test spies, stubs and mocks for js. No dependencies, works with any unit testing framework. | [sinonjs.org][5]

## objectives
- write expressive assertions with chai
- create test doubles using Sinon and sinon-chai packages
- explore best practices for organizing test codebase


## setup
1. create a project folder
2. create a package.json file. Run  
`npm init`  
  - see `npm help json` for docs on package.json
3. install Mocha and Chai locally to the project  
`npm install mocha chai --save-dev`  
  - this command downloads the packages and their dependencies, compiles them if necessary, stores the result in **project/node_modules**, and updates the package.json file with 'devDependencies' section.
  - the '--save-dev' argument in the install command specifies these packages for during development only.
  - to see how the dependencies list in the package.json works, completely remove the node_modules dir and contents, then rerun npm install.  NPM reads the package.json and restores the project's dependencies.  
`$ rm -rf ./node_modules`  
`$ npm install`  
4.

[1]:https://www.amazon.com/Learning-Behavior-driven-Development-JavaScript-Enrique/dp/1784392642
[2]:https://nodejs.org/en/
[3]:https://github.com/mochajs/mocha/wiki
[4]:http://chaijs.com/
[5]:http://sinonjs.org/
[6]:https://www.npmjs.com/
