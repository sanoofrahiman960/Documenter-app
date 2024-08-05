import * as Actions from '../Action/action';
const initialState: any = {

    files: []
};

export const backendReducer = (state = initialState, action: any) => {
    // console.log('initialState', {...state});
    switch (action.type) {
        case Actions.FILEDATA:
            console.log(action.payload, 'payload');
            // let dummy = [...state.files]
            // dummy.push(action?.payload)
            return {
                ...state,
                files: [...state.files, ...action.payload],
                // files: dummy,
            };
        case Actions.RESET:
            console.log(action.payload, 'payload');
            // let dummy = [...state.files]
            // dummy.push(action?.payload)
            return {
                ...state,
                files: [],
                // files: dummy,
            };

        case Actions.DELETEFILE:
            console.log(action.payload, 'Index');

            return {
                ...state,

                files: state.files.filter((_: any, index: any) => index !== action.payload),
            };


        default:
            return state;
    }
};
