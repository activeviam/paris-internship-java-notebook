import * as React from 'react';
import styled from 'styled-components';

interface IOutputLineProps {
    status: string;
    output: string;
    className?: string;
}

class OutputLine extends React.Component<IOutputLineProps, {}> {
    public render() {
        return <pre className={this.props.className}>{this.props.output}</pre>;
    }
}

const StyledOutputLine = styled(OutputLine)`
    color: ${props => props.status === "VALID" ? "black":"red"};
    border: ${props => props.status === "VALID" ? "2px solid green" : "2px solid red"};
    background: ${props => props.status === "VALID" ? "rgba( 0, 220, 0, 0.1)" : "rgba( 220, 0, 0, 0.1)"};
    margin: 5px;
    padding: 10px;
`;

export default StyledOutputLine;