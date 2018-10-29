import { ActionCreatorsMapObject } from 'redux';
import { createAction } from '../utils';

import { IProcessedCommand } from '../../interfaces';

// Actions type 
export enum ActionTypes {
    PROCESS_COMMAND_REQUEST = 'PROCESS_COMMAND_REQUEST',
    PROCESS_COMMAND_SUCCESS = 'PROCESS_COMMAND_SUCCESS',
    PROCESS_COMMAND_FAILURE = 'PROCESS_COMMAND_FAILURE',
}

export const COMMANDS_ACTIONS = {
    processingCommandFailure: () => createAction(ActionTypes.PROCESS_COMMAND_FAILURE),
    processingCommandRequest: (payload: IProcessingCommandRequestPayload) => createAction(ActionTypes.PROCESS_COMMAND_REQUEST, payload),
    processingCommandSuccess: (payload: IProcessingCommandRequestSuccess) => createAction(ActionTypes.PROCESS_COMMAND_SUCCESS, payload),
}

export interface IProcessingCommandRequestPayload {
    command: string;
}

export interface IProcessingCommandRequestSuccess {
    codeOutput: IProcessedCommand[];
}

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
export type Actions = ActionsUnion<typeof COMMANDS_ACTIONS>;