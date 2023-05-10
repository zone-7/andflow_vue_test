const { defineConfig } = require('@vue/cli-service')
const path = require('path');
function resolve(dir){
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  pages: {
    index:{
      entry: 'src/main.js',
      template: 'public/index.html',
      fileName: 'index.html'
    }
  },
  chainWebpack: config => {
    config.module.rule('js')
    .include.add(resolve('packages')).end()
    .use('babel').loader('babel-loader').tap(options=>{return options});
  },
  //如果您想生成内联样式，则需要在vue.config.js中增加
  // css: { extract: false } 
})
