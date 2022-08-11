import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ordered, restocked } from './cakeSlice';

export const CakeView = () => {

  const numOfCakes = useSelector((state) => {
    return state.cake.numOfCakes;
  });

  const dispatch = useDispatch();

  const orderCake = () => {
    dispatch(ordered());
  }

  const restockCake = () => {
    dispatch(restocked(3));
  }

  return (
    <div>
        <h2>Number of Cakes - {numOfCakes}</h2>
        <button onClick={orderCake}>Order Cake</button>
        <button onClick={restockCake}>Restock Cakes</button>
    </div>
  )
}