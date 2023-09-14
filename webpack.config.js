const path = require("path");

module.exports = {
  entry: "./index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output filename
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
    },
  },
  
  target: "node", // Target environment (Node.js)
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use Babel for transpiling
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
    
  }
  
    // 
};