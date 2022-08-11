import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ordered, restocked } from './iceCreamSlice';
import { useState } from 'react';

export const IceCreamView = () => {

  const [value, setValue] = useState(1);

  const dispatch = useDispatch();

  const numOfIceCreams = useSelector((state) => {
    return state.iceCream.numOfIceCreams;
  })

  const orderIceCream = () => {
    dispatch(ordered());
  }

  const restockIceCream = () => {
    dispatch(restocked(value));
  }

  const updateValue = (event) => {
    setValue(parseInt(event.target.value));
  }

  return (
    <div>
        <h2>Number of IceCream - {numOfIceCreams}</h2>
        <button onClick={orderIceCream}>Order IceCream</button>
        <input type="number" value={value} onChange={(event) => updateValue(event)}></input>
        <button onClick={restockIceCream}>Restock IceCreams</button>
    </div>
  )
}
