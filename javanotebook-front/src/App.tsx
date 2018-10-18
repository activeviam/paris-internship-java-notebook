import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import './App.css';



class App extends React.Component <{}, {code:string}> {
  
  constructor(props:any) {
    super(props);
    this.state = {
      code: "//type your code here"
    }
  }

  public render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <MonacoEditor
        width="800"
        height="600"
        language="java"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChangeValue}
        editorDidMount={this.editorDidMount}
      />
    );
  }
  
  public editorDidMount = (editor:any) => {
    console.log("editor did mount");
  }

  public onChangeValue(newValue:any, e:any){
    console.log('onChange', newValue, e);
  }

}

export default App;
