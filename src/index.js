import React from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


function Calc(){
  var [answer, setAnswer] = useState(0);

  setAnswer(answer= 35)
  return (<>
        <button value={1}></button>
        <button value={2}></button>
        <div className='display'></div>
        <div>{answer}</div>
          </>)
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calc />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
