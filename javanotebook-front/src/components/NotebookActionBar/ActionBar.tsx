import * as React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';


interface IActionBarProps {
    addCodeBlock: () => void; 
    className?: string;
}

class ActionBar extends React.Component<IActionBarProps, {}> {

    public handleAddCodeBlock() {
        this.props.addCodeBlock();
    }
    public render() {
        return(
            <div className={this.props.className}>
                <Button color="primary">Save</Button>
                <Button color="primary">Restart</Button>
                <Button color="primary">Run all</Button>
                <Button color="primary" onClick={() => this.handleAddCodeBlock()}>New Cell</Button>
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