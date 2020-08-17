const path = require('path');
const AutoprefixerPlugin = require('autoprefixer');
const CssnanoPlugin = require('cssnano')
module.exports = {
    plugins: [
        new AutoprefixerPlugin,
        new CssnanoPlugin({
            preset: 'default', 
    })
]
}