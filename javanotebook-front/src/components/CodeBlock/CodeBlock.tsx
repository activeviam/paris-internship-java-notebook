import * as React from 'react';
import styled from 'styled-components';

import { IProcessedCommand } from '../../interfaces';

import { default as Toolbar } from '../CodeBlockToolbar/CodeBlockToobarContainer';

import { CodeEditor } from '../CodeEditor/CodeEditor';
import { StyledCodeOutput } from '../CodeOutput/CodeOutput';

import * as monaco from 'monaco-editor';

// interface ICodeBlockState {
//     id: number;
// }

interface ICodeBlockProps {
    id: number;
    changeCodeContent: (id: number, codeContent: string) => void;
    getCodeOutput: (id: number) => IProcessedCommand[];
    className?: string;
    getCode: (id: number) => string;
    getCompletionItem: () => monaco.languages.CompletionItem[];
    completionItemRequest: (notebookId: number, codeContent: string, cursor: number) => void;
    notebookId: number;
}

class CodeBlock extends React.Component <ICodeBlockProps, {}> {

    private static blockCount: number = 0;

    public constructor(props: ICodeBlockProps) {
        super(props);
        CodeBlock.blockCount += 1;
        this.state = { id: CodeBlock.blockCount};
    }

    public onChangeCode(code: string) {
        this.props.changeCodeContent(this.props.id, code);
    }
 
    public render() {
        const code = this.props.getCode(this.props.id);
        const codeOutput = this.props.getCodeOutput(this.props.id);
        return (
            <div className={this.props.className}>
                <Toolbar id={this.props.id} />
                <CodeEditor code={code} onChange={(newCode) => this.onChangeCode(newCode)} 
                    getCompletionItem={() => this.props.getCompletionItem()}
                    completionItemRequest={(codeContent: string, cursor: number) => this.props.completionItemRequest(this.props.notebookId, codeContent, cursor)}/>
                <StyledCodeOutput codeOutput={codeOutput}/>
            </div>
        )
    }
}

const StyledCodeBlock = styled(CodeBlock)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin: 20px;
`;

export  { StyledCodeBlock };