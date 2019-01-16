

import * as React from 'react';
import styled from 'styled-components';

import { Styled } from './Header.style';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

// import ErrorIcon from '@material-ui/icons/Error';
import HomeIcon from '@material-ui/icons/Home';


interface IHeaderState {
    open: boolean;
    anchorEl: any;
}

interface IHeaderProps {
    className?: string;
    goToHome: () => void;
}


class Header extends React.Component<IHeaderProps, IHeaderState>  {

    constructor(props: IHeaderProps){
        super(props);
        this.state = {open: false, anchorEl: null};
    }

    public handleHomeClick(event: any) {
        console.log("home");
        this.props.goToHome();
    }

    public render() {
        return (
            <AppBar position="static" className={this.props.className}>
                <Toolbar className="ToolBar">
                    <IconButton 
                        color="inherit" 
                        onClick={(event) => this.handleHomeClick(event)}
                        >
                    <HomeIcon />
                    </IconButton>
                    <Styled.AppTitle >
                        JAVA Notebook
                    </Styled.AppTitle>
                    {/* <div>
                        <IconButton
                        color="inherit"
                        >
                        <ErrorIcon />
                        </IconButton>
                    </div> */}
                </Toolbar>
            </AppBar>
        );
    }
}

export default styled(Header)`${Styled.HeaderStyle}`
