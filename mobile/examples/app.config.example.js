/**
 * Example Mobile App Configuration for AdMob
 * app.config.js or app.json for Expo projects
 */

const ADMOB_APP_IDS = {
  ios: process.env.ADMOB_IOS_APP_ID || 'ca-app-pub-3940256099942544~1458002511',
  android: process.env.ADMOB_ANDROID_APP_ID || 'ca-app-pub-3940256099942544~3347511713',
};

module.exports = {
  expo: {
    name: "predictify-sports",
    slug: "predictify-sports",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.predictify.sports"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.predictify.sports"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "react-native-google-mobile-ads",
        {
          androidAppId: ADMOB_APP_IDS.android,
          iosAppId: ADMOB_APP_IDS.ios,
        }
      ]
    ]
  }
};
