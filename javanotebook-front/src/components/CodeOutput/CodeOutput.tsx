import * as React from 'react';

import StyledOutputLine from './StyledOutputLine'

import { IProcessedCommand } from '../../interfaces'

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
                            <StyledOutputLine status={codeOutput.status} output={codeOutput.output} key={index}/>
                        )
                    })
                }
            </div>
        );
    }
}