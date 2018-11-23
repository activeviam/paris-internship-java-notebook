import { connect } from "react-redux";

// import { push } from 'connected-react-router';

import { NotebookPage } from './Notebook';

import { IStore } from '../../interfaces';

const mapStateToProps = (state: IStore) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookPage);