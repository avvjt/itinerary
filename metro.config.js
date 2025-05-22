const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

//Path must be targeted to globals.css file!
module.exports = withNativeWind(config, { input: './app/globals.css' })