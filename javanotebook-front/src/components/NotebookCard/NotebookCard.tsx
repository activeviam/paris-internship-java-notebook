import * as React from 'react';

import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface  INotebookCardProps {
    className?: string;
    id: number;
    title: string;
    description?: string;
    openNotebook: (index: number) => void;
}

class NotebookCard extends React.Component <INotebookCardProps, {}> {

    public handleOpenNotebook() {
        this.props.openNotebook(this.props.id);
        return;
    }

    public render() {
        return (
        <div className={this.props.className}>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom={true} variant="h5" component="h2">
                            {this.props.title}
                        </Typography>
                        <Typography component="p">
                            {this.props.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => this.handleOpenNotebook()}>
                        Open Notebook
                    </Button>
                </CardActions>
            </Card>
        </div>
        )
    }
}

const StyledNotebookCard = styled(NotebookCard)`
    padding: 20px;
`
export default StyledNotebookCard;

