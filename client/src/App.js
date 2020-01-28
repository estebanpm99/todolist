import React, { Component } from 'react';
import AppNavbar from './Components/AppNavbar';
import TodoList from './Components/TodoList';
import TaskModal from './Components/TaskModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { laodUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(laodUser());
  }

    render(){
      return (
        <Provider store={store}>
          <div className="App">
            <AppNavbar />
            <Container>
              <TaskModal />
              <TodoList />
            </Container>
          </div>
        </Provider>
      );
  }
}


export default App;
