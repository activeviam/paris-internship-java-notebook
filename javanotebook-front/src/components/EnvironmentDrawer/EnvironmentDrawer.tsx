import * as React from 'react';

import Drawer from '@material-ui/core/Drawer';

import {IVariable} from '../../interfaces';


interface IEnvironmentDrawerProps {
    open: boolean;
    variables?: IVariable[];
}


class EnvironmentDrawer extends React.Component <IEnvironmentDrawerProps, {} > {


    public render() {
        return (
                <Drawer
                    variant="persistent"
                    anchor="right"
                    open={this.props.open}>
                    {(this.props.variables || []).map((value: IVariable, index: number) => {
                        return <div key={index}>{value.typeName}: {value.name} </div>;
                    })}
                </Drawer>
        )
    }
}

export default EnvironmentDrawer;