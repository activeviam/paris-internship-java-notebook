import * as React from 'react';
import styled from 'styled-components';

interface ITitleProps {
    className?: string;
    title: string;
}

class Title extends React.Component <ITitleProps> {
    public render() {
        return <div className={this.props.className}>{this.props.title}</div>;
    }
}

const StyledTitle = styled(Title)`
    font-size: 2em;
    color: black;
    text-align: center;
    padding: 10px;
`;

export default StyledTitle;