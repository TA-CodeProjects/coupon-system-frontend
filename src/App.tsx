import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './App.css';
import Footer from './Components/LayoutArea/Footer/Footer';
import Header from './Components/LayoutArea/Header/Header';
import Main from './Components/LayoutArea/Main/Main';


function App() {
  return (
    <div className="App">
      <Container fluid className="px-0">
        <Header />
        <Main />
        <Footer/>
      </Container>
    </div>
  );
}

export default App;
