# Recario Mobile

React Native application supporting Android and iOS versions.

Keep in mind that the following files should be created:

```
android/app/google-services.json
android/app/src/main/assets/appcenter-config.json
android/app/src/main/res/values/strings.xml
ios/recario/AppCenter-Config.plist
```

Some of the exist as `*.example` files. Some not.

Also, next ENV variables should be set for Android build:

```
MYAPP_UPLOAD_STORE_FILE=/path/to/my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=
MYAPP_UPLOAD_STORE_PASSWORD=
MYAPP_UPLOAD_KEY_PASSWORD=
```
