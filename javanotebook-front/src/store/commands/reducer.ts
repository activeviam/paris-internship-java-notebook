import { Actions, ActionTypes } from './actions';

import { ICommandStore } from '../../interfaces';

export function commandReducer(state : ICommandStore  = {}, action: Actions): ICommandStore {
    let isProcessing: boolean;
    let isProcessingError: boolean;
    switch (action.type) {
        // COMMAND PROCESS 
        case ActionTypes.PROCESS_COMMAND_REQUEST:
            isProcessing = true;
            isProcessingError = false;
            return {...state, isProcessing, isProcessingError};
        case ActionTypes.PROCESS_COMMAND_SUCCESS:
            isProcessing = false;
            isProcessingError = false;
            const codeOutput = action.payload!.codeOutput;
            return {...state, isProcessing, isProcessingError, codeOutput};
        case ActionTypes.PROCESS_COMMAND_FAILURE:
            isProcessing = false;
            isProcessingError = true;
            return {...state, isProcessing, isProcessingError};

        default:
            return state;
    }
}