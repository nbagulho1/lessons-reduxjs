import { useDispatch, useSelector } from 'react-redux';
import { increment, incrementByAmount, decrement, reset } from './counterSlice';
import { useState } from 'react';

const Counter = () => {
  const count = useSelector((state) => state.counter.contador); // counter: a variable in store, contador: a variable in counterSlice
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);

  const resetAll = () => {
    dispatch(reset());
    setIncrementAmount(0);
  }

  return (
    <section id="center">
      <h1>Counter</h1>
      <p>{count}</p>
        <button onClick={() => dispatch(increment())}>Increment +</button>
        <button onClick={() => dispatch(decrement())}>Decrement -</button>
        <button onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>Increment by Amount</button>
        <input
          type="text"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button onClick={() => resetAll()}>Reset</button>
    </section>
  );
};

export default Counter;