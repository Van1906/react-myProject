import React from 'react';
import './App.css';
import ToDo from './componentsToDO/ToDo';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col xs={8} sm={8} md={6} lg={6}>
            <ToDo />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
