import { ActionCreatorsMapObject } from 'redux';
import { createAction } from '../utils';

import { INotebook, IProcessedCommand } from '../../interfaces';

// Actions type 
export enum ActionTypes {
    CHANGE_CODE_CONTENT = 'CHANGE_CODE_CONTENT',

    ADD_CODE_BLOCK = 'ADD_CODE_BLOCK',
    DELETE_CODE_BLOCK = 'DELETE_CODE_CONTENT',

    PROCESS_COMMAND_REQUEST = 'PROCESS_COMMAND_REQUEST',
    PROCESS_COMMAND_SUCCESS = 'PROCESS_COMMAND_SUCCESS',
    PROCESS_COMMAND_FAILURE = 'PROCESS_COMMAND_FAILURE',

    SAVE_CODE_SNIPPET_REQUEST = 'SAVE_CODE_SNIPPET_REQUEST',
    SAVE_CODE_SNIPPET_SUCCESS = 'SAVE_CODE_SNIPPET_SUCCESS',
    SAVE_CODE_SNIPPET_FAILURE = 'SAVE_CODE_SNIPPET_FAILURE',

    GET_CODE_SNIPPET_REQUEST = 'GET_CODE_SNIPPET_REQUEST',
    GET_CODE_SNIPPET_SUCCESS = 'GET_CODE_SNIPPET_SUCCESS',
    GET_CODE_SNIPPET_FAILURE = 'GET_CODE_SNIPPET_FAILURE',

    OPEN_NOTEBOOK = 'OPEN_NOTEBOOK',
    SAVE_NOTEBOOK_FAILURE = 'SAVE_NOTEBOOK_FAILURE',
    SAVE_NOTEBOOK_REQUEST = 'SAVE_NOTEBOOK_REQUEST',
    SAVE_NOTEBOOK_SUCCESS = 'SAVE_NOTEBOOK_SUCCESS',
}

export const COMMANDS_ACTIONS = {
    changeCodeContent: (payload: IChangeCodeContent) => createAction(ActionTypes.CHANGE_CODE_CONTENT, payload),

    addCodeBlock: (payload: IAddCodeBlock) => createAction(ActionTypes.ADD_CODE_BLOCK, payload),
    deleteCodeBlock: (payload: IDeleteCodeBlock ) => createAction(ActionTypes.DELETE_CODE_BLOCK, payload),

    processingCommandFailure: () => createAction(ActionTypes.PROCESS_COMMAND_FAILURE),
    processingCommandRequest: (payload: IProcessingCommandRequestPayload) => createAction(ActionTypes.PROCESS_COMMAND_REQUEST, payload),
    processingCommandSuccess: (payload: IProcessingCommandRequestSuccess) => createAction(ActionTypes.PROCESS_COMMAND_SUCCESS, payload),

    saveCodeSnippetFailure: () => createAction(ActionTypes.SAVE_CODE_SNIPPET_FAILURE),
    saveCodeSnippetRequest: (payload: ISaveCodeSnippetRequestPayload) => createAction(ActionTypes.SAVE_CODE_SNIPPET_REQUEST, payload),
    saveCodeSnippetSuccess: () => createAction(ActionTypes.SAVE_CODE_SNIPPET_SUCCESS),

    getCodeSnippetFailure: () => createAction(ActionTypes.GET_CODE_SNIPPET_FAILURE),
    getCodeSnippetRequest: (payload: IGetCodeSnippetRequest) => createAction(ActionTypes.GET_CODE_SNIPPET_REQUEST, payload),
    // getCodeSnippetSuccess: (payload: IGetCodeSnippetSuccess) => createAction(ActionTypes.GET_CODE_SNIPPET_SUCCESS, payload),

    openNotebook: (payload: IOpenNotebook) => createAction(ActionTypes.OPEN_NOTEBOOK, payload),
    saveNotebookFailure: () => createAction(ActionTypes.SAVE_CODE_SNIPPET_FAILURE),
    saveNotebookRequest: (payload: ISaveNotebook) => createAction(ActionTypes.SAVE_NOTEBOOK_REQUEST, payload),
    saveNotebookSuccess: () => createAction(ActionTypes.SAVE_CODE_SNIPPET_SUCCESS),
}


export interface ISaveNotebook {
    notebook: INotebook;
}

export interface IOpenNotebook {
    notebook: INotebook;
}

export interface IChangeCodeContent {
    id: number;
    codeContent: string;
}

export interface IAddCodeBlock {
    id: number;
}

export interface IDeleteCodeBlock {
    id: number;
}

export interface IProcessingCommandRequestPayload {
    command: string;
    id: number;
}

export interface IProcessingCommandRequestSuccess {
    codeOutput: IProcessedCommand[];
    id: number;
}

export interface ISaveCodeSnippetRequestPayload {
    codeSnippetContent: string;
    codeSnippetName: string;
}

export interface IGetCodeSnippetRequest {
    id: number;
    idSnippet: number;
}

// export interface IGetCodeSnippetSuccess {
//     id: number;
//     content: string;
// }

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
export type Actions = ActionsUnion<typeof COMMANDS_ACTIONS>;