import * as Actions from '../Action/action';
const initialState: any = {
    Attend: [],
    logintoken: [],
    loginUser: [],
    modalList: [],
    files: []
};

export const backendReducer = (state = initialState, action: any) => {
    // console.log('initialState', {...state});
    switch (action.type) {
        case Actions.ATTENDEE:
            console.log(action.payload, 'payload');
            return {
                ...state,
                attende: action.payload,
            };
        case Actions.LOGIN_TOKEN:
            console.log(action.payload, 'payload');
            return {
                ...state,
                logintoken: action.payload,
            };
        case Actions.LOGIN_USER:
            console.log(action.payload, 'payload');
            return {
                ...state,
                loginUser: action.payload,
            };

        case Actions.FILEDATA:
            console.log(action.payload, 'payload');
            // let dummy = [...state.files]
            // dummy.push(action?.payload)
            return {
                ...state,
                files: [...state.files, ...action.payload],
                // files: dummy,
            };

        case Actions.DELETEFILE:
            console.log(action.payload, 'Index');

            return {
                ...state,

                files: state.files.filter((_: any, index: any) => index !== action.payload),
            };
        case Actions.SET_MODAL: {
            let dummyList = [...state.modalList];
            let index = dummyList
                .map(item => {
                    return item.message;
                })
                .indexOf(action.data.message);
            if (index === -1) dummyList.push(action.data);
            return {
                ...state,

                modalList: dummyList,
            };
        }
        case Actions.RESET_MODAL: {
            let dummyList = [...state.modalList];
            dummyList.pop();
            return {
                ...state,

                modalList: dummyList,
            };
        }

        default:
            return state;
    }
};
