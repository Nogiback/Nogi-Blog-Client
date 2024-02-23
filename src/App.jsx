import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Pricing from './components/Pricing';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Header />
      <Pricing />
    </div>
  );
}

export default App;
