import { connect } from "react-redux";

import { StyledCodeBlockToolbar } from './CodeBlockToolbar';

import { IStore } from '../../interfaces';

import { COMMANDS_ACTIONS } from '../../store/commands';

const mapStateToProps = (state: IStore) => {
    return {
        getCode: (id: number) => {
            if (state.commandReducer.codeBlocks && state.commandReducer.codeBlocks[id]) {
                return state.commandReducer.codeBlocks[id].codeContent;
            }
            return '// Enter your code here';
        },
        notebookId: state.commandReducer.currentNotebook ? state.commandReducer.currentNotebook : null,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    currentVariables: (notebookId: number) => dispatch(COMMANDS_ACTIONS.currentVariablesRequest({notebookId})),
    deleteCodeBlock: (id: number) => dispatch(COMMANDS_ACTIONS.deleteCodeBlock({id})),
    getCodeSnippetRequest: (id: number, idSnippet: number) => dispatch(COMMANDS_ACTIONS.getCodeSnippetRequest({id, idSnippet})),
    processCommandRequest: (command: string, id: number, notebookId: number) => dispatch(COMMANDS_ACTIONS.processingCommandRequest({command, id, notebookId })),
    saveCodeSnippetRequest: (codeSnippetContent: string, codeSnippetName: string) => 
        dispatch(COMMANDS_ACTIONS.saveCodeSnippetRequest({codeSnippetContent, codeSnippetName})),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledCodeBlockToolbar);