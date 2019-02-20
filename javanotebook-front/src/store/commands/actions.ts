import { ActionCreatorsMapObject } from 'redux';
import { createAction } from '../utils';

import { INotebook, IProcessedCommand , IVariable } from '../../interfaces';

import * as monaco from 'monaco-editor';

// Actions type 
export enum ActionTypes {
    CHANGE_CODE_CONTENT = 'CHANGE_CODE_CONTENT',

    ADD_CODE_BLOCK = 'ADD_CODE_BLOCK',
    DELETE_CODE_BLOCK = 'DELETE_CODE_CONTENT',

    PROCESS_COMMAND_REQUEST = 'PROCESS_COMMAND_REQUEST',
    PROCESS_COMMAND_SUCCESS = 'PROCESS_COMMAND_SUCCESS',
    PROCESS_COMMAND_FAILURE = 'PROCESS_COMMAND_FAILURE',

    RUN_ALL_REQUEST = 'RUN_ALL_REQUEST',
    RUN_ALL_SUCCESS = 'RUN_ALL_SUCCESS',
    RUN_ALL_FAILURE = 'RUN_ALL_FAILURE',

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

    CURRENT_VARIABLES_FAILURE = 'CURRENT_VARIABLES_FAILURE',
    CURRENT_VARIABLES_REQUEST = 'CURRENT_VARIABLES_REQUEST',
    CURRENT_VARIABLES_SUCCESS = 'CURRENT_VARIABLES_SUCCESS',

    COMPLETION_ITEMS_FAILURE = 'COMPLETION_ITEMS_FAILURE',
    COMPLETION_ITEMS_REQUEST = 'COMPLETION_ITEMS_REQUEST',
    COMPLETION_ITEMS_SUCCESS = 'COMPLETION_ITEMS_SUCCESS',
}

export const COMMANDS_ACTIONS = {
    changeCodeContent: (payload: IChangeCodeContent) => createAction(ActionTypes.CHANGE_CODE_CONTENT, payload),

    addCodeBlock: (payload: IAddCodeBlock) => createAction(ActionTypes.ADD_CODE_BLOCK, payload),
    deleteCodeBlock: (payload: IDeleteCodeBlock ) => createAction(ActionTypes.DELETE_CODE_BLOCK, payload),

    processingCommandFailure: () => createAction(ActionTypes.PROCESS_COMMAND_FAILURE),
    processingCommandRequest: (payload: IProcessingCommandRequestPayload) => createAction(ActionTypes.PROCESS_COMMAND_REQUEST, payload),
    processingCommandSuccess: (payload: IProcessingCommandRequestSuccess) => createAction(ActionTypes.PROCESS_COMMAND_SUCCESS, payload),

    runAllFailure: () => createAction(ActionTypes.RUN_ALL_FAILURE),
    runAllRequest: (payload: IRunAllRequestPayload) => createAction(ActionTypes.RUN_ALL_REQUEST, payload),
    runAllSuccess: () => createAction(ActionTypes.RUN_ALL_SUCCESS),

    saveCodeSnippetFailure: () => createAction(ActionTypes.SAVE_CODE_SNIPPET_FAILURE),
    saveCodeSnippetRequest: (payload: ISaveCodeSnippetRequestPayload) => createAction(ActionTypes.SAVE_CODE_SNIPPET_REQUEST, payload),
    saveCodeSnippetSuccess: () => createAction(ActionTypes.SAVE_CODE_SNIPPET_SUCCESS),

    getCodeSnippetFailure: () => createAction(ActionTypes.GET_CODE_SNIPPET_FAILURE),
    getCodeSnippetRequest: (payload: IGetCodeSnippetRequest) => createAction(ActionTypes.GET_CODE_SNIPPET_REQUEST, payload),
    // getCodeSnippetSuccess: (payload: IGetCodeSnippetSuccess) => createAction(ActionTypes.GET_CODE_SNIPPET_SUCCESS, payload),

    openNotebook: (payload: IOpenNotebook) => createAction(ActionTypes.OPEN_NOTEBOOK, payload),
    saveNotebookFailure: () => createAction(ActionTypes.SAVE_NOTEBOOK_FAILURE),
    saveNotebookRequest: (payload: ISaveNotebook) => createAction(ActionTypes.SAVE_NOTEBOOK_REQUEST, payload),
    saveNotebookSuccess: () => createAction(ActionTypes.SAVE_NOTEBOOK_SUCCESS),

    currentVariablesFailure: () => createAction(ActionTypes.CURRENT_VARIABLES_FAILURE),
    currentVariablesRequest: (payload: ICurrentVariablesRequest) => createAction(ActionTypes.CURRENT_VARIABLES_REQUEST, payload),
    currentVariablesSuccess: (payload: ICurrentVariablesSuccess) => createAction(ActionTypes.CURRENT_VARIABLES_SUCCESS, payload),

    completionItemsFailure: () => createAction(ActionTypes.COMPLETION_ITEMS_FAILURE),
    completionItemsRequest: (payload: ICompletionItemsRequest) => createAction(ActionTypes.COMPLETION_ITEMS_REQUEST, payload),
    completionItemsSuccess: (payload: ICompletionItemsSuccess) => createAction(ActionTypes.COMPLETION_ITEMS_SUCCESS, payload),
}

export interface IRunAllRequestPayload {
    commandsAndIds: Array<{command: string, id: number }>;
    notebookId: number;
}

export interface ICompletionItemsRequest {
    notebookId: number;
    codeContent: string;
    cursor: number;
}

export interface ICompletionItemsSuccess {
    completionItems: monaco.languages.CompletionItem[];
}

export interface ICurrentVariablesRequest {
    notebookId: number;
}

export interface ICurrentVariablesSuccess {
    variables: IVariable[];
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
    notebookId: number;
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