#ccMobile Server

A mobile project for ccreadbible.org website (SERVER)	

## Installation

Please make sure you have "npm" installed.  
In project root directory, run  
1. npm install  

## Usage

### Run the app
run *nodemon index.js*

### See code with comments side by side
run *gulp docco*, files are generated under /docs


##Directory Structure
cornerstone/  
----- api/        
---------- common/     
--------------- index.js          //defined common functions
---------- homily/
--------------- index.js
---------- readings/
--------------- index.js
---------- routes.js        //dispatch routes 
----- archive/        //store program generated files  
----- config/        //ionic file  
----- node_modules/        //dependencies stated in package.json  
----- index.js        //entry file
----- .gitignore        //files you don't wish to push to remote repository   
----- package.json        //list dependencies  
----- gulpfile.js         
----- README.md  

##Dependencies

"body-parser": "^1.10.0"
"cheerio": "^0.18.0"
"colors": "^1.0.3"
"express": "^4.10.6"
"gulp": "^3.8.10"
"lodash": "^2.4.1"
"mocha": "^2.0.1"
"node-schedule": "^0.2.6"
"q": "^1.1.2",
"request": "^2.51.0"

##Dev Dependencies:
"gulp-concat": "^2.4.2"
"gulp-docco": "0.0.4"
"gulp-jsdoc-to-markdown": "^0.1.5"
"gulp-mocha": "^2.0.0"

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request
