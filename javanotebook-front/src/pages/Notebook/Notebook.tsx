import * as React from 'react';
import styled from 'styled-components';

import { ActionBar, CodeBlock, EnvironmentDrawer } from '../../components';

import { INotebook } from 'src/interfaces';


interface INotebookPageState {
  blockIds: number[];
  drawerState: boolean;
} 

interface INotebookPageProps {
  className?: string;
  blockIds: number[];
  notebook: INotebook;
  codeBlocks: any;
  addCodeBlock: (id: number) => void;
  currentVariables: (notebookId: number) => void;
  saveNotebook: (notebook: INotebook) => void;
}

class NotebookPage extends React.Component <INotebookPageProps, INotebookPageState > {

  private static blockCount: number = 0;
  public drawerState: boolean = false;

  public constructor(props: INotebookPageProps) {
    super(props);
    this.state = { blockIds: [0], drawerState: false};
  }

  
  public handleToggleDrawer(){
    const drawerState = !this.state.drawerState;
    console.log(this.state.drawerState);
    this.setState({drawerState});
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
          saveNotebook={() => this.handleSaveNotebook()}
          toggleDrawer={() => this.handleToggleDrawer()}
          drawerState={this.state.drawerState}/>
        <EnvironmentDrawer open={this.state.drawerState} />
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