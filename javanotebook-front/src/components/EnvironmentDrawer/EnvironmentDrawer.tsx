import * as React from 'react';

import Drawer from '@material-ui/core/Drawer';


interface IEnvironmentDrawerProps {
    open: boolean;
}


class EnvironmentDrawer extends React.Component <IEnvironmentDrawerProps, {} > {


    public render() {
        return (
                <Drawer
                    variant="persistent"
                    anchor="right"
                    open={this.props.open}>
                    <div>Very very long sentence for testing purposes</div>
                </Drawer>
        )
    }
}

export default EnvironmentDrawer;