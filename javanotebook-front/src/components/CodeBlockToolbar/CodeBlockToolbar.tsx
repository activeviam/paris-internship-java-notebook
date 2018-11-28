import * as React from 'react';

import Button from '@material-ui/core/Button';


interface ICodeBlockToolbar {
    id: number;
    saveCodeSnippetRequest: (codeSnippetContent: string, codeSnippetName: string) => void;
    processCommandRequest: (command: string, id: number) => void;
    getCodeSnippetRequest: (id: number, idSnippet: number) => void;
    getCode: (id: number) => string;
}

class CodeBlockToolbar extends React.Component <ICodeBlockToolbar, {} >{

    public handleSendCommand(){
        const code = this.props.getCode(this.props.id);
        this.props.processCommandRequest(code, this.props.id);
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
            <div>
                <Button color="primary" onClick={() => this.handleSendCommand()}>
                    Send
                </Button>
                <Button color="secondary" onClick={() => this.handleSaveCode()}>
                    Save Code
                </Button>
                <Button color="secondary" onClick={() => this.handleGetCodeSnippet()}>
                    Get Code
                </Button>
            </div>
        )
    }
}

export { CodeBlockToolbar };