module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  entry: "./app",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
      loaders: [
          {  
              test: /\.js$/,
              exclude: 'node_modules',
              loader: 'babel',
              query: {presets: ['es2015']},
          }
      ]
  },
  target: 'node'

};
