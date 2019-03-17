import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

export default class ShoppingList extends Component {
    state = {
        items: [
            { id: uuid(), name: 'Eggs' },
            { id: uuid(), name: 'Apples' },
            { id: uuid(), name: 'Coke' },
            { id: uuid(), name: 'Pepsi' },
        ]
    }
    render() {
        const { items } = this.state;
        return (
            <Container>
                <Button color="primary"
                    style={{marginBottom: '2rem'}}
                    outline
                    onClick={() => {
                        const name = prompt('Enter Item');
                        if (name != null) {
                            this.setState(state => {
                                return { items: [...state.items, { id: uuid(), name }] };
                            });
                        }
                    }}>
                    Add Item
          </Button>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({id, name}) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={()=>{
                                        this.setState(state => {
                                           return {items: state.items.filter(item => item.id !== id)}
                                        });
                                    }}>
                                    &times;
                                </Button>
                                {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}
