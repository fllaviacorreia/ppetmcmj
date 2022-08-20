// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
// const jsoMetroPlugin = require('obfuscator-io-metro-plugin')(
//     {
//       compact: false,
//       sourceMap: true,
//       controlFlowFlattening: true,
//       controlFlowFlatteningThreshold: 1,
//       numbersToExpressions: true,  
//       simplify: true,
//       shuffleStringArray: true,
//       splitStrings: true,
//       stringArrayThreshold: 1,
//     },
// );

// module.exports = {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: false,
//         },
//       }),
//     },
//     ...jsoMetroPlugin,
//   };


module.exports = getDefaultConfig(__dirname);
