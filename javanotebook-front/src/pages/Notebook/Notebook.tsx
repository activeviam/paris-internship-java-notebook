import * as React from 'react';

import { CodeBlock } from '../../components';


interface INotebookPageState {
  code: string;
}

// interface INotebookPageProps {
// }

export class NotebookPage extends React.Component <{}, INotebookPageState> {
  
  public render() {
    return (
      <div>
        <CodeBlock />
        <CodeBlock />
      </div>
    );
  }

}