import { createStore, combineReducers,configureStore} from "@reduxjs/toolkit";
import { Reducer } from "react";
import thunk from "redux-thunk";
import { moviesReducer } from "../reducers/moviesReducer";

// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// interface Reducers{
//   movies: Reducer<CounterState, AnyAction>
// }

const reducers = combineReducers({
  movies:moviesReducer
});

export const store = createStore(reducers)

//   composeEnhancers(applyMiddleware(thunk))

