import * as React from 'react';
import styled from 'styled-components';

import { CodeBlock, Title } from '../../components';


interface INotebookPageState {
  code: string;
}

interface INotebookPageProps {
  className?: string;
}

class NotebookPage extends React.Component <INotebookPageProps, INotebookPageState> {
  
  public render() {
    return (
      <div className={this.props.className}>
        <Title title={"Java Notebook"}/>
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
    padding: 50px;
  `;

export default StyledNotebookPage;