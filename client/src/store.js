import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk]; //todos los middleware que usemos se pondrán aqui en un array


//createStore recibe 3 cosas: rootreducer, initial state y middleware (se encierra con un compose())
const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  //sirve para poner la extención de google
));

export default store;

