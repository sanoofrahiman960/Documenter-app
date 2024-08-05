// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
// import { Icon } from '@rneui/themed';

import FilePicker from '../Screens/FileUpload/FilePicker';
import { useDispatch, useSelector } from 'react-redux';
import UploadedFiles from '../Screens/UploadedFiles/UploadedFiles';
import Landingpage from '../Screens/LandingPage/Landingpage';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen: React.FC = () => {
    const SavedFiles = useSelector((state: any) => state.backend.files)
    console.log("savedfiles", SavedFiles)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
};

const SettingsScreen: React.FC = () => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings Screen</Text>
        </View>
    );
};
const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: {
                // backgroundColor: '#34aeeb',
                height: 80
                // Background color for the TabBar
            },
            tabBarActiveTintColor: '#34aeeb', // Active icon/text color
            // tabBarInactiveTintColor: '#b0bec5', // Inactive icon/text color
            tabBarLabelStyle: {
                fontSize: 14, // Font size for the label
                fontWeight: 'bold', // Font weight for the label
                paddingBottom: 5, // Padding bottom for the label
            },
            // tabBarActiveTintColor: '#FFD700', // Active icon/text color (gold)
            tabBarInactiveTintColor: "#000"

        }}

    >


        <Tab.Screen
            name="FilePicker"
            component={FilePicker}
            options={{
                tabBarLabel: 'Files',
                tabBarIcon: ({ color, size }) => (
                    <Icon name='document' color={"#34aeeb"} size={35} />
                ),
                headerShown: false,
                tabBarInactiveTintColor: "black",


            }}
        />
        <Tab.Screen name="Home" component={UploadedFiles}
            options={{
                tabBarLabel: 'Uploaded',
                tabBarIcon: ({ color, size }) => (

                    <Icon name="cloud-upload-outline" color={"#34aeeb"} size={35} />
                ),
                headerShown: false
            }}


        />
    </Tab.Navigator>
)


const Navigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="LandingPage"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="LandingPage" component={Landingpage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
