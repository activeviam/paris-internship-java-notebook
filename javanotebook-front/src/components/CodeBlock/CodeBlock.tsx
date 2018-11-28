import * as React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';


import { IProcessedCommand } from '../../interfaces';

import { CodeEditor } from '../CodeEditor/CodeEditor';
import { StyledCodeOutput } from '../CodeOutput/CodeOutput';



// interface ICodeBlockState {
//     id: number;
// }

interface ICodeBlockProps {
    id: number;
    changeCodeContent: (id: number, codeContent: string) => void;
    getCodeSnippetRequest: (id: number, idSnippet: number) => void;
    getCodeOutput: (id: number) => IProcessedCommand[];
    processCommandRequest: (command: string, id: number) => void;
    saveCodeSnippetRequest: (codeSnippetContent: string, codeSnippetName: string) => void;
    className?: string;
    getCode: (id: number) => string;
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

    public handleSendCommand() {
        const code = this.props.getCode(this.props.id);
        this.props.processCommandRequest(code, this.props.id);
        return;
    }

    public handleSaveCode() {
        const code = this.props.getCode(this.props.id);
        const name = prompt("Enter a name for the snippet");
        if (name) {
            this.props.saveCodeSnippetRequest(code, name);
        } else {
            console.log("You must enter a valid name");
        }
        return;
    }
    
    public handleGetCodeSnippet() {
        const id = prompt("Enter id of the snippet to retreive");
        if (id) {
            this.props.getCodeSnippetRequest(this.props.id, Number(id));
        } else {
            console.log("Enter a valid id");
        }
    }

    public render() {
        const code = this.props.getCode(this.props.id);
        const codeOutput = this.props.getCodeOutput(this.props.id);
        return (
            <div className={this.props.className}>
                <CodeEditor code={code} onChange={(newCode) => this.onChangeCode(newCode)}/>

                <StyledButtonContainer>
                    <Button variant="contained" color="primary" className="App-ButtonSend" onClick={() => this.handleSendCommand()}>
                        Send
                    </Button>
                    <Button variant="contained" color="secondary" className="App-ButtonSend" onClick={() => this.handleSaveCode()}>
                        Save Code
                    </Button>
                    <Button variant="contained" color="secondary" className="App-ButtonSend" onClick={() => this.handleGetCodeSnippet()}>
                        Get Code
                    </Button>
                </StyledButtonContainer>
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

const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
`;

export  { StyledCodeBlock };