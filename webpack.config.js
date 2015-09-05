module.exports = {
  entry: {
    app: "./js/app.js"
    //app: "./src/sample/app.js"
  },
  output: {
    filename: "./build/app.js"
    //filename: "./dest/app.js"
  },
  // source-mapを出力
  devtool: "#source-map",
  module: {
    // ローダ設定
    loaders: [
      {test: /\.js$/, loader: "babel",
      query: {stage: 0, plugins: ['./build/babelRelayPlugin']}
      }
    ]
  },
  resolve: {
    // requireやimport時の拡張子を省略
    extensions: ['', '.js', '.jsx']
  },
};