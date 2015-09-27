ArnoldC.js
==========

A port of the [ArnoldC](https://github.com/lhartikk/ArnoldC) programming language to javascript.

To get started, check out the [online demo](http://22222.github.io/ArnoldC.js/).


Quick Start
------------
Download and reference the latest version of the library: [uncompressed](https://raw.githubusercontent.com/22222/ArnoldC.js/master/dist/arnoldc.js) or [compressed](https://raw.githubusercontent.com/22222/ArnoldC.js/master/dist/arnoldc.min.js).  

Everything is in one javascript file with no dependencies.

To execute some ArnoldC code: 

```javascript
arnoldc.transpileToJsAndExecute("IT'S SHOWTIME\nTALK TO THE HAND \"hello world\"\nYOU HAVE BEEN TERMINATED")
```

You can also generate javascript code without executing it:

```javascript
var js = arnoldc.transpileToJs("IT'S SHOWTIME\nTALK TO THE HAND \"hello world\"\nYOU HAVE BEEN TERMINATED")
```


Syntax
------
The goal of this library is to exactly emulate the real [ArnoldC](https://github.com/lhartikk/ArnoldC) project.  So all of the documentation for the syntax in that project should apply to this one too.

Here's what a Hello World program looks like:

	IT'S SHOWTIME
	TALK TO THE HAND "hello world"
	YOU HAVE BEEN TERMINATED


Build
-----
The output of the build process is included in this repository in the `dist` directory.  So you only need to build the project if you want to make any modifications.

This project is written in [TypeScript](http://www.typescriptlang.org/) and uses [PEG.js](http://pegjs.org/) to generate its parser.  The build process requires [Node](https://nodejs.org/en/) with [npm](https://www.npmjs.com/) and [Gulp](http://gulpjs.com/).

To build the project, first install the development npm dependencies as specified in the project.json file:

    npm install

Then run the default gulp task to build everything to a `target` directory, run the unit tests, and package the final js files to the `dist` directory:

    gulp
