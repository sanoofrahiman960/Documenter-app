


import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Image, StyleSheet, Platform, Alert } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import * as Action from "../../Redux/Action";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../congif';
import RNFS from 'react-native-fs';
import Toast from 'react-native-simple-toast';
import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/Ionicons';



// Adjust import if needed

const UploadedFiles: React.FC = () => {
    const dispatch = useDispatch();
    const SavedFiles = useSelector((state: any) => state.backend.files);
    const [uploadProgress, setUploadProgress] = useState<number[]>([]);
    const [uploadSpeed, setUploadSpeed] = useState<number[]>([]);
    const [startTime, setStartTime] = useState<number[]>([]);
    const [uploadTasks, setUploadTasks] = useState<any[]>([]);  // To store references to ongoing uploads
    const [uploadErrors, setUploadErrors] = useState<any[]>([]);
    const [cancelToken, setCancelToken] = useState<any[]>([]); // To store cancel tokens
    const [abortControllers, setAbortControllers] = useState<AbortController[]>([]);
    const [uploadCompleted, setUploadCompleted] = useState<boolean[]>([]); // State to track if upload is completed
    const [uploadStatuses, setUploadStatuses] = useState<string[]>([]); // Track status of each file
    const [retryIndexes, setRetryIndexes] = useState<number[]>([]);
    const MAX_FILE_SIZE_MB = 5; // Maximum file size in MB
    const SUPPORTED_FILE_TYPES = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
        'application/vnd.ms-powerpoint', // .ppt
        'application/msword', // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx

    ];



    const flattenedFiles = SavedFiles.flat();

    const Deletefiles = (index: any) => {
        console.log("inde", index);
        dispatch(Action.deletefile(index));
    };

    const openFile = async (file: { uri: any; name?: string | null; }) => {
        try {
            await FileViewer.open(file.uri);
        } catch (err) {
            console.error(err);
        }
    };
    const validateFile = (file: { size: number; type: string | null }) => {
        const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            Toast.show(`File size exceeds ${MAX_FILE_SIZE_MB} MB limit.`, Toast.SHORT);

            return false;
        }
        if (!SUPPORTED_FILE_TYPES.includes(file.type || '')) {
            Toast.show('Unsupported file type.', Toast.SHORT);
            return false;
        }
        return true;
    };
    // PushNotification.configure({
    //     onRegister: function (token) {
    //         console.log('TOKEN:', token);
    //     },
    //     onNotification: function (notification) {
    //         console.log('NOTIFICATION:', notification);
    //         //   notification.finish(PushNotificationIOS.FetchResult.NoData);
    //     },
    //     permissions: {
    //         alert: true,
    //         badge: true,
    //         sound: true,
    //     },
    //     popInitialNotification: true,
    //     requestPermissions: Platform.OS === 'ios',
    // });
    // const pushNotif = () => {
    //     PushNotification.createChannel(
    //         {
    //             channelId: "specialid", // (required)
    //             channelName: "Special messasge", // (required)
    //             channelDescription: "Notification for special message", // (optional) default: undefined.
    //             importance: 4, // (optional) default: 4. Int value of the Android notification importance
    //             vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    //         },
    //         (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    //     );
    //     PushNotification.localNotification({
    //         channelId: 'specialid', //his must be same with channelid in createchannel
    //         title: 'hello',
    //         message: 'test message'
    //     })
    // }




    const TestNotification = (title: string, message: string) => {

        PushNotification.localNotification({
            channelId: "default-channel-id",
            title: title,
            message: message,
        });
    }

    // useEffect(() => {
    //     TestNotification()
    // }, [uploadStatuses])



    const Upload = useCallback(async (fileIndex: number, item: any) => {
        const file = flattenedFiles[fileIndex];
        if (!validateFile(item)) return;
        const uploadUri = Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri;

        try {
            const base64File = await RNFS.readFile(uploadUri, 'base64');
            const blob = new Blob([base64File], { type: file.type, lastModified: Date.now() });

            const storageRef = ref(storage, `uploads/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, blob);


            const controller = new AbortController();
            const { signal } = controller;



            const task = {
                task: uploadTask,
                cancelToken: new AbortController()
            };
            setUploadTasks((prevTasks) => {
                const newTasks = [...prevTasks];
                newTasks[fileIndex] = uploadTask;
                return newTasks;
            });
            setAbortControllers((prevControllers) => {
                const newControllers = [...prevControllers];
                newControllers[fileIndex] = controller;
                return newControllers;
            });

            setStartTime((prevTimes) => {
                const newTimes = [...prevTimes];
                newTimes[fileIndex] = Date.now();
                return newTimes;
            });
            setUploadStatuses((prevStatuses) => {
                const newStatuses = [...prevStatuses];
                newStatuses[fileIndex] = 'uploading'; // Set status to uploading
                return newStatuses;
            });
            TestNotification('Upload Started', `Uploading file: ${file.name}`);
            uploadTask.on(
                'state_changed',
                (snapshot: any) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress((prevProgress) => {
                        const newProgress = [...prevProgress];
                        newProgress[fileIndex] = progress;
                        return newProgress;
                    });

                    const timeElapsed = (Date.now() - startTime[fileIndex]) / 1000; // in seconds
                    const speed = (snapshot.bytesTransferred / 1024) / timeElapsed; // in KB/s
                    setUploadSpeed((prevSpeed) => {
                        const newSpeed = [...prevSpeed];
                        newSpeed[fileIndex] = speed;
                        return newSpeed;
                    });

                    setUploadCompleted((prevCompleted) => {
                        const newCompleted = [...prevCompleted];
                        newCompleted[fileIndex] = false;
                        return newCompleted;
                    });
                    console.log('Upload is ' + progress + '% done at ' + speed.toFixed(2) + ' KB/s');
                },
                (error: any) => {
                    console.error('Upload failed:', error);
                    setUploadErrors((prevErrors) => {
                        const newErrors = [...prevErrors];
                        newErrors[fileIndex] = error;
                        return newErrors;
                    });

                    setUploadStatuses((prevStatuses) => {
                        const newStatuses = [...prevStatuses];
                        newStatuses[fileIndex] = 'failed'; // Set status to failed
                        return newStatuses;
                    });

                    setRetryIndexes((prevIndexes) => {
                        if (!prevIndexes.includes(fileIndex)) {
                            return [...prevIndexes, fileIndex];
                        }
                        return prevIndexes;
                    });
                    TestNotification('Upload Failed', `Failed to upload file: ${file.name}`);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                    setUploadCompleted((prevCompleted) => {
                        const newCompleted = [...prevCompleted];
                        newCompleted[fileIndex] = true;
                        return newCompleted;
                    });
                    setUploadStatuses((prevStatuses) => {
                        const newStatuses = [...prevStatuses];
                        newStatuses[fileIndex] = 'uploaded'; // Set status to uploaded
                        return newStatuses;
                    });
                    TestNotification('Upload Complete', `Successfully uploaded file: ${file.name}`);
                }
            );

            signal.addEventListener('abort', () => {
                uploadTask.pause(); // Pauses the upload
                console.log(`Upload ${fileIndex} canceled`);
                setUploadCompleted((prevCompleted) => {
                    const newCompleted = [...prevCompleted];
                    newCompleted[fileIndex] = false;
                    return newCompleted;
                });
                setUploadStatuses((prevStatuses) => {
                    const newStatuses = [...prevStatuses];
                    newStatuses[fileIndex] = 'failed'; // Set status to failed on cancel
                    return newStatuses;
                });
                TestNotification('Upload Failed', `Failed to upload file: ${file.name}`);
            });
        } catch (err) {
            console.error('File read failed:', err);
        }
    }, [flattenedFiles, startTime]);

    const cancelUpload = (fileIndex: number) => {
        const controller = abortControllers[fileIndex];
        if (controller) {
            controller.abort(); // Trigger the abort signal
            setUploadTasks((prevTasks) => {
                const newTasks = [...prevTasks];
                newTasks[fileIndex] = null;
                return newTasks;
            });
            setAbortControllers((prevControllers) => {
                const newControllers = [...prevControllers];
                // @ts-ignore
                newControllers[fileIndex] = null;
                return newControllers;
            });
        }
    };

    const retryUpload = (fileIndex: number) => {
        // Retry the upload
        const file = flattenedFiles[fileIndex];
        Upload(fileIndex, file);
        setRetryIndexes((prevIndexes) => prevIndexes.filter(index => index !== fileIndex)); // Remove from retry list
    };

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <View>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    <View>
                        <Text style={{ color: "#000", fontWeight: "900" }}>Uploaded Files</Text>
                    </View>
                </View>
                <View style={{ width: "100%", marginVertical: 10 }}>
                    <FlatList
                        data={flattenedFiles}
                        keyExtractor={(item: { uri: any; }, index: { toString: () => any; }) => item.uri ?? index.toString()}
                        numColumns={2}
                        style={{}}
                        renderItem={({ item, index }: any) => (
                            <View style={{
                                height: 400, width: "45%", marginHorizontal: 10, marginVertical: 10, borderColor: "#b1b4b5", borderWidth: 1, shadowColor: "#000", backgroundColor: "white",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84, elevation: 5,
                            }}>
                                <View>
                                    <TouchableOpacity onPress={() => openFile(item)} style={{ alignItems: "flex-end" }}>
                                        <Icon name='expand-outline' color={"#34aeeb"} size={30} />
                                    </TouchableOpacity>
                                    <View style={{ height: "40%", justifyContent: "center", alignItems: "center" }}>
                                        {item?.type === "application/pdf" ?
                                            <Image source={require("../../Asset/pdf1.png")}
                                                resizeMode="contain" style={{ width: 80, height: 50 }}
                                            /> : item?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ?
                                                <Image resizeMode="contain" source={require("../../Asset/ppt1.png")}
                                                    style={{ width: 80, height: 50 }}
                                                /> : item?.type === "application/msword" ? <Image resizeMode="contain" source={require("../../Asset/word1.svg.png")}
                                                    style={{ width: 80, height: 50 }}
                                                /> : null}
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
                                                        /> : null}
                                            </View>
                                            <View>
                                                <Text numberOfLines={1} style={{ width: 80 }}>{item?.name}</Text>
                                                <Text>{item?.size}</Text>
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: "center", width: "30%" }}>
                                            <TouchableOpacity onPress={() => Deletefiles(index)} style={{ padding: 5, left: 5 }} >
                                                <Icon name='trash-outline' color={"#34aeeb"} size={30} />
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                                        <View style={{ marginVertical: 3, width: "90%", justifyContent: "center", }}>
                                            <Text style={{ color: "#000", fontWeight: "700", left: 5 }}>Status: {uploadStatuses[index] || 'Not Started'}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", width: "90%", }}>
                                            <View style={{ justifyContent: "center", }}>
                                                <Icon name='aperture-outline' color={"#34aeeb"} size={25} />
                                            </View>
                                            <View style={{ justifyContent: "center", alignItems: "center", }}>
                                                <Text style={{ color: "#000", fontWeight: "700", left: 2 }}>Progress: {uploadProgress[index] ? uploadProgress[index].toFixed(2) : 0}%</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", width: "90%", }}>
                                            <View style={{ justifyContent: "center" }}>
                                                <Icon name='speedometer-outline' color={"#34aeeb"} size={25} />
                                            </View>
                                            <View style={{ justifyContent: "center" }}>
                                                <Text style={{ color: "red", fontWeight: "600", left: 2 }}>Speed: {uploadSpeed[index] ? uploadSpeed[index].toFixed(2) : 0} KB/s</Text>
                                            </View>
                                        </View>
                                        {/* {!uploadCompleted[index] && (
                                            <TouchableOpacity onPress={() => cancelUpload(index)} style={{ backgroundColor: "red", padding: 5, marginTop: 10 }}>
                                                <Text style={{ color: "#fff" }}>Cancel</Text>
                                            </TouchableOpacity>
                                        )} */}

                                    </View>

                                </View>
                                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ width: "50%", alignItems: "center", justifyContent: "center" }}>
                                        <TouchableOpacity key={index} onPress={() => Upload(index, item)} style={{ width: "80%", padding: 5, marginBottom: 10 }}>
                                            <Icon name="cloud-upload-outline" color={"green"} size={35} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: "40%" }}>
                                        {uploadStatuses[index] === 'failed' ? (
                                            <TouchableOpacity onPress={() => retryUpload(index)} style={{ padding: 5, }}>
                                                <Icon name='refresh-circle-outline' color={"orange"} size={35} />
                                            </TouchableOpacity>
                                        ) : (
                                            !uploadCompleted[index] && (
                                                <TouchableOpacity onPress={() => cancelUpload(index)} style={{ padding: 5, }}>
                                                    <Icon name='close-circle-outline' color={"red"} size={35} />
                                                </TouchableOpacity>
                                            )
                                        )}
                                    </View>

                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
            {/* <View style={{ alignItems: "center", marginVertical: 10 }}>
                {flattenedFiles.map((item: any, index: any) => (
                    //@ts-ignore
                    <TouchableOpacity key={index} onPress={() => Upload(index, item)} style={{ backgroundColor: "green", width: "30%", padding: 8, marginBottom: 10 }}>
                        <Text>Upload File {index + 1} to Server</Text>
                    </TouchableOpacity>
                ))}
            </View> */}
            {/* <TouchableOpacity onPress={TestNotification}>
                <Text>clickk</Text>
            </TouchableOpacity> */}

        </ScrollView>
    );
};

export default UploadedFiles;

const styles = StyleSheet.create({});
