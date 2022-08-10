# Redux Toolkit Tutorial

## Intro

- `What is Redux`: It is a predictable state container for JS apps
- `State Container`: It stores the state of the application, which is shared by all the individual components of that app.
- `Predictable`: A pattern is enforced to ensure all state transitions are explicit and can be tracked, hence making changes predictable.

- `What is Redux Toolkit`: It is the official, opinionated, batteries-included toolset for efficient Redux development. It is an abstraction on top of Redux to simplify development using Redux. The _React Redux_ connects Redux toolkit to React. It provides bindings to use React and Redux Toolkit together in an application.

## Redux

### Three Core Concepts

- `Store`: Holds the state of your application
- `Action`: Describes what happened in the application
- `Reducer`: Handled the action and decides how to update the state.

### Three Fundamental Principles of Redux

1. _The global state of your application is stored as an object inside a single store_. In other words, maintain the application state in a single object which would be managed by the Redux store.

2. _The only way to change the state is to dispatch an action, an object that describes what happened._ To update the state of your app, you need to let Redux know about that with an action. Directly updating the state object is not allowed.

3. _To specify how the state tree is updated based on actions, you write pure reducers._ Reducers are functions which take as parameter the previous state and the action and returns a new state.

<div style="text-align: center;">

![alt Redux Image](./redux_diagram.png "Redux principles visualization")
</div>

## Actions

- Are the only way the application can interact with the store.
- Carry some information from the app to the Redux store.
- Plain Javascript objects.
- Have a type property that describes something that happened in the application.
- The type property is typically defined as string constants.
- Use action creators instead of directly passing the action object. This allows for easier changes down the line since the action is created from a single place.

## Reducers

- Specify how the app's state changes in response to actions sent to the store.
- Function that accepts state and actions as arguments, and returns the next state of the application.

## Redux Store

- One store for the entire application.
- Holds application state.
- Allows access to the state via `getState()`.
- Allows state to updated via `dispatch(action)`.
- Allows listeners via `subscribe(listener)`.
- Handles unregistration of listeners via the function returned by `subscribe(listener)`.

## Bind Action Creators

- Helps simplify the process of calling actions.
- Refer to [`index.js`](./redux-demo/index.js) for how to use them.
- They are not very neccesary though feel free to not use them if you do not like it.

## Using Multiple Reducers

- For the maintainability of the code, it is a good idea to have seperate reducers for different states. This helps debugging too by seperating concerns.
- To do this we need to combine the reducer to pass them to the createStore method.
- We can do that using the `combineReducer` method which takes an object contianing a key/pair value for each reducer.
- The convention is to call the combined reducer resulting from using combineReducer, `rootReducer`.

```js
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer);
```

- The corresponding global looks as such:

```js
{ cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 20 } }
```

- `cake` and `iceCream`correspond to the keys passed in the combineReducer method.

## The IMMER Library

- When working with complex states containing multiple nested objects, it can really complicated to updated the states in the reducers.
- The example below shows an example.

```js
const streetReducer = (state = initialState, action) => {
    switch(action.type) {
        case STREET_UPDATED:
            return {
                ...state,
                address: {
                    ...state.address,
                    street: action.payload
                }
            }
        default:
            return state;
    }
}
```

- To avoid the struggle of updating the states using the spread operator, we can use the `Immer` library.
- It has the `produce` method which takes two parameters, the current state and a callback which has as parameter the draft, which is like a mutable copy of the current state which allows us to modify it directly.

```js
const streetReducer = (state = initialState, action) => {
    switch(action.type) {
        case STREET_UPDATED:
            return produce(state, (draft) => {
                draft.address.street = action.payload;
            })
        default:
            return state;
    }
}
```

- Refer to [`nestedState.js`](./redux-demo/nestedState.js) for more details on the use of the immer library.

## Middleware

- It is the suggested way of extending Redux with custom functionality.
- Provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.
- Use middleware for logging, crash reporting, performing asynchronous tasks, etc.
- An example is `redux-logger`.
- We can apply middleware by using the `applyMiddleware` method in redux, passed as the second parameter to the createStore function.

```js
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

...

const store = createStore(rootReducer, applyMiddleware(logger));
```
