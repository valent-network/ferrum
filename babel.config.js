module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      "extensions": [".ios.js", ".android.js", ".js", ".json"],
      "root": ["./src"],
      "alias": {
        "actions": "./src/actions",
        "assets": "./src/assets",
        "services": "./src/services",
        "components": "./src/components",
      }
    }]
  ],
};
