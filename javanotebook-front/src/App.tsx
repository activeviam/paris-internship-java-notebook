import * as React from 'react';
import './App.css';

import { NotebookPage } from './pages';

class App extends React.Component <{}, {}> {



  public render() {
    return (
      <div>
        <NotebookPage />
      </div>
    );
  }

}

export default App;
