const path = require('path')

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin') // html处理插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包清除原dist
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); //命令行提示
const CopyWebpackPlugin=require('copy-webpack-plugin');

// module fn
const svgToMiniDataURI  = require('mini-svg-data-uri')

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename:'./js/[name].bundle.js',
    },
    mode:'development',
    module: {
        rules: [
            {
                test: /\.(css|sass)$/,
                use:[
                    { loader: 'style-loader' },
                    {
                      loader: 'css-loader',
                      options: {
                          modules: true
                      }
                    },
                    {
                      loader: 'sass-loader'  
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                      loader:'url-loader',
                      options:{
                        limit: 8192
                      }
                    }
                ]
            },
            {
                test: /\.svg$/i,
                use: 'url-loader',
                generator: {
                    dataUrl: (content) => svgToMiniDataURI(content.toString()),
                }
            },
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './public/index.html',title:'hello React'}),
        new CleanWebpackPlugin(),
        new friendlyErrorsWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: __dirname + '/public/favicon.ico', to: __dirname + '/dist' },
            ],
        })
    ],
    resolve:{
        extensions: ['.tsx','.jsx','.js']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, './dist'),
        open:false,
        hot:true,
        quiet:true,
        port:8082
    }
}