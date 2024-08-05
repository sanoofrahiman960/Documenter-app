



import React, { useEffect, useState } from 'react';
import { View, Button, Text, TouchableOpacity, ScrollView, FlatList, Image, StyleSheet } from 'react-native';
import DocumentPicker, { types, DocumentPickerResponse } from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import { useDispatch } from 'react-redux';
import * as Action from "../../Redux/Action";
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

const FilePicker = () => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState<DocumentPickerResponse[]>([]);

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
        dispatch(Action.setData(files));
        setFiles([]);
        Toast.show('Files are saved to Local', Toast.SHORT);
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.addButtonContainer}>
                    <View style={styles.addButtonWrapper}>
                        <TouchableOpacity style={styles.addButton} onPress={pickFiles}>
                            <Icon name='add-circle-outline' color={"#fff"} size={50} />
                        </TouchableOpacity>
                        <View style={styles.addTextWrapper}>
                            <Text style={styles.addText}>Add</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.fileListContainer}>
                    {files.length > 0 ? (
                        <FlatList
                            data={files}
                            keyExtractor={(item: { uri: any; }, index: { toString: () => any; }) => item.uri ?? index.toString()}
                            numColumns={2}
                            renderItem={({ item, index }: any) => (
                                <View style={styles.fileItem}>
                                    <View>
                                        <TouchableOpacity onPress={() => openFile(item)} style={styles.expandButton}>
                                            <Icon name='expand-outline' color={"#34aeeb"} size={30} />
                                        </TouchableOpacity>
                                        <View style={styles.fileImageWrapper}>
                                            {item?.type === "application/pdf" ? (
                                                <Image resizeMode="contain" source={require("../../Asset/pdf1.png")} style={styles.fileImage} />
                                            ) : item?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                                                <Image source={require("../../Asset/ppt1.png")} resizeMode="contain" style={styles.fileImage} />
                                            ) : item?.type === "application/msword" ? (
                                                <Image resizeMode="contain" source={require("../../Asset/word1.svg.png")} style={styles.fileImage} />
                                            ) : (
                                                <Image resizeMode="contain" source={require("../../Asset/unsupport.jpeg")} style={styles.unsupportedImage} />
                                            )}
                                        </View>
                                        <View style={styles.fileInfoContainer}>
                                            <View style={styles.fileInfoWrapper}>
                                                <View style={styles.fileIconWrapper}>
                                                    {item?.type === "application/pdf" ? (
                                                        <Image source={require("../../Asset/pdf1.png")} resizeMode="contain" style={styles.fileIcon} />
                                                    ) : item?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                                                        <Image resizeMode="contain" source={require("../../Asset/ppt1.png")} style={styles.fileIcon} />
                                                    ) : item?.type === "application/msword" ? (
                                                        <Image resizeMode="contain" source={require("../../Asset/word1.svg.png")} style={styles.fileIcon} />
                                                    ) : (
                                                        <Image resizeMode="contain" source={require("../../Asset/unsupport.jpeg")} style={styles.fileIcon} />
                                                    )}
                                                </View>
                                                <View>
                                                    <Text numberOfLines={1} style={styles.fileName}>{item?.name}</Text>
                                                    <Text>{item?.size}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.deleteButtonWrapper}>
                                                <TouchableOpacity onPress={() => deleteFile(index)} style={styles.deleteButton}>
                                                    <Icon name='trash-outline' color={"#34aeeb"} size={30} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    ) : (
                        <View style={styles.emptyMessageWrapper}>
                            <Text style={styles.emptyMessage}>Please click Add button to pick Documents</Text>
                        </View>
                    )}
                </View>
            </View>

            {files.length > 0 && (
                <View style={styles.uploadButtonWrapper}>
                    <TouchableOpacity onPress={UploadHandler} style={styles.uploadButton}>
                        <Text style={styles.uploadButtonText}>Upload to Local</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    addButtonContainer: {
        width: "100%",
        justifyContent: "center",
        marginTop: 20,
    },
    addButtonWrapper: {
        alignItems: "flex-end",
        width: "90%",
    },
    addButton: {
        height: 65,
        width: 65,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#34aeeb",
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    addTextWrapper: {
        padding: 5,
        width: 65,
        alignItems: "center",
    },
    addText: {
        fontWeight: "bold",
        color: "#000",
    },
    fileListContainer: {
        width: "100%",
        marginVertical: 10,
    },
    fileItem: {
        height: 250,
        width: "45%",
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: "#6b6d6e",
        borderWidth: 1,
        shadowColor: "#000",
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    expandButton: {
        alignItems: "flex-end",
    },
    fileImageWrapper: {
        height: "70%",
        justifyContent: "center",
        alignItems: "center",
    },
    fileImage: {
        width: 80,
        height: 50,
    },
    unsupportedImage: {
        width: 30,
        height: 30,
    },
    fileInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    fileInfoWrapper: {
        flexDirection: "row",
        width: "70%",
    },
    fileIconWrapper: {
        justifyContent: "center",
        width: "35%",
        alignItems: "center",
    },
    fileIcon: {
        width: 30,
        height: 30,
    },
    fileName: {
        width: 80,
    },
    deleteButtonWrapper: {
        justifyContent: "center",
        width: "30%",
    },
    deleteButton: {
        padding: 5,
        left: 5,
    },
    emptyMessageWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 500,
    },
    emptyMessage: {
        color: "#000",
        fontWeight: "bold",
    },
    uploadButtonWrapper: {
        alignItems: "center",
        marginVertical: 10,
    },
    uploadButton: {
        backgroundColor: "#34aeeb",
        width: "40%",
        padding: 8,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    uploadButtonText: {
        color: "#fff",
        textAlign: "center",
    },
});

export default FilePicker;
