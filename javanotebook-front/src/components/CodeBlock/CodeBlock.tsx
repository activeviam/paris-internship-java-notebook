import * as React from 'react';

import Button from '@material-ui/core/Button';


import { IProcessedCommand } from '../../interfaces';

import { CodeEditor } from '../CodeEditor/CodeEditor';



interface ICodeBlockState {
    code: string;
    id: number;
}

interface ICodeBlockProps {
    codeOutput: IProcessedCommand[];
    processCommandRequest: (command: string, id: number) => void;
}

export class CodeBlock extends React.Component <ICodeBlockProps, ICodeBlockState> {

    private static blockCount: number = 0;

    public constructor(props: ICodeBlockProps) {
        super(props);
        CodeBlock.blockCount += 1;
        this.state = {code: '// Enter your code here', id: CodeBlock.blockCount};
    }

    public onChangeCode(code: string) {
        this.setState({code});
        console.log("code", code);
    }

    public handleSendCommand() {
        console.log("clicked");
        this.props.processCommandRequest(this.state.code, this.state.id);
        return;
      }
    

    public render() {
        const code = this.state.code;
        return (
            <div>
                <CodeEditor code={code} onChange={(newCode) => this.onChangeCode(newCode)}/>

                <Button variant="contained" color="primary" className="App-ButtonSend" onClick={() => this.handleSendCommand()}>
                    Send
                </Button>
                <div>
                    {(this.props.codeOutput || []).map(((processedCommand, index) => 
                        <div key={`${processedCommand.output}-${index}`}>
                            <span>{`${processedCommand.status}:${processedCommand.output}`}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}