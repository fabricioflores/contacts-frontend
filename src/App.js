import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import 'coupon-components/build/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Row, Col, Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, Modal } from 'coupon-components';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      contacts: [],
      modalIsOpen: false,
      contact: {
        name:'',
        phone:'',
        email: '',
        image: ''
      }
    };
    this.imagePlaceholder = 'https://i2.wp.com/drogaspoliticacultura.net/wp-content/uploads/2017/09/placeholder-user.jpg?w=550';
  }

  componentDidMount() {
    axios.get('contacts')
      .then(({data}) => {
        this.setState({contacts: data});
      });
  }

  addContact = () => {
    this.setState({modalIsOpen: true});
  }

  modalDismiss = () => {
    this.setState({modalIsOpen: false, contact: {
      name:'',
      phone:'',
      email: '',
      image: ''
    }});
  }

  onChange = (event) => {
    let value = event.target.value;
    this.setState({
      contact: {
        ...this.state.contact,
        [event.target.name]: value,
      }
    });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    var formData = new FormData();
    var imagefile = document.querySelector('#image');
    formData.append('name', this.state.contact.name);
    formData.append('email', this.state.contact.email);
    formData.append('phone', this.state.contact.phone);
    formData.append('image', imagefile.files[0]);

    axios.post('contacts', formData, {headers: {
      'Content-Type': 'multipart/form-data'
    }})
    .then(({data}) => {
      this.setState({ 
        contacts: this.state.contacts.concat([data]),
        contact: {
          name:'',
          phone:'',
          email: '',
          image: ''
        }
      });
      this.modalDismiss();
    });
  }
  
  render() {
    return (
      <Container>
        <Row>
          <Button outline onClick={this.addContact} color="primary">Add contact</Button>
        </Row>
        {(this.state.contacts || []).map((contact, i) => (
              <Col xs="12" key={i}>
              <Card>
                <div>
                  <Row>
                  <Col md="2">
                    <img className='image' alt='' src={contact.image || this.imagePlaceholder}></img>
                  </Col>
                  <Col md="10">
                    <div>{contact.name}</div>
                    <div><small>{contact.phone}</small></div>
                    <div><small>{contact.email}</small></div>
                  </Col>
                  </Row>
                </div>
              </Card>
              </Col>
            ))}
        <Modal isOpen={this.state.modalIsOpen} dismiss={this.modalDismiss}>
          <Form onChange={this.onChange} onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.contact.name} required/>
                </FormGroup>
                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input type="text" name="phone" id="phone" onChange={this.onChange} value={this.state.contact.phone} required/>
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.contact.email} required/>
                </FormGroup>
                <FormGroup>
                  <Label for="image">Image</Label>
                  <Input type="file" name="image" id="image" onChange={this.onChange} value={this.state.contact.image}/>
                </FormGroup>
                <Button outline type="submit" color="primary">Guardar</Button>
              </Form>
          </Modal>


      </Container>
    );
  }
}

export default App;
