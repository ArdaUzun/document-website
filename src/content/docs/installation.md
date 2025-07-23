---
title: 'Installation Guide'
author: 'arda'
---

## Prerequisites

Before you can run the Product Health Scanner, you'll need to have the following software installed on your system:

1. **Node.js** (version 16 or higher)
2. **npm** (usually comes with Node.js)
3. **Git** for version control
4. **Android Studio** or **Xcode** for mobile development (depending on your target platform)
5. **React Native CLI** (installed globally)

For Android development:
- Android SDK
- Android Virtual Device (AVD) for testing

For iOS development (macOS only):
- Xcode
- CocoaPods

## Getting the Source Code

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd product_health_analysis/ProductScanner
```

## Installing Dependencies

Install the project dependencies using npm:

```bash
npm install
```

This will install all the required packages listed in `package.json`.

## Environment Variables

The application requires certain environment variables to be set, particularly for AI services:

1. Create a `.env` file in the root of the `ProductScanner` directory
2. Add the following variables:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Note: For a production environment, you would also need API keys for other services like Google Vision API.

## Running the Application

### Development Server

To start the development server:

```bash
npm start
```

This will start the React Native packager.

### Running on Android

To run the application on an Android emulator or device:

```bash
npm run android
```

Make sure you have an Android emulator running or an Android device connected via USB with debugging enabled.

### Running on iOS (macOS only)

To run the application on an iOS simulator or device:

```bash
npm run ios
```

This will open the iOS simulator and launch the application.

### Running in Web Browser

The application also supports running in a web browser:

```bash
npm run web
```

This will start a development server and open the application in your default browser.

## Building for Production

### Android

To build an Android APK:

```bash
cd android
./gradlew assembleRelease
```

The APK will be located in `android/app/build/outputs/apk/release/`.

### iOS (macOS only)

To build an iOS app:

```bash
cd ios
xcodebuild -workspace TempProject.xcworkspace -scheme TempProject -configuration Release -destination 'generic/platform=iOS' -archivePath TempProject.xcarchive archive
```

### Web

To build a web version:

```bash
npm run web:build
```

The built files will be in the `dist` directory.

## Troubleshooting

### Common Issues

1. **Metro Bundler Issues**
   - Clear the cache: `npm start -- --reset-cache`
   - Restart the development server

2. **Android Build Issues**
   - Ensure Android Studio and SDK are properly installed
   - Check that environment variables like `ANDROID_HOME` are set correctly

3. **iOS Build Issues (macOS only)**
   - Run `cd ios && pod install` to install/update CocoaPods dependencies
   - Make sure Xcode is up to date

4. **Dependency Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

### Useful Commands

- `npm run lint` - Run ESLint to check for code style issues
- `npm run lint:fix` - Automatically fix some code style issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run the test suite

## Next Steps

After successfully installing and running the application, you might want to:

1. Explore the [Development Guide](development.md) to understand how to contribute to the project
2. Review the [Testing Guide](testing.md) to learn how to run and write tests
3. Check out the [API Reference](api.md) to understand the available services and components