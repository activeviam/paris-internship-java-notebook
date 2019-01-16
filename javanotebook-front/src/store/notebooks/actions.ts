import { ActionCreatorsMapObject } from 'redux';
import { createAction } from '../utils';

import { INotebook } from '../../interfaces';

export enum ActionTypes {
    GET_NOTEBOOK_LIST_REQUEST = 'GET_NOTEBOOK_REQUEST',
    GET_NOTEBOOK_LIST_SUCCESS = 'GET_NOTEBOOK_LIST_SUCCESS',
    GET_NOTEBOOK_LIST_FAILURE = 'GET_NOTEBOOK_LIST_FAILURE',

    CREATE_NEW_NOTEBOOK_REQUEST = 'CREATE_NEW_NOTEBOOK_REQUEST',
    CREATE_NEW_NOTEBOOK_SUCCESS = 'CREATE_NEW_NOTEBOOK_SUCCESS',
    CREATE_NEW_NOTEBOOK_FAILURE = 'CREATE_NEW_NOTEBOOK_FAILURE',
}

export const NOTEBOOK_ACTIONS = {
    getNotebookFailure: () => createAction(ActionTypes.GET_NOTEBOOK_LIST_FAILURE),
    getNotebookRequest: () => createAction(ActionTypes.GET_NOTEBOOK_LIST_REQUEST),
    getNotebookSuccess: (payload: INotebookRequestSuccess) =>createAction(ActionTypes.GET_NOTEBOOK_LIST_SUCCESS, payload),

    createNewNotebookFailure: () => (createAction(ActionTypes.CREATE_NEW_NOTEBOOK_FAILURE)),
    createNewNotebookRequest: (payload: ICreateNotebookRequest) => createAction(ActionTypes.CREATE_NEW_NOTEBOOK_REQUEST, payload),
    createNewNotebookSucces: (payload: ICreateNotebookSuccess) => createAction(ActionTypes.CREATE_NEW_NOTEBOOK_SUCCESS, payload),
}

export interface INotebookRequestSuccess {
    notebookList: INotebook[];
}

export interface ICreateNotebookRequest {
    name: string;
    description?: string;
}

export interface ICreateNotebookSuccess {
    notebook?: INotebook;
}

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
export type Actions = ActionsUnion<typeof NOTEBOOK_ACTIONS>;