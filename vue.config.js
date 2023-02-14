
const webpack = require('webpack')
module.exports = {
    // pages:{
    //     index:{
    //         entry:'src/pages/BlogList'
    //     }
    // },
    devServer:{
        open:true
    },
    chainWebpack: config => {
		config.plugin('provide').use(webpack.ProvidePlugin, [{
            'window.Quill': 'quill/dist/quill.js',
            'Quill': 'quill/dist/quill.js'
	    }]);
        config.module
      .rule("css")
      .test(/\.css$/)
      .oneOf("vue")
      .resourceQuery(/\?vue/)
      .use("px2rem")
      .loader("px2rem-loader")
      .options({
      // 设置px转化为rem比例，设计稿大小为1920，比例 1920/ 10
        remUnit: 192
      });
	}
}