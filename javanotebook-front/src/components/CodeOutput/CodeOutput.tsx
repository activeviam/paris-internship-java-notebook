import * as React from 'react';
import styled from 'styled-components';

import StyledOutputLine from './StyledOutputLine'

import { IProcessedCommand } from '../../interfaces'

interface ICodeOutputProps {
    codeOutput: IProcessedCommand[];
    className?: string;
}

class CodeOutput extends React.Component <ICodeOutputProps> {

    public render() {


        return(
            <div className={this.props.className}>
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


const StyledCodeOutput = styled(CodeOutput)`
    width: 100%;
`;

export { StyledCodeOutput };