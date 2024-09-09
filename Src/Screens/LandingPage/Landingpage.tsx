import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image } from '@rneui/themed/dist/Image'
import { ref } from 'firebase/storage'


const Landingpage: React.FC = () => {
    const navigation = useNavigation()
    const [CartItems, SrtCartitems] = useState([])
    const [selecteditem, setselecteditem] = useState([])
    const [refs, setrefs] = useState(false)
    const [product, Setproduct] = useState([

        { title: "pencil", disc: "writing" },
        { title: "sketch", disc: "draw" },
        { title: "pen", disc: "essay" },
        { title: "food", disc: "eat" },
        { title: "cycle", disc: "cycling" },

    ])


    // const refreshControl = () => {
    //     if (product.length === 0) {
    //         Setproduct(CartItems);
    //         SrtCartitems([]);
    //     }
    //     setrefs(false);
    // }

    useEffect(() => {
        const timer = setTimeout(() => {
            //@ts-ignore
            navigation.navigate('Plan');
        }, 2000)
        return () => clearTimeout(timer);
    }, [])

    // const AddingToCart = (item: any, index: any) => {


    //     console.log("item", item, index)
    //     const temp = [...CartItems]
    //     //@ts-ignore
    //     temp.push(item)
    //     SrtCartitems(temp)

    //     // const data = product.filter((it) => it.title == item.title)
    //     const data = product.splice(index, 1)
    //     // console.log("data", data)
    //     // Setproduct(data)

    // }







    // const renderitem = ({ item, index }: any) => {
    //     return (

    //         <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 10, padding: 5, borderBottomWidth: 0.5, backgroundColor: "red" }}>
    //             <View style={{ width: "30%", alignItems: "center" }}>

    //                 <Text>
    //                     {item?.title}
    //                 </Text>
    //             </View>
    //             <View style={{ width: "30%", alignItems: "center" }}>

    //                 <Text>
    //                     {item?.disc}
    //                 </Text>
    //             </View>
    //             <View>
    //                 <TouchableOpacity onPress={() => { AddingToCart(item, index) }} style={{ backgroundColor: "green", width: 100, alignItems: "center", }}>
    //                     <Text>
    //                         Add
    //                     </Text>
    //                 </TouchableOpacity>
    //             </View>

    //         </View>


    //     )




    // }


    return (

        <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>


            <Image
                source={require('../../Asset/download.png')}
                style={{ width: 300, height: 300 }}
                resizeMode="contain"
            />


        </View>



        // <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>







        //     <FlatList
        //         style={{ width: "100%", height: 200 }}
        //         data={product}
        //         keyExtractor={({ _, item }: any) => item?.title}
        //         renderItem={renderitem}

        //         onRefresh={refreshControl}
        //         refreshing={refs}


        //     />


        //     <View>
        //         {
        //             CartItems.map((item1: any) => {
        //                 return (
        //                     <View style={{ flexDirection: "row" }}>

        //                         <View style={{ width: "30%", alignItems: "center" }}>

        //                             <Text>
        //                                 {item1.title}
        //                             </Text>
        //                         </View>
        //                         <View style={{ width: "30%", alignItems: "center" }}>

        //                             <Text>
        //                                 {item1?.disc}
        //                             </Text>
        //                         </View>


        //                     </View>


        //                 )


        //             })

        //         }

        //     </View>

        // </View>

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