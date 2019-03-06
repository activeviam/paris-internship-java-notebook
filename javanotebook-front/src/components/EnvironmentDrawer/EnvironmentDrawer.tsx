import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import {IVariable} from '../../interfaces';

import { Styled } from "./EnvironmentDrawer.style";


interface IEnvironmentDrawerProps {
    open: boolean;
    variables?: IVariable[];
    imports?: string[];
}


class EnvironmentDrawer extends React.Component <IEnvironmentDrawerProps, {} > {


    public render() {
        return (
                <Drawer
                    variant="persistent"
                    anchor="right"
                    open={this.props.open}>
                    <List>
                        <Typography variant="title"> Imports </Typography>
                        {(this.props.imports || []).map((value: string, index: number) => {
                            return (
                                <div key={index}>
                                    <ListItem>
                                        <Typography variant="h6">{value}</Typography>
                                    </ListItem>
                                </div>
                            );
                        })}
                    </List>
                    <List>
                        <Typography variant="title"> Variables </Typography>
                    {(this.props.variables || []).map((value: IVariable, index: number) => {
                        return (
                            <div key={index}>
                                <ListItem>
                                    <Styled.ItemValue>
                                        <Typography variant="h6">{value.typeName}: {value.name} </Typography>
                                        <Typography variant="h6">{value.value}</Typography>
                                    </Styled.ItemValue>
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