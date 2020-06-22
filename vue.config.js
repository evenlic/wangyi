const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  css: {
		loaderOptions: {
			postcss: {
				plugins: [
					require('postcss-px2rem')({
						remUnit: 75
					})
				]
			}
		},
	},
	chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets',resolve('src/assets'))
	},
	devServer: {
    proxy: {
        '/api': {     
            target: 'http://localhost:3001',  
            ws: true,        
						changeOrigin: true,  
						pathRewrite:{
							'^/api':''
						}
				},
				'/abc':{
						target: 'https://m.you.163.com',  
            ws: true,        
						changeOrigin: true,  
						pathRewrite:{
							'^/abc':''
						}
				}
    }
  }
}