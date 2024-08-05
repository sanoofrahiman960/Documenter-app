
export const FILEDATA = 'FILEDATA';
export const DELETEFILE = 'DELETEFILE';
export const RESET = 'RESET';

export const resetdata = () => {
    return {
        type: RESET,

    };
};
export const setData = (data: any) => {
    console.log("filedata", data)
    return {
        type: FILEDATA,
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

