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


## steps
1. create a project folder
2. in the project folder, run `npm init`
  - `npm init` generates a package.json file
  - see 'npm help json' for docs
3. use `npm install <pkg> --save` afterward to install a package and save it as a dependency in the package.json file



[1]:https://www.amazon.com/Learning-Behavior-driven-Development-JavaScript-Enrique/dp/1784392642
[2]:https://nodejs.org/en/
[3]:https://github.com/mochajs/mocha/wiki
[4]:http://chaijs.com/
[5]:http://sinonjs.org/
[6]:https://www.npmjs.com/
