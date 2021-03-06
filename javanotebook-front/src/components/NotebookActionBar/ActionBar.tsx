import * as React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';


interface IActionBarProps {
    addCodeBlock: () => void; 
    runAllCells: () => void;
    className?: string;
    restartJshell: () => void;
    saveNotebook: () => void;
    toggleDrawer: () => void;
    drawerState: boolean;
}

class ActionBar extends React.Component<IActionBarProps, {}> {

    public handleAddCodeBlock() {
        this.props.addCodeBlock();
    }

    public handleRunAllCells() {
        this.props.runAllCells()
    }

    public handleSaveNotebook() {
        this.props.saveNotebook();
    }

    public handleRestartJshell() {
        this.props.restartJshell();
    }
    public render() {
        return(
            <div className={this.props.className}>
                <Button color="primary" onClick={() => this.handleSaveNotebook()}>Save</Button>
                <Button color="primary"onClick={() => this.handleRestartJshell()}>Restart</Button>
                <Button color="primary" onClick={() => this.handleRunAllCells()}>Run all</Button>
                <Button color="primary" onClick={() => this.handleAddCodeBlock()}>New Cell</Button>
                <IconButton onClick={() => this.props.toggleDrawer()}>
                    {this.props.drawerState ? 
                        <ArrowForwardIos /> :
                        <ArrowBackIos />}
                </IconButton>
            </div>
        );
    }
}

const StyledActionBar = styled(ActionBar)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content:center;
    padding: 5px;
    background: grey;
    width: 100%;
    position: sticky;
    top: 0;
    z-index:1;
`
export default StyledActionBar;