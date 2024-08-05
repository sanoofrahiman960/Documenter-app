/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Navigation from './Src/Navigations/Navigation';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux'
import allReducers from './Src/Redux/Reducer';
import thunk from "redux-thunk"
import PushNotification from 'react-native-push-notification';



function App(): JSX.Element {


  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);

      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },


      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
      },
      onRegistrationError: function (err) {
        console.error("REGISTRATION ERROR:", err.message, err);
      },
      // @ts-ignore
      senderID: "YOUR_GCM_OR_FCM_SENDER_ID",
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.createChannel(
      {
        channelId: "default-channel-id",
        channelName: "Default Channel",
        channelDescription: "A default channel for notifications",
        soundName: "default",
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );

    // PushNotification.localNotification({
    //   channelId: "default-channel-id",
    //   title: "Test Notification",
    //   message: "This is a test notification",
    // });

  }, []);

  const store = createStore(allReducers, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>




  );
}



export default App;
