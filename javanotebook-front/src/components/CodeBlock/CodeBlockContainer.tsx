import { connect } from "react-redux";

// import { push } from 'connected-react-router';

import { StyledCodeBlock } from './CodeBlock';

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
        getCodeOutput: (id: number) => {
            if (state.commandReducer.codeBlocks && state.commandReducer.codeBlocks[id]) {
                return state.commandReducer.codeBlocks[id].codeOutput;
            }
            return null;
        },
        getCompletionItem: () => {
            return state.commandReducer.completionItems || [];
        },
        notebookId: state.commandReducer.currentNotebook,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    changeCodeContent: (id: number, codeContent: string) => dispatch(COMMANDS_ACTIONS.changeCodeContent({id, codeContent})),
    completionItemRequest: (notebookId: number, codeContent: string, cursor: number) => dispatch(COMMANDS_ACTIONS.completionItemsRequest({notebookId, codeContent, cursor})),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledCodeBlock);