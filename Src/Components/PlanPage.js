

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
const PlanPage = () => {
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [dateOfRetirement, setDateOfRetirement] = useState(new Date());
    const [income, setIncome] = useState('');
    const [Monthlyincome, setMonthlyincome] = useState('');
    const [Name, setname] = useState('');
    const [growth, setGrowth] = useState('6');
    const [inflation, setInflation] = useState('5');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const navigate = useNavigation()

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowDatePicker(false);
        setDateOfBirth(currentDate);
    };

    const handleDateChange1 = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfRetirement;
        setShowDatePicker1(false);
        setDateOfRetirement(currentDate);
    };


    const handleContinue = () => {
        if (validateAllInputs()) {
            navigate.navigate('Invest')
        }
    };

    const validateAllInputs = () => {
        if (!income || isNaN(income) || Number(income) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid Present Monthly Income');
            return false;
        }

        if (!Monthlyincome || isNaN(Monthlyincome) || Number(Monthlyincome) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid Monthly Income needed at retirement');
            return false;
        }

        if (!Name.trim()) {
            Alert.alert('Invalid Input', 'Please enter a valid name for your retirement plan');
            return false;
        }

        const growthNum = Number(growth);
        if (isNaN(growthNum) || growthNum < 1 || growthNum > 10) {
            Alert.alert('Invalid Input', 'Please enter a valid Annual Income Growth between 1 and 10');
            return false;
        }

        const inflationNum = Number(inflation);
        if (isNaN(inflationNum) || inflationNum < 1 || inflationNum > 10) {
            Alert.alert('Invalid Input', 'Please enter a valid Inflation Rate between 1 and 10');
            return false;
        }

        return true;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString();
    };


    const validatePercentage = (text, setFunction) => {
        const num = Number(text);
        if (!isNaN(num) && num >= 1 && num <= 10) {
            setFunction(text);
        } else if (text === "") {
            setFunction("");
        } else {
            Alert.alert('Invalid Input', 'Please enter a number between 1 and 10');
        }
    };


    const validateIncome = (text, setFunction) => {
        const num = Number(text);
        if (!isNaN(num) && num >= 0) {
            setFunction(text);
        } else {
            Alert.alert('Invalid Input', 'Please enter a valid income amount');
        }
    };

    return (
        <View style={styles.container}>




            <TouchableOpacity onPress={() => {
                Toast.show('This is the first page', Toast.SHORT);
            }} style={styles.backButton}>
                <Icon name='chevron-back-outline' color={"#000"} size={20} />
                <Text>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Let's Discuss Your Retirement!</Text>


            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: 150, alignItems: "center" }}>
                    <Text>Date of Birth</Text>
                </View>
                <View style={{ width: 100, backgroundColor: "yellow", marginHorizontal: 30 }}>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={styles.datePicker}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Icon name='calendar-outline' color={"#000"} size={20} />
                            <Text style={{ left: 5 }}>{formatDate(dateOfBirth)}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={income}
                    keyboardType='numeric'
                    onChangeText={(text) => validateIncome(text, setIncome)}
                    placeholder="($) Present Monthly Income"
                />
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={dateOfBirth}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}


            <View style={styles.percentageInputContainer}>
                <View style={{ width: 150, alignItems: "center" }}>
                    <Text>Annual Income Growth</Text>
                </View>
                <View style={{ width: 100, backgroundColor: "yellow", marginHorizontal: 30 }}>
                    <View style={styles.percentageInput}>
                        <TextInput
                            style={{ width: 100 }}
                            value={growth}
                            keyboardType="numeric"
                            onChangeText={(text) => validatePercentage(text, setGrowth)}
                        />
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Icon name='pencil' color={"#000"} size={20} />
                        </View>
                    </View>
                </View>
            </View>


            <View style={styles.percentageInputContainer}>
                <View style={{ width: 150, alignItems: "center" }}>
                    <Text>Expected Inflation Rate</Text>
                </View>
                <View style={{ width: 100, backgroundColor: "yellow", marginHorizontal: 30 }}>
                    <View style={styles.percentageInput}>
                        <TextInput
                            style={{ width: 100 }}
                            value={inflation}
                            keyboardType="numeric"
                            onChangeText={(text) => validatePercentage(text, setInflation)}
                        />
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Icon name='pencil' color={"#000"} size={20} />
                        </View>
                    </View>
                </View>
            </View>


            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
                <View style={{ width: 150, alignItems: "center" }}>
                    <Text>Date Of Retirement</Text>
                </View>
                <View style={{ width: 100, backgroundColor: "yellow", marginHorizontal: 30 }}>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker1(true)}
                        style={styles.datePicker}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Icon name='calendar-outline' color={"#000"} size={20} />
                            <Text style={{ left: 5 }}>{formatDate(dateOfRetirement)}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {showDatePicker1 && (
                <DateTimePicker
                    value={dateOfRetirement}
                    mode="date"
                    display="default"
                    onChange={handleDateChange1}
                />
            )}


            <View style={[styles.inputContainer, {}]}>
                <TextInput
                    style={styles.input}
                    value={Monthlyincome}
                    keyboardType='numeric'
                    onChangeText={(text) => validateIncome(text, setMonthlyincome)}
                    placeholder="($) Enter monthly income needed if you retire today"
                />
            </View>


            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={Name}
                    onChangeText={setname}
                    placeholder="Name your retirement plan"
                />
            </View>
            <View style={{ height: 300, alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={handleContinue}

                    style={{ height: 40, width: "95%", backgroundColor: "orange", padding: 5, alignItems: "center", justifyContent: "center" }} >
                    <Text style={{ color: "#fff" }}>Confirm</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

// Style Definitions
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff"
    },
    backButton: {
        marginBottom: 10,
        flexDirection: "row",
        width: 70,
        height: 30, padding: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 10,
        shadowRadius: 3.84,
        borderColor: "grey",
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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
        marginVertical: 20,
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
        marginVertical: 20
    },
    percentageInput: {
        width: 150,
        height: 50,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 10,
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

export default PlanPage;
