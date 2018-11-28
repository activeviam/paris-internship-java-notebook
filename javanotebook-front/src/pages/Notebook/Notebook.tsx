import * as React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import { CodeBlock, Title } from '../../components';


interface INotebookPageState {
  blockIds: number[];
}

interface INotebookPageProps {
  className?: string;
}

class NotebookPage extends React.Component <INotebookPageProps, INotebookPageState> {

  private static blockCount: number = 0;

  public constructor(props: INotebookPageProps) {
    super(props);
    this.state = { blockIds: [0]};
}

  public handleAddCodeBlocks() {
    NotebookPage.blockCount += 1;
    this.setState({blockIds: [...this.state.blockIds, NotebookPage.blockCount]})
  }
  
  public render() {
    return (
      <div className={this.props.className}>
        <Title title={"Java Notebook"}/>
        <Button variant="contained" color="primary" className="App-ButtonSend" onClick={() => this.handleAddCodeBlocks()}>
            +
        </Button>
        {(this.state.blockIds || []).map((id: number) => 
            <CodeBlock key={`${id}-block`} id={id}/>
        )}
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