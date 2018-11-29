import { connect } from "react-redux";

// import { push } from 'connected-react-router';

import StyledNotebookPage from './Notebook';

import { IStore } from '../../interfaces';

import { COMMANDS_ACTIONS } from '../../store/commands'

const mapStateToProps = (state: IStore) => {
    const codeBlocks = state.commandReducer.codeBlocks ? state.commandReducer.codeBlocks : {};
    return {
        blockIds: Object.keys(codeBlocks).filter(key => codeBlocks[key]!== null).map(key => Number(key)),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    addCodeBlock: (id: number) => dispatch(COMMANDS_ACTIONS.addCodeBlock({id})),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledNotebookPage);