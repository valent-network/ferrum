# recar.io Mobile

React Native application for [Android](https://play.google.com/store/apps/details?id=com.viktorvsk.recario&pli=1) and [iOS][https://apps.apple.com/us/app/id1458212603].
See what your friends sell, what friends of their friends sell and even more!
Build local economy by trading confidently with people you know or can get a real recommendation for.
Its currently working only for used cars and only in Ukraine but a lot of things are planned, stay tuned!

## Install and build

Following files should be created:

```
android/app/google-services.json
android/app/src/main/assets/appcenter-config.json
android/app/src/main/res/values/strings.xml
ios/recario/AppCenter-Config.plist
```

Following variables should be set (i.e. in `~/.gradle/gradle.properties`):

```
MYAPP_UPLOAD_STORE_FILE=/path/to/my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=recario
MYAPP_UPLOAD_STORE_PASSWORD=Your-Password
MYAPP_UPLOAD_KEY_PASSWORD=Your-Password
```
