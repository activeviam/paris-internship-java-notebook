import { connect } from "react-redux";

// import { push } from 'connected-react-router';

import StyledNotebookPage from './Notebook';

import { INotebook, IStore } from '../../interfaces';

import { COMMANDS_ACTIONS } from '../../store/commands'

const mapStateToProps = (state: IStore) => {
    const codeBlocks = state.commandReducer.codeBlocks ? state.commandReducer.codeBlocks : {};
    const variables = state.commandReducer.variables ? state.commandReducer.variables : [];
    const notebook = state.commandReducer.currentNotebook && state.notebookReducer.noteBooks ? 
            state.notebookReducer.noteBooks.filter((notebook1: INotebook) => (notebook1.id === state.commandReducer.currentNotebook))[0]
        : null;
    return {
        blockIds: Object.keys(codeBlocks).filter(key => codeBlocks[key]!== null).map(key => Number(key)),
        notebook,
        codeBlocks,
        variables,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    addCodeBlock: (id: number) => dispatch(COMMANDS_ACTIONS.addCodeBlock({id})),
    currentVariables: (notebookId: number) => dispatch(COMMANDS_ACTIONS.currentVariablesRequest({notebookId})),
    restartJshell: (notebookId: number) => dispatch(COMMANDS_ACTIONS.restartJShellRequest({notebookId})),
    saveNotebook: (notebook: INotebook) => dispatch(COMMANDS_ACTIONS.saveNotebookRequest({notebook})),
    runAllRequest: (commandsAndIds: Array<{command: string, id: number}>, notebookId: number) => dispatch(COMMANDS_ACTIONS.runAllRequest({commandsAndIds, notebookId})),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledNotebookPage);