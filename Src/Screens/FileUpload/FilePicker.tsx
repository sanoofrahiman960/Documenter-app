
import React, { useEffect, useState } from 'react';
import { View, Button, Text, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import DocumentPicker, { types, DocumentPickerResponse } from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import { useDispatch } from 'react-redux';
import * as Action from "../../Redux/Action"
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Icon } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';


// import Pdf from 'react-native-pdf';

const FilePicker = () => {
    const dispatch = useDispatch()
    const [files, setFiles] = useState<DocumentPickerResponse[]>([]);
    const [resourceType, setResourceType] = useState<'file' | 'url' | 'base64'>('url');
    const source = { uri: 'https://reeep.org/wp-content/uploads/2023/02/file.pdf' };
    const openFile = async (file: { uri: any; name?: string | null; copyError?: string | undefined; fileCopyUri?: string | null; type?: string | null; size?: number | null; }) => {
        try {
            await FileViewer.open(file.uri);
        } catch (err) {
            console.error(err);
        }
    };
    const deleteFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const pickFiles = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: true,
            });
            setFiles(results);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    };
    const UploadHandler = () => {
        dispatch(Action.setData(files))
        setFiles([])
        Toast.show('Files are save to Local', Toast.SHORT);
    }



    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <View>
                <View style={{ width: "100%", justifyContent: "center", marginTop: 20, }}>
                    <View style={{ alignItems: "flex-end", width: "90%", }}>
                        <TouchableOpacity style={{
                            height: 65, width: 65, justifyContent: "center", alignItems: "center", backgroundColor: "#34aeeb", borderRadius: 50, shadowColor: '#000',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            // Android elevation property
                            elevation: 10,
                        }} onPress={pickFiles}>
                            <Icon name='add-circle-outline' color={"#fff"} size={50} />
                            {/* <Text>Add Files</Text> */}
                        </TouchableOpacity>
                        <View style={{ padding: 5, width: 65, alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", color: "#000" }}>Add</Text>
                        </View>

                    </View>
                </View>
                <View style={{ width: "100%", marginVertical: 10 }}>

                    {files.length > 0 ?
                        <FlatList
                            data={files}
                            keyExtractor={(item: { uri: any; }, index: { toString: () => any; }) => item.uri ?? index.toString()}
                            numColumns={2}
                            renderItem={({ item, index }: any) => (

                                <View style={{
                                    height: 250, width: "45%", marginHorizontal: 10, marginVertical: 10, borderColor: "#6b6d6e", borderWidth: 1, shadowColor: "#000", backgroundColor: "white",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84, elevation: 5,
                                }}>
                                    <View>

                                        <TouchableOpacity onPress={() => openFile(item)} style={{ alignItems: "flex-end" }}>
                                            <Icon name='expand-outline' color={"#34aeeb"} size={30} />
                                        </TouchableOpacity>
                                        <View style={{ height: "70%", justifyContent: "center", alignItems: "center" }}>
                                            {item?.type === "application/pdf" ?
                                                <Image resizeMode="contain" source={require("../../Asset/pdf1.png")}
                                                    style={{ width: 80, height: 50 }}
                                                /> : item?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ?
                                                    <Image source={require("../../Asset/ppt1.png")}
                                                        resizeMode="contain" style={{ width: 80, height: 50 }}
                                                    /> : item?.type === "application/msword" ? <Image resizeMode="contain" source={require("../../Asset/word1.svg.png")}
                                                        style={{ width: 80, height: 50 }}
                                                    /> : <Image resizeMode="contain" source={require("../../Asset/unsupport.jpeg")}
                                                        style={{ width: 30, height: 30 }} />}
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                            <View style={{ flexDirection: "row", width: "70%" }}>
                                                <View style={{ justifyContent: "center", width: "35%", alignItems: "center" }}>
                                                    {item?.type === "application/pdf" ?
                                                        <Image source={require("../../Asset/pdf1.png")}
                                                            resizeMode="contain" style={{ width: 30, height: 30 }}
                                                        /> : item?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ?
                                                            <Image resizeMode="contain" source={require("../../Asset/ppt1.png")}
                                                                style={{ width: 30, height: 30 }}
                                                            /> : item?.type === "application/msword" ? <Image resizeMode="contain" source={require("../../Asset/word1.svg.png")}
                                                                style={{ width: 30, height: 30 }}
                                                            /> : <Image resizeMode="contain" source={require("../../Asset/unsupport.jpeg")}
                                                                style={{ width: 30, height: 30 }} />}
                                                </View>
                                                <View >
                                                    <Text numberOfLines={1} style={{ width: 80 }}>{item?.name}</Text>
                                                    <Text>{item?.size}</Text>
                                                </View>
                                            </View>
                                            <View style={{ justifyContent: "center", width: "30%" }}>
                                                <TouchableOpacity onPress={() => deleteFile(index)} style={{ padding: 5, left: 5 }} >
                                                    <Icon name='trash-outline' color={"#34aeeb"} size={30} />
                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                    </View>

                                </View>
                            )}
                        /> :
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", height: 500 }}>
                            <Text style={{ color: "#000", fontWeight: "bold" }}>Please click Add button for pick Documents</Text>
                        </View>

                    }




                </View>

            </View>


            {files.length > 0 ?
                <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <TouchableOpacity onPress={UploadHandler} style={{ backgroundColor: "#34aeeb", width: "30%", padding: 8, borderRadius: 6 }}>
                        <Text style={{ color: "#fff", textAlign: "center" }}>Upload to Local</Text>
                    </TouchableOpacity>

                </View> : null}


        </ScrollView>
    );
};

export default FilePicker;
