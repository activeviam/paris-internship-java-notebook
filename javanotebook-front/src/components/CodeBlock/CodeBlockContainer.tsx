import { connect } from "react-redux";

// import { push } from 'connected-react-router';

import { StyledCodeBlock } from './CodeBlock';

import { IStore } from '../../interfaces';

import { COMMANDS_ACTIONS } from '../../store/commands';

const mapStateToProps = (state: IStore) => {
    return {
        getCodeOutput: (id: number) => {
            if (state.commandReducer.codeOutput) {
                return state.commandReducer.codeOutput[id];
            }
            return null;
        },
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    processCommandRequest: (command: string, id: number) => dispatch(COMMANDS_ACTIONS.processingCommandRequest({command, id})),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledCodeBlock);