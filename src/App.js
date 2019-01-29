import React, { Component } from 'react';
import './App.css';
import Container from "./components/Container";
import location_data from './locations';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Container markers={location_data}>
        </Container>
      </div>
    );
  }
}

export default App;
