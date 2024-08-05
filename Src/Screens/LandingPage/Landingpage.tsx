import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image } from '@rneui/themed/dist/Image'


const Landingpage: React.FC = () => {
    const navigation = useNavigation()
    useEffect(() => {
        const timer = setTimeout(() => {
            //@ts-ignore
            navigation.navigate('Tabs');
        }, 5000)
        return () => clearTimeout(timer);
    }, [])
    return (
        <View style={styles.container}>
            <Image source={require("../../Asset/ic_notification.png")}
                style={{ width: 100, height: 100 }}
            />
            <Text style={{ fontWeight: "bold", color: "#000", fontSize: 25 }}>Documenter</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    animation: {
        width: 200,
        height: 200,
    },
});
export default Landingpage