// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { View, Text, Image, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
// import { Icon } from '@rneui/themed';

import FilePicker from '../Screens/FileUpload/FilePicker';
import { useDispatch, useSelector } from 'react-redux';
import UploadedFiles from '../Screens/UploadedFiles/UploadedFiles';
import Landingpage from '../Screens/LandingPage/Landingpage';
import Testing from '../Screens/Testing';
import PlanPage from '../Components/PlanPage';
import Investment from '../Components/Investment';
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

                height: 80

            },
            tabBarActiveTintColor: '#34aeeb',

            tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
                paddingBottom: 5,
            },

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
function CustomHeader({ screenName }: any) {
    return (
        <View style={styles.headerContainer}>
            <Image
                source={require('../Asset/download.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.headerLine} />
            {screenName === 'Plan' ? <View style={{ width: "30%", backgroundColor: "#f7d6b0", height: 20, alignSelf: "flex-start" }} /> : <View style={{ width: "60%", backgroundColor: "#f7d6b0", height: 20, alignSelf: "flex-start" }} />}

        </View>
    );
}
const styles = StyleSheet.create({
    headerContainer: {

        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#fff',
        padding: 5,
    },
    logo: {
        width: 100,
        height: 50,
    },
    headerTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    icon: {
        width: 25,
        height: 25,
    },
    headerLine: {
        width: '100%',
        height: 2,
        backgroundColor: '#c2c4c3',
        marginTop: 10,
    },
    planLine: {
        width: '80%',
        backgroundColor: 'blue',
    },
    investLine: {
        width: '60%',
        backgroundColor: 'green',
        alignItems: "flex-start"
    },
    additionalLine: {
        height: 2,
        marginTop: 5,
        alignItems: "flex-start"
    },
});



const Navigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="LandingPage"
                screenOptions={{
                    headerShown: true
                }}
            >
                <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="LandingPage" component={Landingpage} options={{ headerShown: false }} />
                <Stack.Screen name="Plan" component={PlanPage}
                    options={{
                        header: (props) => <CustomHeader screenName="Plan" {...props} />,
                    }}

                />
                <Stack.Screen name="Invest" component={Investment}
                    options={{
                        header: (props) => <CustomHeader screenName="Invest" {...props} />,
                    }}

                />
                {/* <Stack.Screen name="Invest" component={Investment} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
