import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import styled from 'styled-components';


const MAX_EDITOR_HEIGHT = 500;

interface ICodeEditorProps {
    code: string;
    onChange: (value: string) => void;
    className?: string;
}

export class CodeEditor extends React.Component <ICodeEditorProps, {}> {

    public onChangeCode(value: string) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
        console.log("nb line", this.getNbLine());
    }

    public getNbLine(): number {
        return this.props.code ? (this.props.code.match(/\n/g) || []).length + 1 : 0;
    }

    public getEditorHeight(): number {
        return this.getNbLine() < 10 ? 200 : Math.min(MAX_EDITOR_HEIGHT, this.getNbLine()*20)
    }

    public render() {
        const code = this.props.code;
        const options = {
        selectOnLineNumbers: true
        };
        return (
            <MonacoEditor
                width="800"
                height={this.getEditorHeight()}
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

const StyledCodeEditor = styled(CodeEditor)`
    margin: 10px;
    width: 100%;
`;

export { StyledCodeEditor };