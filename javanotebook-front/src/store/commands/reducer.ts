import { Actions, ActionTypes } from './actions';

import { ICommandStore } from '../../interfaces';

export function commandReducer(state : ICommandStore  = {}, action: Actions): ICommandStore {
    let isProcessing: boolean;
    let isProcessingError: boolean;
    let id: number;
    switch (action.type) {
        // CODE CONTENT CHANGE
        case ActionTypes.CHANGE_CODE_CONTENT:
            id = action.payload!.id;
            const codeContent = {...state.codeContent, [id]: action.payload!.codeContent}
            return {...state, codeContent};

        // COMMAND PROCESS 
        case ActionTypes.PROCESS_COMMAND_REQUEST:
            isProcessing = true;
            isProcessingError = false;
            return {...state, isProcessing, isProcessingError};
        case ActionTypes.PROCESS_COMMAND_SUCCESS:
            isProcessing = false;
            isProcessingError = false;
            id = action.payload!.id;
            const codeCommandOutput = action.payload!.codeOutput;
            const codeOutput = {... state.codeOutput, [id]: codeCommandOutput};
            return {...state, isProcessing, isProcessingError, codeOutput};
        case ActionTypes.PROCESS_COMMAND_FAILURE:
            isProcessing = false;
            isProcessingError = true;
            return {...state, isProcessing, isProcessingError};
        default:
            return state;
    }
}