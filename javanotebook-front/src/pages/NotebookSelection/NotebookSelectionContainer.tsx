import { connect } from "react-redux";

import { default as NotebookSelectionPage } from './NotebookSelection';

import { INotebook, IStore} from '../../interfaces';

import { NOTEBOOK_ACTIONS } from '../../store/notebooks';

import { COMMANDS_ACTIONS } from '../../store/commands';

const mapStateToProps = (state: IStore) => {
    const notebooks = state.notebookReducer.noteBooks;
    return {
        noteBooks: notebooks,
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    createNewNotebook: (name: string, description?: string) => dispatch(NOTEBOOK_ACTIONS.createNewNotebookRequest({name, description})),
    getNotebookList: () => dispatch(NOTEBOOK_ACTIONS.getNotebookRequest()),
    openNotebook: (notebook: INotebook) => dispatch(COMMANDS_ACTIONS.openNotebook({notebook})),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookSelectionPage);