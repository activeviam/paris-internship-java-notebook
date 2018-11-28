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
        }
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    getCodeSnippetRequest: (id: number, idSnippet: number) => dispatch(COMMANDS_ACTIONS.getCodeSnippetRequest({id, idSnippet})),
    processCommandRequest: (command: string, id: number) => dispatch(COMMANDS_ACTIONS.processingCommandRequest({command, id})),
    saveCodeSnippetRequest: (codeSnippetContent: string, codeSnippetName: string) => 
        dispatch(COMMANDS_ACTIONS.saveCodeSnippetRequest({codeSnippetContent, codeSnippetName}))
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledCodeBlockToolbar);