import * as React from 'react';

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
    openNotebook: (index: number) => void;
}

class NotebookCard extends React.Component <INotebookCardProps, {}> {

    public handleOpenNotebook() {
        this.props.openNotebook(this.props.id);
        return;
    }

    public render() {
        return (
        <Card className={this.props.className}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom={true} variant="h5" component="h2">
                        {this.props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => this.handleOpenNotebook()}>
                    Open Notebook
                 </Button>
            </CardActions>
        </Card>
        )
    }
}

export { NotebookCard };