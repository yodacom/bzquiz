This app is designed to help craft beer drinkers improve their tasting and judgement of the key attributes of any beer - color, hoppyness, bitterness, and alcohol content. 

A unique aspect of the app is that in the past bitterness was equated with hoppyness but recent developments in the crafting of beer has blurred the lines with this measurment. Brewers have started to add hops and other ingredients later in the brewing process. This has created a more hoppy flavor to the beer without the corresponding bitterness as measured by IBU. 

We intend to collect users Hoppyness judgement over time and compare and contrast that with IBU bitterness scale, over time, on the beers they judge.  We will collect these ratings into a BZH rating or Beer Zap Hoppiness rating for each beer judged and add this to the open source database on beers. 

Users of the app select a beer to taste, judges each of these attributes, and then the app will compare their answers to the actual answers as provided by the brewery (if they are available).  The app then calculates the results and gives an evaluation.  The user should be able to improve their tasting skills over time.

The app uses a remote API for the beer attibutes and is dependent on jquery, stylus, and s-grid (a flexbox stylus grid system).  The app also uses Webpack and Gulp to manage the initalization of the app for use and production.

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

```
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

```
    "css-loader": "^0.26.1",
    "style-loader": "^0.13.1",
    "stylus-loader": "^2.4.0",
    "webpack-dev-server": "^2.3.0"
```

then run

```
npm install
```

##Explanation
The webpack configuration simply says to use the stylus loader to handle any file that ends with the name **.styl**.
In order to simplify this it would be best to create a stylus file that includes the others.

###main.styl
Create a new file named **main.styl** and add import statements for your other stylus files.

```
@import 'style.styl';
@import 'srmTable.styl';
@import 'modal.styl';
```

Then require this file in **app.js**. Add the following line to the beginning of the file.

```
require('../styles/main.styl');
```

###jQuery
You can use webpack to bundle jquery. This was done in the project.

##Running and building
To build for deploy

```
npm run build

```

To run the development server

```
npm run start
```







