import { connect } from "react-redux";

import { default as NotebookSelectionPage } from './NotebookSelection';

import { IStore } from '../../interfaces';

import { NOTEBOOK_ACTIONS } from '../../store/notebooks';

const mapStateToProps = (state: IStore) => {
    const notebooks = state.notebookReducer.noteBooks;
    return {
        noteBooks: notebooks,
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    getNotebookList: () => dispatch(NOTEBOOK_ACTIONS.getNotebookRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookSelectionPage);