import { ActionCreatorsMapObject } from 'redux';
import { createAction } from '../utils';

import { INotebook } from '../../interfaces';

export enum ActionTypes {
    GET_NOTEBOOK_LIST_REQUEST = 'GET_NOTEBOOK_REQUEST',
    GET_NOTEBOOK_LIST_SUCCESS = 'GET_NOTEBOOK_LIST_SUCCESS',
    GET_NOTEBOOK_LIST_FAILURE = 'GET_NOTEBOOK_LIST_FAILURE',
}

export const NOTEBOOK_ACTIONS = {
    getNotebookFailure: () => createAction(ActionTypes.GET_NOTEBOOK_LIST_FAILURE),
    getNotebookRequest: () => createAction(ActionTypes.GET_NOTEBOOK_LIST_REQUEST),
    getNotebookSuccess: (payload: INotebookRequestSuccess) =>createAction(ActionTypes.GET_NOTEBOOK_LIST_SUCCESS, payload),
}

export interface INotebookRequestSuccess {
    notebookList: INotebook[],
}

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
export type Actions = ActionsUnion<typeof NOTEBOOK_ACTIONS>;