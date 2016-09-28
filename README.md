# bdd-js
> test automation exercises from  
* Amodeo's [Learning BDD with JS][1]  
* Argelius's [Mocha + Chai.js unit testing for ES6 with Istanbul code coverage][8]

____

## git quickref
####From dev branch:
..switch to master and update my local master
```
git checkout master
git pull
```

..merge master into my local dev brach, then update remote dev branch
```
git fetch  # gathers all changes from all branches
git merge origin/master # merge master into my local dev branch
git push        # push changes to my remote devBranch
```

Combine git add, rm, and commit
`git commit -a -m "commit message"`



## automated tests tools

Tool | Purpose | Reference
-----|------|----------------
node | you know, that thing it does... | [nodejs.org][2]
npm | node package manager to install libraries, manage the dependencies, define a set of build commands | [npmjs.com][6]
mocha | js test runner that can be executed from Node or from the browser | [mocha wiki][3]
chai | assertion library for mocha | [chaijs.com][4]
sinon | Standalone test spies, stubs and mocks for js. No dependencies, works with any unit testing framework. | [sinonjs.org][5]

## objectives
- write expressive assertions with chai
- create test doubles using Sinon and sinon-chai packages
- explore best practices for organizing test codebase


## initial setup  
1. create a project folder
2. create a package.json file. Run  
`npm init`  
  - see `npm help json` for docs on package.json
3. install Mocha and Chai locally to the project  
`npm install mocha chai --save-dev`  
  - this command downloads the packages and their dependencies, compiles them if necessary, stores the result in **project/node_modules**, and updates the package.json file with 'devDependencies' section.
  - the '--save-dev' argument in the install command specifies these packages for during development only.
  - use '--save' to install the packages as runtime dependencies rather than devDependencies
  - to see how the dependencies list in the package.json works, completely remove the node_modules dir and contents, then rerun npm install.  NPM reads the package.json and restores the project's dependencies.  
`$ rm -rf ./node_modules`  
`$ npm install`  

## initial steps with Mocha
- run mocha and watch it fail without tests to run  
  - to execute mocha, we need to know where NPM has installed the executable of the tool. Thus  
`./node_modules/.bin/mocha -u bdd -R spec -t 500 --recursive`  
  - call mocha in the local node_modules directory (unless mocha is installed globally, which is non-optional).
    - when installed globally, npm will not update the devDependencies of the local json file.  
- specify a test command for executing tests.
  - modify 'test' in package.json so that from then on, you need can run tests with:  
  `npm test`
- run `npm test`
  - the 'npm test' command will inspect the 'scripts' section of package.json and will execute the commands specified in 'test'
  - npm knows the tool you need is local (if the command lives in scripts/test), so it will temporarily modify PATH to include node_modules/.bin/.
  - to modify the command, update package.json and continue to use `npm test`


## setup /test/\*.js
- mocha looks for and runs js scripts in /tests/
- in root, create test dir and place test scripts inside
```
mkdir test
touch test/validator-spec.js
```

## Mocha options in CLI and mocha.opts
Create a ./test/mocha.opts file to contain the default options for mocha. Options specified in mocha.opts have less priority and will be replaced by options specified in the command line  

#### specify the test interface
`-u` or `-ui`
- The **test interface** is the set of functions used to write tests
- the default `-u bdd` includes `describe, it, context, beforeEach` etc
- other test interfaces are `qunit, exports, tdd`

#### specify the test report format
`-R` or `--reporter`
- mocha is highly configurable and allows you customize your own reports
- many report libraries for mocha
- `spec` (used here) is clear and detailed
- other test report formats: `dot, min, progress, nyan`

#### specify the timeout duration
`-t` or `--timeout`
- defines duration (in milliseconds) the time Mocha will wait for a test to finish
- default is 2 full seconds, which is too long for all but UI and end-to-end tests.

#### specify recursive folder search
`--recursive`
- by default, Mocha executes tests in the files that match the ./test/\*.js pattern
- `--recursive` instructs mocha to search through the specified test folder AND its subdirectories for tests to execute.

#### specify bailout on first fail
`-b` or `--bail`
- by default, Mocha runs ALL tests, even if some fail.
- `--bail` says, stop all tests at first fail

#### specify a watcher to launch mocha upon detected changes
`-w` or `--watch`
- after test runs, it remains active, watching for a change in the current working directory
- upon change, it re-executes all tests
- useful enough to add it to 'scripts' in package.json  
`"watch": "mocha --ui bdd --reporter spec --timeout 500 --recursive --watch"`
- to execute Mocha in **watch** mode:  
`npm run-script watch`
- run any test from 'scripts' using  
`npm run-script <script name>`
- or shorthand with the alias:
`npm run`

### the test cycle and its descriptive suites
- the `describe()` function creates a new **test suite**
- where **test suite** is defined as a grouping of test cases
- first parameter = a description string
- 2nd parameter = a function that contains the test cases
- **best practice** is to use the name of the unit being tested in the description string
```
describe('Description string', function(){  
      });
```
### the test suite and ITS test cases
- `it()` function contains
  - the **description** of the actual test case, which will be used in the report AND
  - and it contains the function with the code of the test.
- its important that the description of the test suite and the description of the test case be coherent when read together. The test reporter will concatenate these descriptions to provide a readable explanation of the test
```
A validator
    1) will return error.nonpositive for not strictly positive numbers
```

### assertions and their libraries
`assert` is a standard node package with standard set of assertions (ie `assert.equal, assert.deepEqual`)
- assertions will throw an assertion error if the result is not expected

#### assert.equal
- uses == operator to test
- compares simple values

#### assert.deepEqual
- compares contents of the array rather than simple values

## Hello to Chai and its DSL
4 out of 5 devs surveyed approve of this assertion library

### Chai's Domain Specific Language  
Chains, Assertions, Flags  
>`expect(5).to.be.deep.equal(5)`

#### Chains
Chains are DSL particles that help express an assertion. They do not change the assertion's behavior.  
>`to, be, been, is, that, and, has, have, with, at, of, same`  

ex -> `expect('jaylab').to.be.a('string')`

#### Assertions  
Assertions are DSL particles that perform the check of the result.   
Assertions are normally functions that take 1 or more parameters with expected result
> `equal` asserts === equality of type and value  
`below` asserts the given is less than the expected  
`exist` asserts something is present

ex -> `expect(10).to.be.below(1000)`

#### Flags  
Flags modify an assertion's behavior
> `deep` modifies `equal` to check the contents of the result  
`not` inverts an assertion    

ex -> `expect(undefined).not.to.exist`

#### Assertion or Flag?  
Some particles have dual duties  
> `include, contain, length`  

`include` as flag to modify the `keys` assertion:
> `expect({ name: 'Jason', age: 45 }).to.include.keys('age');`  


`length` as assertion:
> `expect([1, 2, 3]).to.have.length(3);`

`length` as flag:  
> `expect([1, 2, 3]).to.have.length.of.at.least(2);`

#### Merge Assertions  
From this:
> `expect(anArray).to.have.length(2);`  
`expect(anArray).to.contain('element');`

To this:  
> `expect(anArray).to.have.length(2).and.to.contain('element');`

## Describe / Context / It
#### Describe - (the feature)
Use `describe` to defines features and actions.  
Use the feature-under-test as the **title** of the describe function.  

#### Conext - (of execution path)
Use `context` to define each scenario  
Use one `context` function for each **scenario** of a feature.  
* A **scenario** defines a different execution path of the same feature.
* **Scenarios** describe what happens with different inputs   
* Since one feature defines only one operation on the system, different **scenarios** can vary only in their setup or in the inputs of the operation.  

#### It - (specific input)  
Use `it` for assertions or tests with specific inputs



-----------------

## BDD Test Guidelines (describe/it)  
[from this great post on yeoman.io][7]  
#### EACH Test must start with a clean slate
* `beforeEach` instead of `before`  
* reinstantiate objects before running each `it` block  
* create every file requred by a test in a `beforeEach`
* reset any side effects done in test environment after each test

#### EACH test must be runnable in isolation  
* Each test must pass if they're run alone. To run a single test:  
`mocha test.js --grep 'test name'`

#### Stub most performanc heavy operations  
* when possible, stub networkds or other long operations
* use sinon.js for most stubbing needs

#### Naming Conventions
* `describe` blocks should cover three types of info:
     * Object to be tested
     * method/property
     * circumstantial group (ie 'when this')
* `it` blocks cover assertions
     * they should use as few lines of code as possible
     * there should be as many `it` blocks as there are assertions on a method
* Instance methods and properties should be prefixed by a bang sing  
eg `#find()`

* Static methods and properties should be prefixed by a dot  
eg `.exclude()`  

```
// Given this object
function Class() {
  this.args = nopt();
};
Class.exclude = function () {};
Class.name = 'Yeoman';
Class.prototype.find = function () {};

// We'd have this test structure
describe('Class', function () {
  describe('.exclude()', function () {});
  describe('.name', function () {});
  describe('#find()', function () {});
  describe('#args', function () {});
});
```
* methods should end using paranthesis, but should not include expected parameters
     * parameters should be covered in documentation comments
* `it` blocks should be declaritive

```
// BAD
it ('should find generators');

// GOOD
it ('find generators');
```

#### Assertions
* Don't add `message` to asserions unless the error thrown makes it unclear what failed
* if you must add a messsage, describe expected outcome and why it failed. Remember, these messages are the error message thrown with the failure.  Let those be useful in these occasions.  For example

```
// BAD
assert(Generator.appname, 'Generator has an 'appname' property');

// GOOD
assert(Generator.appname, 'Expected Generator to have an 'appname' property');
```

#### Stylistic Pref
##### `.bind()` throwing assertions
* when testing that a method throws with invalid parameters, bind the parameters rather than create an anonymous function

```
// BAD
assert.throws(function() {
     class.method('Invalid param');
});

// GOOD
assert.throws(class.method.bind(class, 'Invalid param'));
```









_______________


### setup for new users
1. clone repo from github
2. run `nmp install`

------------------

## Ref and Tutorials
* [Mocha + Chai.js unit testing for ES6 with Istanbul code coverage][8]
* [ANDREAS ARGELIUS's tutorials code on github][10]
* [Unit Test Your JavaScript Using Mocha and Chai][9]

[1]:https://www.amazon.com/Learning-Behavior-driven-Development-JavaScript-Enrique/dp/1784392642
[2]:https://nodejs.org/en/
[3]:https://github.com/mochajs/mocha/wiki
[4]:http://chaijs.com/
[5]:http://sinonjs.org/
[6]:https://www.npmjs.com/
[7]:http://yeoman.io/contributing/testing-guidelines.html
[8]:http://onsen.io.s3-website-us-east-1.amazonaws.com/blog/mocha-chaijs-unit-test-coverage-es6/
[9]:https://www.sitepoint.com/unit-test-javascript-mocha-chai/
[10]:https://github.com/argelius/chai-es6-sample
