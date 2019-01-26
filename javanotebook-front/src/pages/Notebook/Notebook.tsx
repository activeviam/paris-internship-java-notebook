import * as React from 'react';
import styled from 'styled-components';

import { ActionBar, CodeBlock } from '../../components';

import { INotebook } from 'src/interfaces';


/* interface INotebookPageState {
  blockIds: number[];
} */

interface INotebookPageProps {
  className?: string;
  blockIds: number[];
  notebook: INotebook;
  codeBlocks: any;
  addCodeBlock: (id: number) => void;
  currentVariables: (notebookId: number) => void;
  saveNotebook: (notebook: INotebook) => void;
}

class NotebookPage extends React.Component <INotebookPageProps, {} > {

  private static blockCount: number = 0;

  public constructor(props: INotebookPageProps) {
    super(props);
    this.state = { blockIds: [0]};
  }

  public handleSaveNotebook() {
    console.log("codeBlocks", this.props.codeBlocks);
    const newNotebook: INotebook = this.props.notebook;
    newNotebook.codeSnippets = this.props.blockIds.map((id: number, index) => {
      return this.props.codeBlocks[id].codeContent || "";
    })
    this.props.saveNotebook(newNotebook);
  }

  public handleAddCodeBlocks() {
    NotebookPage.blockCount += 1;
    this.props.addCodeBlock(NotebookPage.blockCount);
  }

  public handleRunAllCells(){
    // TODO: implement action to run all cells

    // reload the variables when all cells are re-run
    this.props.currentVariables(this.props.notebook.id);
  }
  
  public render() {
    return (
      <div className={this.props.className}>
        <ActionBar 
          addCodeBlock={() => this.handleAddCodeBlocks()}
          runAllCells={() => this.handleRunAllCells()}
          saveNotebook={() => this.handleSaveNotebook()}/>
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