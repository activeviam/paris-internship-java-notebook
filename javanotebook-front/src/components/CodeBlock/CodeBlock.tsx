import * as React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';


import { IProcessedCommand } from '../../interfaces';

import { CodeEditor } from '../CodeEditor/CodeEditor';
import { StyledCodeOutput } from '../CodeOutput/CodeOutput';



interface ICodeBlockState {
    code: string;
    id: number;
}

interface ICodeBlockProps {
    // codeOutput: IProcessedCommand[];
    getCodeOutput: (id: number) => IProcessedCommand[];
    processCommandRequest: (command: string, id: number) => void;
    className?: string;
}

class CodeBlock extends React.Component <ICodeBlockProps, ICodeBlockState> {

    private static blockCount: number = 0;

    public constructor(props: ICodeBlockProps) {
        super(props);
        CodeBlock.blockCount += 1;
        this.state = {code: '// Enter your code here', id: CodeBlock.blockCount};
    }

    public onChangeCode(code: string) {
        this.setState({code});
    }

    public handleSendCommand() {
        this.props.processCommandRequest(this.state.code, this.state.id);
        return;
      }
    

    public render() {
        const code = this.state.code;
        const codeOutput = this.props.getCodeOutput(this.state.id);
        return (
            <div className={this.props.className}>
                <CodeEditor code={code} onChange={(newCode) => this.onChangeCode(newCode)}/>

                <Button variant="contained" color="primary" className="App-ButtonSend" onClick={() => this.handleSendCommand()}>
                    Send
                </Button>
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