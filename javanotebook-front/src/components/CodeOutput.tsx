import * as React from 'react';

import { IProcessedCommand } from '../interfaces'

interface ICodeOutputProps {
    codeOutput: IProcessedCommand[];
}

export class CodeOutput extends React.Component <ICodeOutputProps> {

    public render() {
        return(
            <div>
                {
                    (this.props.codeOutput || []).map((codeOutput, index) => {
                        return(
                            <div key={index}>
                                <div className="status">
                                    {codeOutput.status}
                                </div>
                                <pre className="code_output">
                                    {codeOutput.output}
                                </pre>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}