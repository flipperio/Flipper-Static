# Flipper Static
Static frontend contents of Flipper.

## Building
#### 0. `npm install`
You won't get vary far if you don't do this.

#### 1. Define necessary environment variables
Before building you must create a `.env` file, containing the necessary environment variables, in the root directory. See the `.env.example` file for which variables must be sepcified in the `.env file`.  

#### 2. Set the correct `NODE_ENV` variable
* If building for production set the `NODE_ENV` environment variable to `production`.
* If building for development, just set `NODE_ENV` to anything but `production`. Development build is the default.

#### 3. Built it
* Run `npm run build:js` to build the JavaScript.
* Run `npm run build:css` to build the CSS. Add `-- --output-style compressed` to generate compressed CSS.

## Testing localy
Run `npm run run:server` to run a local server *(using [webpack-dev-server](https://github.com/webpack/webpack-dev-server))*. The local server will be run on the `PORT` variable specified in the `.env` file.
