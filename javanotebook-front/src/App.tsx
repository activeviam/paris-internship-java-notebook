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
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
      />
    );
  }

  // private editorDidMount(editor:any){
  //   console.log("editorDidMount", editor);
  //   editor.focus();
  // }

  // private onChangeValue(newValue:string, e:Event){
  //   console.log('onChange', newValue, e);
  // }

}

export default App;
