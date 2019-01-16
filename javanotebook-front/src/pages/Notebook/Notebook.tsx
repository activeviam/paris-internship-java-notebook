import * as React from 'react';
import styled from 'styled-components';

import { ActionBar, CodeBlock, Title } from '../../components';


/* interface INotebookPageState {
  blockIds: number[];
} */

interface INotebookPageProps {
  className?: string;
  blockIds: number[];
  addCodeBlock: (id: number) => void;
}

class NotebookPage extends React.Component <INotebookPageProps, {} > {

  private static blockCount: number = 0;

  public constructor(props: INotebookPageProps) {
    super(props);
    this.state = { blockIds: [0]};
}

  public handleAddCodeBlocks() {
    NotebookPage.blockCount += 1;
    this.props.addCodeBlock(NotebookPage.blockCount);
  }
  
  public render() {
    return (
      <div className={this.props.className}>
        <Title title={"Java Notebook"}/>
        <ActionBar 
          addCodeBlock={() => this.handleAddCodeBlocks()}/>
        {(this.props.blockIds || []).map((id: number) => 
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
  `;

export default StyledNotebookPage;