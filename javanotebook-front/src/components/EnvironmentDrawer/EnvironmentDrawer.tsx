import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

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
                    <List>
                        <Typography variant="title"> Variables </Typography>
                    {(this.props.variables || []).map((value: IVariable, index: number) => {
                        return (
                            <div key={index}>
                                <ListItem>
                                    <Typography variant="h6">{value.typeName}: {value.name}</Typography>
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })}
                    </List>
                </Drawer>
        )
    }
}

export default EnvironmentDrawer;