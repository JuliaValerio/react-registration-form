import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap/'
import Card from './Components/Card/Card';
import Header from './Components/Header/Header';
import Home from './pages/Home'


const App = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="App">
    <Header />
    <Button className="mt-5 my-5" variant="primary" onClick={() => setModalShow(true)}>
       Cadastre-se
      </Button>
      <Card 
      show={modalShow}
      onHide={() => setModalShow(false)}/>
      <Home />
    </div>

  );
}

export default App;