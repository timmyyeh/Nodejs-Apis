import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS } from '../actions/types'

const initialState = {
    items: [
        { id: uuid(), name: 'Eggs' },
        { id: uuid(), name: 'Apples' },
        { id: uuid(), name: 'Coke' },
        { id: uuid(), name: 'Pepsi' },
    ]
}