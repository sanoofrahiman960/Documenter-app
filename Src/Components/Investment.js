import { FlatList, StyleSheet, Text, TouchableOpacity, View, Button, Modal, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { current } from '@reduxjs/toolkit';



export default function Investment() {
    const navigation = useNavigation()
    const initialData = [
        { product: "Equity(Share/Mutual funds)", i: "5", c: "10", Checked: false },
        { product: "Fixed income/Bands/Debt Mf", i: "6", c: "8", Checked: false },
        { product: "Hybrid-Balanced adavantage funds", i: "6", c: "10", Checked: false },
        { product: "Hybrid-Agggresive hybrid funds", i: "2", c: "10", Checked: false },
        { product: "Hybrid-Equity savings funds", i: "5", c: "11", Checked: false },
        { product: "Hybrid-Conservative hybrid funds", i: "5", c: "13", Checked: false },
        { product: "Gold/silver", i: "1", c: "9", Checked: false },

    ];
    const [data, setdata] = useState([
        { product: "Equity(Share/Mutual funds)", i: "5", c: "10", Checked: false },
        { product: "Fixed income/Bands/Debt Mf", i: "6", c: "8", Checked: false },
        { product: "Hybrid-Balanced adavantage funds", i: "6", c: "10", Checked: false },
        { product: "Hybrid-Agggresive hybrid funds", i: "2", c: "10", Checked: false },
        { product: "Hybrid-Equity savings funds", i: "5", c: "11", Checked: false },
        { product: "Hybrid-Conservative hybrid funds", i: "5", c: "13", Checked: false },
        { product: "Gold/silver", i: "1", c: "9", Checked: false },
    ]);
    const [selected, setSelected] = useState([])
    const [total, setTotal] = useState(0.00)
    const [offered, setOffered] = useState(0.00)
    const [refresh, setrefresh] = useState(false)
    const [search, setSearch] = useState('')
    const [filtered, SetFilteresd] = useState([])
    const [File, SetFile] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [storedValue, setStoredValue] = useState('');
    const [marketvalue, SetCurrentvalue] = useState("$ 5")
    const [Annual, SetAnnual] = useState("")
    const [visible2, setVisible2] = useState(false)

    const calculateOfferedTotal = (selectedItems) => {
        let totalOffered = selectedItems.reduce((sum, item) => {
            const offer = parseFloat(item.offer);
            const discount = (item.price * offer) / 100;
            return sum + (item.price - discount);
        }, 0);
        setOffered(totalOffered);
    };




    const Checked = (item, index) => {
        let temp = [...data];
        temp[index].Checked = !item?.Checked;

        if (temp[index].Checked) {

            selected.push(item)

        } else {
            var inde = selected.lastIndexOf(item)
            selected.splice(inde, 1)

        }

        setdata(temp);

    };

    console.log("data", data,)
    console.log("selected", selected)

    const renderitem = (({ item, index }) => {
        console.log("hh", item)
        return (
            <View style={{
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                elevation: 5,
                shadowRadius: 3.84, borderBottomWidth: 1,
                borderLeftWidth: 1, padding: 25,
                borderRightWidth: 1, borderColor: "#c2c4c3", backgroundColor: "#fff", marginVertical: 10, width: "97%", alignSelf: "center",
            }}>
                <View style={{
                    flexDirection: "row", justifyContent: "space-between", width: "97%",
                    alignSelf: "center", shadowColor: '#000',


                }}>
                    <View style={{ flex: 5 }}>
                        <Text style={{ color: "#000", fontWeight: "500" }}>{item?.product}</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: "center" }}>
                        {item?.Checked == true ?
                            <TouchableOpacity onPress={() => Checked(item, index)} style={{ height: 20, width: 20, borderColor: "grey", borderWidth: 1, backgroundColor: "#fff" }}>
                                <Icon name='checkmark' color={"orange"} size={20} />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => Checked(item, index)} style={{ height: 20, width: 20, borderColor: "grey", borderWidth: 1, backgroundColor: "#fff" }}>

                            </TouchableOpacity>

                        }
                    </View>
                </View>
                {item?.Checked == true ?
                    <View>
                        <View style={styles.percentageInputContainer}>
                            <View style={{ width: 200, alignItems: "center" }}>
                                <Text style={{ color: "#000", fontWeight: "bold" }}>Current Market Value</Text>
                            </View>
                            <View style={{ width: 100, backgroundColor: "yellow", marginHorizontal: 30 }}>
                                <View style={styles.percentageInput}>
                                    <Text>${item?.i}</Text>

                                </View>
                            </View>
                        </View>
                        <View style={styles.percentageInputContainer}>
                            <View style={{ width: 200, alignItems: "center" }}>
                                <Text style={{ color: "#000", fontWeight: "bold" }}>Regular investment/Month</Text>
                            </View>
                            <View style={{ width: 100, backgroundColor: "yellow", marginHorizontal: 30 }}>
                                <View style={styles.percentageInput}>
                                    <Text>${item?.c}</Text>

                                </View>
                            </View>
                        </View>
                    </View>


                    : null}
            </View>

        )

    })


    const searchHandler = (text) => {
        setSearch(text);

        if (text !== '') {
            const filteredData = data.filter(item =>
                item.product.toLowerCase().includes(text.toLowerCase())
            );
            setdata(filteredData);
        } else {
            setdata(initialData);
        }
    };





    console.log("search", search)
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center" }}>



            <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backButton}>
                <Icon name='chevron-back-outline' color={"#000"} size={20} />
                <Text>Back</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "flex-start", width: "100%", marginLeft: 20, marginVertical: 10 }}>
                <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>
                    Let Us Know About Your Investments
                </Text>
            </View>


            <View style={[styles.inputContainer, { borderWidth: 1, borderColor: "orange" }]}>
                <TextInput

                    placeholder='Search'
                    value={search}
                    onChangeText={searchHandler}

                />
            </View>










            <View style={{ height: "70%" }}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderitem}


                />
            </View>


            <View style={{ width: "25%", flexDirection: "row", width: "98%", justifyContent: "space-evenly", padding: 10 }}>

                <TouchableOpacity onPress={() => { setVisible2(true) }} style={{
                    width: "45%", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", padding: 10, shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    elevation: 5,
                    shadowRadius: 3.84, borderWidth: 1, borderColor: "orange"
                }}>
                    <Text style={{ color: "#000", fontWeight: "bold" }}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: "45%", alignItems: "center", justifyContent: "center", backgroundColor: "orange", padding: 10, shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    elevation: 5,
                    shadowRadius: 3.84,
                }}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Confirm</Text>
                </TouchableOpacity>
            </View>





            <Modal
                animationType="slide"
                transparent={true}
                visible={visible2}
                onRequestClose={() => {
                    setVisible2(false);
                    //setmode([])
                    console.warn("close", modalData)

                }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}

                >
                    <Pressable style={{
                        height: '70%',

                    }}
                        onPress={() => {
                            setVisible2(false)



                        }} />
                    <View

                        style={{
                            height: '30%',

                            paddingBottom: 10,
                            borderRadius: 5,
                            marginTop: 'auto',

                            paddingTop: 20,
                            backgroundColor: '#fff',
                        }}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>

                            <View>
                                <View style={{ padding: 10, width: "80%", alignItems: "center" }}>
                                    <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>Annual Increase in Existing Regular Investment Amout</Text>
                                </View>
                                <View style={styles.inputContainer1}>
                                    <TextInput
                                        style={styles.input}
                                        value={Annual}
                                        keyboardType='numeric'
                                        onChangeText={(text) => SetAnnual(text)}
                                        placeholder="Annual increase in %"
                                    />
                                </View>
                                <View style={{ height: 100, alignItems: "center", justifyContent: "center" }}>
                                    <TouchableOpacity onPress={() => {
                                        setVisible2(false)
                                        Toast.show('Successfully Completed', Toast.SHORT);
                                    }}

                                        style={{ height: "60%", width: "90%", backgroundColor: "orange", padding: 5, alignItems: "center", borderRadius: 5, justifyContent: "center" }} >
                                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "900" }}>Confirm</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>



        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 100,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'red',
        marginTop: -10,
    },
    container: {
        padding: 20,
        backgroundColor: "#fff"
    },
    backButton: {
        marginVertical: 20,
        flexDirection: "row",
        width: 70,
        height: 30, padding: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 5,
        shadowRadius: 3.84,
        borderColor: "grey",
        borderBottomWidth: 1,
        borderLeftWidth: 1, alignSelf: "flex-start", left: 20,
        borderRightWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    datePicker: {
        width: 150,
        height: 50,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 5,
        shadowRadius: 3.84,
        borderColor: "orange",
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    inputContainer: {
        marginVertical: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 5,
        shadowRadius: 3.84,
        borderColor: "#c2c4c3",
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        width: "95%"
    },
    inputContainer1: {
        marginVertical: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 3,
        shadowRadius: 3.84,
        borderColor: "#c2c4c3",
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1, alignSelf: "center",
        width: "90%", borderRadius: 5
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 5,
        marginTop: 10,
    },
    percentageInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15
    },
    percentageInput: {
        width: 150,
        height: 50,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 5,
        shadowRadius: 3.84,
        borderColor: "orange",
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    }
});