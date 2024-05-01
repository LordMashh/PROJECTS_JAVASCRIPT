import React, { lazy, Suspense } from 'react';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter';
import StatesList from './components/StatesList';
import Swapper from './components/Swapper';
import FocusInput from './components/FocusInput'
import ArrayOpp from './components/ArrayOpp';

function App() {
  return (
    <>
        <CurrencyConverter />
        <StatesList />
        <Swapper />
        <FocusInput/>
        <ArrayOpp/>
        </>

  );
}

export default App;

