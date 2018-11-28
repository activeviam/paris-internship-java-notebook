import * as React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import { CodeBlock, Title } from '../../components';


interface INotebookPageState {
  code: string;
}

interface INotebookPageProps {
  className?: string;
}

class NotebookPage extends React.Component <INotebookPageProps, INotebookPageState> {


  public handleAddCodeBlocks() {
    console.log("clicked");
  }
  
  public render() {
    return (
      <div className={this.props.className}>
        <Title title={"Java Notebook"}/>
        <Button variant="contained" color="primary" className="App-ButtonSend" onClick={() => this.handleAddCodeBlocks()}>
            +
        </Button>
        <CodeBlock />
        <CodeBlock />
      </div>
    );
  }

}

const StyledNotebookPage = styled(NotebookPage)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin: 50px;
  `;

export default StyledNotebookPage;