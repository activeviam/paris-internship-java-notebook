import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

import Button from '@material-ui/core/Button';

import { IProcessedCommand } from '../../interfaces';

interface INotebookPageState {
  code: string;
}

interface INotebookPageProps {
  codeOutput: IProcessedCommand[];
  processCommandRequest: (command: string) => void;
}

export class NotebookPage extends React.Component <INotebookPageProps, INotebookPageState> {


  public componentWillMount(){
    this.setState({code: "//type your code here"})
  }

  public handleSendCommand() {
    this.props.processCommandRequest(this.state.code);
    return;
  }

  public render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <div>
        <MonacoEditor
          width="800"
          height="600"
          language="java"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={(value, e) => this.onChangeValue(value, e)}
          editorDidMount={(editor) => this.editorDidMount(editor)}
        />

        <Button variant="contained" color="primary" className="App-ButtonSend" onClick={() => this.handleSendCommand()}>
          Send
        </Button>
        <div>
          {(this.props.codeOutput || []).map(((processedCommand, index) => 
              <div key={`${processedCommand.output}-${index}`}>
                <span>{`${processedCommand.status}:${processedCommand.output}`}</span>
              </div>
          ))}
        </div>
      </div>
    );
  }
  
  public editorDidMount = (editor:any) => {
    console.log("editor did mount");
  }

  public onChangeValue(newValue:any, e:any){
    this.setState({code: newValue});
    // console.log('onChange', newValue, e);
  }

}