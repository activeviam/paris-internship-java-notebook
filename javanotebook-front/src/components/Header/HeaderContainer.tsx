
import { connect } from "react-redux";

import { push } from 'connected-react-router';

import { default as Header } from './Header';

import { IStore } from '../../interfaces';

const mapStateToProps = (state: IStore) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    goToHome: () => dispatch(push('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);