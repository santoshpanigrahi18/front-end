
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const CLEAR_USER_DETAILS = 'CLEAR_USER_DETAILS';
export const SET_FILTER_DETAILS = 'SET_FILTER_DETAILS';
export const REFRESH_DETAILS = 'REFRESH_DETAILS';
export const SELECTED_PAGE_DETAILS = 'SELECTED_PAGE_DETAILS';



export const setUserDetails = userData => ({
    type: SET_USER_DETAILS,
    userData
});

export const clearUserDetails = (data) => ({
    type: CLEAR_USER_DETAILS,
    data
});

export const setFilterDetails = (data) => ({
    type: SET_FILTER_DETAILS,
    data
});

export const setPageDetails = (data) => ({
    type: SELECTED_PAGE_DETAILS,
    data
});

export const setRefreshDetails = (data) => ({
    type: REFRESH_DETAILS,
    data
});


export default function reducer(state = {
    userDetails: {},
    reportAccess: [],
    filterList: [],
    accessToken: '',
    lastDate:'',
    pageName:"#/dashboard"
}, action) {
    console.log('passed data have used', action)
    switch (action.type) {
        case SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.userData.userDetails,
                reportAccess: action.userData.reportAccess,
                filterList: action.userData.filterList,
                accessToken: action.userData.accessToken,
            };

        case CLEAR_USER_DETAILS:
            console.log("passed value", action)
            return {
                ...state,
                userDetails: {},
                reportAccess: [],
                filterList: [],
                accessToken: ''
            };
        case SET_FILTER_DETAILS:
            console.log("passed value filter data", action,action.data,state.filterList,
              )
            return {
                ...state,
                filterList:  action.data
            };
        case REFRESH_DETAILS:
                return {
                    ...state,
                    lastDate:  action.data
                };
        case SELECTED_PAGE_DETAILS:
                    return {
                        ...state,
                        pageName:  action.data
                    };
        default:

    }
    return state;
}
