module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // react-native-worklets plugin must be listed last.
      // Required by react-native-reanimated v4 (transitive peer of expo-router).
      'react-native-worklets/plugin',
    ],
  };
};
