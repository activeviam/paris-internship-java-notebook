import * as React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import { NotebookPage, NotebookSelectionPage} from './pages';

import { Header } from './components';

class App extends React.Component <{}, {}> {



  public render() {
    return (
      <div>
        <Header />
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
