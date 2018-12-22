import * as React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { NotebookCard, Title } from '../../components';


interface INotebookSelectionPageProps {
    className?: string;
    noteBooks: any[];
    getNotebookList: () => void;
    createNewNotebook: () => void;
}

class NotebookSelectionPage extends React.Component < INotebookSelectionPageProps, {}> {

    
    public constructor(props: INotebookSelectionPageProps) {
        super(props);
        this.props.getNotebookList();
    }

    public handleCreateNotebook(){}

    public render() {
        return (

            <div>
                <Title title={"Notebook Selection"} />
                <Grid container={true} justify="flex-start">
                    {(this.props.noteBooks || []).map((notebook:any, index: number) => 
                        <NotebookCard key={index} id={notebook.id} title={notebook.title} />
                    )}
                </Grid>
                <Button color="primary" onClick={() => this.handleCreateNotebook()}>
                    +
                </Button>
            </div>
        )
    }
}

export default NotebookSelectionPage;