export const ATTENDEE = 'ATTENDEE';
export const LOGIN_TOKEN = 'LOGIN_TOKEN';
export const LOGIN_USER = 'LOGIN_USER';
export const SET_MODAL = 'SET_MODAL';
export const RESET_MODAL = 'RESET_MODAL';
export const FILEDATA = 'FILEDATA';
export const DELETEFILE = 'DELETEFILE';

export const setAttendee = (attendee: any) => {
    return {
        type: ATTENDEE,
        payload: attendee,
    };
};
export const setData = (data: any) => {
    console.log("filedata", data)
    return {
        type: FILEDATA,
        payload: data,
    };
};
export const loginToken = (data: any) => {
    return {
        type: LOGIN_TOKEN,
        payload: data,
    };
};
export const deletefile = (index: any) => {
    console.log("deletefile", index)
    return {
        type: DELETEFILE,
        payload: index,
    };
};
export const loginUser = (data: any) => {
    return {
        type: LOGIN_USER,
        payload: data,
    };
};
export function setModal(data: any) {
    return {
        type: SET_MODAL,
        data,
    };
}
export function reSetModal() {
    return {
        type: RESET_MODAL,
    };
}
