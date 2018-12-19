import * as React from 'react';
import styled from 'styled-components';

interface INotebookSelectionPagePropes {
    className?: string;
    noteBooks: any[];
}

class NotebookSelectionPage extends React.Component < INotebookSelectionPagePropes, {}> {

        public render() {
            return (
                <div className={this.props.className}>
                    <ul>
                        {(this.props.noteBooks || []).map((notebook:any, index: number) =>
                            <li key={`${index}-notebook`}>{notebook.title}</li>)}
                    </ul>
                </div>
            )
        }
}

export default NotebookSelectionPage;