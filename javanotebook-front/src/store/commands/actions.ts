import { ActionCreatorsMapObject } from 'redux';
import { createAction } from '../utils';

import { IProcessedCommand } from '../../interfaces';

// Actions type 
export enum ActionTypes {
    CHANGE_CODE_CONTENT = 'CHANGE_CODE_CONTENT',

    PROCESS_COMMAND_REQUEST = 'PROCESS_COMMAND_REQUEST',
    PROCESS_COMMAND_SUCCESS = 'PROCESS_COMMAND_SUCCESS',
    PROCESS_COMMAND_FAILURE = 'PROCESS_COMMAND_FAILURE',

    SAVE_CODE_SNIPPET_REQUEST = 'SAVE_CODE_SNIPPET_REQUEST',
    SAVE_CODE_SNIPPET_SUCCESS = 'SAVE_CODE_SNIPPET_SUCCESS',
    SAVE_CODE_SNIPPET_FAILURE = 'SAVE_CODE_SNIPPET_FAILURE',

    GET_CODE_SNIPPET_REQUEST = 'GET_CODE_SNIPPET_REQUEST',
    GET_CODE_SNIPPET_SUCCESS = 'GET_CODE_SNIPPET_SUCCESS',
    GET_CODE_SNIPPET_FAILURE = 'GET_CODE_SNIPPET_FAILURE',
}

export const COMMANDS_ACTIONS = {
    changeCodeContent: (payload: IChangeCodeContent) => createAction(ActionTypes.CHANGE_CODE_CONTENT, payload),

    processingCommandFailure: () => createAction(ActionTypes.PROCESS_COMMAND_FAILURE),
    processingCommandRequest: (payload: IProcessingCommandRequestPayload) => createAction(ActionTypes.PROCESS_COMMAND_REQUEST, payload),
    processingCommandSuccess: (payload: IProcessingCommandRequestSuccess) => createAction(ActionTypes.PROCESS_COMMAND_SUCCESS, payload),

    saveCodeSnippetFailure: () => createAction(ActionTypes.SAVE_CODE_SNIPPET_FAILURE),
    saveCodeSnippetRequest: (payload: ISaveCodeSnippetRequestPayload) => createAction(ActionTypes.SAVE_CODE_SNIPPET_REQUEST, payload),
    saveCodeSnippetSuccess: () => createAction(ActionTypes.SAVE_CODE_SNIPPET_SUCCESS),

    getCodeSnippetFailure: () => createAction(ActionTypes.GET_CODE_SNIPPET_FAILURE),
    getCodeSnippetRequest: (payload: IGetCodeSnippetRequest) => createAction(ActionTypes.GET_CODE_SNIPPET_REQUEST, payload),
    // getCodeSnippetSuccess: (payload: IGetCodeSnippetSuccess) => createAction(ActionTypes.GET_CODE_SNIPPET_SUCCESS, payload),
}

export interface IChangeCodeContent {
    id: number;
    codeContent: string;
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