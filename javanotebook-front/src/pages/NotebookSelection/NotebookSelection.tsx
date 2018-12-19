import * as React from 'react';
<<<<<<< Updated upstream
import styled from 'styled-components';
=======

import Grid from '@material-ui/core/Grid';

import { NotebookCard, Title } from '../../components';
>>>>>>> Stashed changes

interface INotebookSelectionPagePropes {
    className?: string;
    noteBooks: any[];
}

class NotebookSelectionPage extends React.Component < INotebookSelectionPagePropes, {}> {

        public render() {
            return (
<<<<<<< Updated upstream
                <div className={this.props.className}>
                    <ul>
                        {(this.props.noteBooks || []).map((notebook:any, index: number) =>
                            <li key={`${index}-notebook`}>{notebook.title}</li>)}
                    </ul>
=======
                <div>
                    <Title title={"Notebook Selection"} />
                    <Grid container={true} justify="flex-start">
                        {(this.props.noteBooks || []).map((notebook:any, index: number) => 
                            <NotebookCard key={index} id={notebook.id} title={notebook.title} />
                        )}
                    </Grid>
>>>>>>> Stashed changes
                </div>
            )
        }
}

export default NotebookSelectionPage;