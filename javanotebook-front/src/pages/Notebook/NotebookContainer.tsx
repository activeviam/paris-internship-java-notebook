import { connect } from "react-redux";

// import { push } from 'connected-react-router';

import { NotebookPage } from './Notebook';

import { IStore } from '../../interfaces';

import { COMMANDS_ACTIONS } from '../../store/commands';

const mapStateToProps = (state: IStore) => {
    return {
        codeOutput: state.commandReducer.codeOutput,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    processCommandRequest: (command: string) => dispatch(COMMANDS_ACTIONS.processingCommandRequest({command})),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookPage);