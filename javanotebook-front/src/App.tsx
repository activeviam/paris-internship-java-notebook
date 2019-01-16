import * as React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import { NotebookPage, NotebookSelectionPage} from './pages';

class App extends React.Component <{}, {}> {



  public render() {
    return (
      <div>
        <Switch>
          <Route path='/notebookSelection' component={NotebookSelectionPage} />
          <Route path="/notebook" component={NotebookPage} />
          <Route path='/' exact={true} component={NotebookSelectionPage} />

        </Switch>
      </div>
    );
  }

}

export default App;
