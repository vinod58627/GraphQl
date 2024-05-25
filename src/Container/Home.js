import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, incementByAmount } from '../ReduxFiles/Reeducers/CounterReducer';


const Home = () => {
    const count = useSelector((state) => state.counter.value);

    let dispatch = useDispatch()

    return (
        <div className="d-flex">
            <button onClick={() => dispatch(decrement())}> -</button>
            <p>Hello There. I'm Home {count}</p>
            <button  onClick={() => dispatch(increment())}> +</button>
            <button onClick={() => dispatch(incrementByAmount(2))}>Increment by 2</button>
            <button onClick={() => dispatch(incementByAmount())}>Increment</button>
        </div>
    )
}

export default Home