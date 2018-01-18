var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    devtool: 'source-map',
    entry: {
        /* List of npm modules that must go into vendor bundle.
        Check CommonsChunkPlugin to avoid duplicate modules in vendor and app bundles
        */
        bundle: './src/index.js',
        vendor: ['react', 'redux', 'react-dom', 'axios'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        //Chunk hash used for cache busting, Add manifest in CommonsChunkPlugin!!
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    module: {
        rules: [{
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                    },
                }, ],
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                //You can use style-loader instead of ExtractTextPlugin to inject css as a style tag into html document
                //use: ['style-loader', 'css-loader']
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?sourceMap', 'sass-loader?sourceMap'],
                }),
                test: /\.(css|scss)$/,
            },
            {
                test: /\.(jpg|jpeg)/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 40000,
                        },
                    },
                    'image-webpack-loader',
                ],
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('styles[contenthash].css'),
        //Commons Chunk Plugin to specify not to duplicate the modules
        //between vendor and app bundle. If common put it in the vendor module
        //as mentioned in the names array
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        //Use src/index.html as template and add all the bundles in a script tag automatically
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ],
};

if (process.env.NODE_ENV === 'production') {
    console.log('Building for production....');
    console.log('Will use uglify and also set NODE_ENV');
    config.plugins.push(
        new webpack.DefinePlugin({
            // set node_env for libraries to use production / dev versions
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            // eslint-disable-line
            sourceMap: true, //using source maps in production
        })
    );
}
module.exports = config;