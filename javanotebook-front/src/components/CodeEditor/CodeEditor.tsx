import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import styled from 'styled-components';

import * as monaco from 'monaco-editor';


const MAX_EDITOR_HEIGHT = 500;

interface ICodeEditorProps {
    code: string;
    onChange: (value: string) => void;
    className?: string;
    getCompletionItem: () => monaco.languages.CompletionItem[];
    completionItemRequest: (codeContent: string, cursor: number) => void;
}

class CodeEditor extends React.Component <ICodeEditorProps, {}> {

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

    public handleEditorMount(editor: any) {
        console.log("editor******", editor);
        console.log("monaco!!!", monaco);
        editor._completionProvider = monaco.languages.registerCompletionItemProvider("java", {
            // triggerCharacters: [".", " ", "/"],
            provideCompletionItems: async (model, position) => {
                const textUntilPosition = model.getValueInRange({
                    startLineNumber: position.lineNumber,
                    startColumn: 1,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column,
                });

                await this.props.completionItemRequest(textUntilPosition, textUntilPosition.length);
                console.log(this.props.getCompletionItem());
                return this.props.getCompletionItem();
            }
        });
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
                editorDidMount={(editor) => this.handleEditorMount(editor)}
            />
        )
    }
}

const StyledCodeEditor = styled(CodeEditor)`
    margin: 10px;
    width: 100%;
`;

export { CodeEditor, StyledCodeEditor };