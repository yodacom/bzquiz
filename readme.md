#How to Setup Webpack

##Install Webpack
Begin by installing the latest version of webpack in your project directory.

```
npm install webpack  --save-dev
```

Add a **scripts** section to your _package.json_ file.

```
  "scripts": {
        "build": "webpack",
        "start": "node_modules/.bin/webpack-dev-server"
  }
```
##Configuration
Create a file named webpack.config.js in the root of your project. Add basic entry point and output file to the config:

```javascript 1.6
var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: "./js/app.js",
    output: {
        path: "/build",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /styl$/,
            loader: ['style-loader', 'css-loader', 'stylus-loader']
        }]
    },

};

```

##Dependencies
There are several packages that will be necessary. Add the following to the devDependencies section of your _package.json_ file.

```javascript 1.6
    "css-loader": "^0.26.1",
    "style-loader": "^0.13.1",
    "stylus-loader": "^2.4.0",
    "webpack-dev-server": "^2.3.0"
```

then run

```javascript 1.6
npm install
```

##Explanation
The webpack configuration simply says to use the stylus loader to handle any file that ends with the name **.styl**.
In order to simplify this it would be best to create a stylus file that includes the others.

###main.styl
Create a new file named **main.styl** and add import statements for your other stylus files.

```javascript 1.6
@import 'style.styl';
@import 'srmTable.styl';
@import 'modal.styl';
```

Then require this file in **app.js**. Add the following line to the beginning of the file.

```javascript 1.6
require('../styles/main.styl');
```

###jQuery
You can use webpack to bundle jquery. This was done in the project.







