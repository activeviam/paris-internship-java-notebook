import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';


interface ICodeEditorProps {
    code: string;
    onChange: (value: string) => void;

}

export class CodeEditor extends React.Component <ICodeEditorProps, {}> {

    public onChangeCode(value: string) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    public render() {
        const code = this.props.code;
        const options = {
        selectOnLineNumbers: true
        };
        return (
            <MonacoEditor
                width="800"
                height="200"
                language="java"
                theme="vs-dark"
                value={code}
                options={options}
                onChange={(value, e) => this.onChangeCode(value)}
                editorDidMount={(editor) => ({})}
            />
        )
    }

}