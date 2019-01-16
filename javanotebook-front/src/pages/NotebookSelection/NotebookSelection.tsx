import * as React from 'react';

import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { INotebook } from 'src/interfaces';
import { NotebookCard, Title } from '../../components';


interface INotebookSelectionPageProps {
    className?: string;
    createNewNotebook: (name: string, description?: string) => void;
    noteBooks: INotebook[];
    getNotebookList: () => void;
    openNotebook: (notebook: INotebook) => void;
}

class NotebookSelectionPage extends React.Component < INotebookSelectionPageProps, {}> {

    
    public constructor(props: INotebookSelectionPageProps) {
        super(props);
        this.props.getNotebookList();
    }

    public handleOpenNotebook(index: number){
        const noteBook: INotebook = this.props.noteBooks[index];
        this.props.openNotebook(noteBook);

    }

    public handleCreateNotebook(){
        const name = prompt("Please enter a name for your notebook");
        if (name) {
            const description = prompt("Please enter a description for your notebook");
            if (description) {
                this.props.createNewNotebook(name, description);
            } else {
                this.props.createNewNotebook(name);
            }
        } else {
            console.log("You must enter a valid name");
        }
        return;
    }

    public render() {
        console.log("render", this.props.noteBooks);
        return (

            <div className={this.props.className}>
                <Title title={"Notebook Selection"} />
                <Grid container={true} justify="flex-start">
                    {(this.props.noteBooks || []).map((notebook:any, index: number) => 
                        <NotebookCard
                            key={index}
                            id={notebook.id}
                            title={notebook.name}
                            description={notebook.description}
                            openNotebook={(num: number) => this.handleOpenNotebook(num)} />
                    )}
                </Grid>
                <ButtonContainer>
                    <Button variant="contained" color="primary" onClick={() => this.handleCreateNotebook()}>
                        +
                    </Button>
                </ButtonContainer>
            </div>
        )
    }
}

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledNotebookSelectionPage = styled(NotebookSelectionPage)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export default StyledNotebookSelectionPage;