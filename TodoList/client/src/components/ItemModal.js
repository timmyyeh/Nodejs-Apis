import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }
    onSubmit = (e) => {
        console.log('hi');
        e.preventDefault();
        const newItem = {
            name: this.state.name
        }
        this.props.addItem(newItem);
        this.toggle();
    }
  render() {
    return (
      <div>
        <Button color='primary'
         outline
         onClick={this.toggle}>Add Item</Button>
         <Modal
         isOpen={this.state.modal}
         toggle={this.toggle}>
         <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
         <ModalBody>
             <Form onSubmit={this.onSubmit}>
             <FormGroup>
                 <Label for="item">Item</Label>
                 <Input type="text" name="name" id="item" placeholder="Add shopping item" onChange={this.onChange}></Input>
                 <Button color="dark">Add Item</Button>
             </FormGroup>
             </Form>
         </ModalBody>

         </Modal>
      </div>
    )
  }
}

export default connect(null, {addItem})(ItemModal);
