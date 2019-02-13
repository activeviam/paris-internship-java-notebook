import * as React from 'react';


import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';

import { Code, Delete, PlayArrow, Save} from '@material-ui/icons';


interface ICodeBlockToolbar {
    id: number;
    saveCodeSnippetRequest: (codeSnippetContent: string, codeSnippetName: string) => void;
    processCommandRequest: (command: string, id: number, notebookId: number) => void;
    getCodeSnippetRequest: (id: number, idSnippet: number) => void;
    getCode: (id: number) => string;
    deleteCodeBlock: (id: number) => void;
    notebookId: number;
    className?: string;
}

class CodeBlockToolbar extends React.Component <ICodeBlockToolbar, {} >{

    public handleSendCommand(){
        const code = this.props.getCode(this.props.id);
        this.props.processCommandRequest(code, this.props.id, this.props.notebookId);
        return;
    }

    public handleSaveCode(){
        const code = this.props.getCode(this.props.id);
        const name = prompt("Enter a name for the snippet");
        if (name) {
            this.props.saveCodeSnippetRequest(code, name);
        } else {
            console.log("You must enter a valid name");
        }
        return;
    }

    public handleDeleteCodeBlock() {
        this.props.deleteCodeBlock(this.props.id);
        return;
    }

    public handleGetCodeSnippet(){
        const id = prompt("Enter id of the snippet to retrieve");
        if (id) {
            this.props.getCodeSnippetRequest(this.props.id, Number(id));
        } else {
            console.log("Enter a valid id");
        }
        return;
    }

    public render() {
        return (
            <div className={this.props.className}>
                <IconButton color="secondary" onClick={() => this.handleSendCommand()}>
                    <PlayArrow />
                </IconButton>
                <IconButton color="secondary" onClick={() => this.handleSaveCode()}>
                    <Save />
                </IconButton>
                <IconButton color="secondary" onClick={() => this.handleGetCodeSnippet()}>
                    <Code />
                </IconButton>
                <IconButton color="secondary" onClick={() => this.handleDeleteCodeBlock()}>
                    <Delete />
                </IconButton>
            </div>
        )
    }
}

const StyledCodeBlockToolbar = styled(CodeBlockToolbar)`
    display: flex;
    width: 100%;
    height: 30px;
    background: grey;
    flex-direction: row-reverse;
    align-content: center;
    align-items: center;
`;

export { StyledCodeBlockToolbar };