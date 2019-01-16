import { Actions, ActionTypes } from './actions';

import { ICommandStore } from '../../interfaces';

export function commandReducer(state : ICommandStore  = {}, action: Actions): ICommandStore {
    let isProcessing: boolean;
    let isProcessingError: boolean;
    let id: number;
    let codeBlock: any;
    let codeBlocks: any;
    switch (action.type) {
        // CODE CONTENT CHANGE
        case ActionTypes.CHANGE_CODE_CONTENT:
            id = action.payload!.id;
            codeBlock = state.codeBlocks ? {...state.codeBlocks[id], codeContent: action.payload!.codeContent } : {codeContent: action.payload!.codeContent};
            codeBlocks = {...state.codeBlocks, [id]: codeBlock};
            return {...state, codeBlocks};
        // CHANGE CODE BLOCKS
        case ActionTypes.ADD_CODE_BLOCK:
            id = action.payload!.id;
            codeBlocks = {...state.codeBlocks, [id]: {}};
            return {...state, codeBlocks};
        case ActionTypes.DELETE_CODE_BLOCK:
            id = action.payload!.id;
            codeBlocks = state.codeBlocks;
            codeBlocks = {...state.codeBlocks, [id]: null};
            console.log(codeBlocks);
            return {...state, codeBlocks};
        // COMMAND PROCESS 
        case ActionTypes.PROCESS_COMMAND_REQUEST:
            isProcessing = true;
            isProcessingError = false;
            return {...state, isProcessing, isProcessingError};
        case ActionTypes.PROCESS_COMMAND_SUCCESS:
            isProcessing = false;
            isProcessingError = false;
            id = action.payload!.id;
            codeBlock = state.codeBlocks ? {...state.codeBlocks[id], codeOutput: action.payload!.codeOutput } : {codeOutput: action.payload!.codeOutput};
            codeBlocks = {...state.codeBlocks, [id]: codeBlock};
            return {...state, isProcessing, isProcessingError, codeBlocks};
        case ActionTypes.PROCESS_COMMAND_FAILURE:
            isProcessing = false;
            isProcessingError = true;
            return {...state, isProcessing, isProcessingError};

        case ActionTypes.OPEN_NOTEBOOK:
            codeBlocks = {};
            (action.payload!.notebook.codeSnippets || []).map((snippet, index) => {
                codeBlocks[index.toString()] = {codeContent: snippet.content};
            });
            return {...state, codeBlocks};
        default:
            return state;
    }
}