import { Actions, ActionTypes } from './actions';

import { INotebookStore } from '../../interfaces';

export function notebookReducer(state: INotebookStore = {}, action: Actions): INotebookStore {
    let isLoading: boolean;
    let isLoadingError: boolean;
    switch (action.type) {
        case ActionTypes.GET_NOTEBOOK_LIST_FAILURE:
            isLoading = false;
            isLoadingError = true;
            return {...state, isLoading, isLoadingError};
        case ActionTypes.GET_NOTEBOOK_LIST_REQUEST:
            isLoading = true;
            isLoadingError = false;
            return {...state, isLoading, isLoadingError};
        case ActionTypes.GET_NOTEBOOK_LIST_SUCCESS:
            isLoading = false;
            isLoadingError = false;
            return {...state, isLoading, isLoadingError, noteBooks: action.payload!.notebookList};

        case ActionTypes.CREATE_NEW_NOTEBOOK_FAILURE:
            return {...state};
        case ActionTypes.CREATE_NEW_NOTEBOOK_REQUEST:
            return {...state};
        case ActionTypes.CREATE_NEW_NOTEBOOK_SUCCESS:
            return {...state};
        default:
           return state;
    } 
}