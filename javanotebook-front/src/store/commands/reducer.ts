import { Actions, ActionTypes } from './actions';

import { ICommandStore } from '../../interfaces';


export function commandReducer(state : ICommandStore  = {}, action: Actions): ICommandStore {
    let isProcessing: boolean;
    let isProcessingError: boolean;
    let id: number;
    let codeBlock: any;
    let codeBlocks: any;
    let currentNotebook: number;
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
            // currentNotebook = parseInt(action.payload!.notebook.id, 0);
            currentNotebook = action.payload!.notebook.id;
            (action.payload!.notebook.codeSnippets || []).map((content, index) => {
                codeBlocks[index] = {codeContent: content};
            });
            return {...state, codeBlocks, currentNotebook};
        case ActionTypes.SAVE_CODE_SNIPPET_FAILURE:
            return {...state};
        case ActionTypes.SAVE_NOTEBOOK_REQUEST:
            return {...state};
        case ActionTypes.SAVE_CODE_SNIPPET_SUCCESS:
        return {...state};

        case ActionTypes.CURRENT_VARIABLES_FAILURE:
            return {...state};
        case ActionTypes.CURRENT_VARIABLES_REQUEST:
            return {...state};
        case ActionTypes.CURRENT_VARIABLES_SUCCESS:
            return {...state};

        default:
            return state;
    }
}