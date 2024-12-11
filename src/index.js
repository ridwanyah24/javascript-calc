import React from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


 
const Button = ({handleClick, value, id, classes})=>{
  return(
 <button onClick={()=>handleClick(value)} value={value} id={id} className={classes}>
  {value}
  </button>)
}


function Calc(){
  const [buttons, setButtons] = useState([
    {id:'clear', classes:"double", value:'AC'},
    {id:'divide', classes:"regular", value:'/'},
    {id:'multiply', classes:"regular", value:'*'},
    {id:"seven", classes:"regulars", value:'7'},
    {id:"eight", classes:"regulars", value:'8'},
    {id:"nine", classes:"regulars", value:'9'},
    {id:"subtract", classes:"regular", value:"-"},
    {id:"four", classes:"regulars", value:'4'},
    {id:"five", classes:"regulars", value:'5'},
    {id:"six", classes:"regulars", value:'6'},
    {id:'add', classes:"regular", value:"+"},
    {id:"one", classes:"regulars", value:'1'},
    {id:"two", classes:"regulars", value:'2'},
    {id:"three", classes:"regulars", value:'3'},
    {id:'equals', classes:"colDouble", value:'='},
    {id:"zero", classes:"regulars", value:'0'},
    {id:'decimal', classes:"regulars", value:'.'},
  ]);
  const [values, setValues] = useState('0');
  const [preview, setPreview] = useState('')
  const [answer, setAnswer] = useState(0)
  
  const clickButton = (id) => {
    if (id === 'AC') {
      setValues('0');
      setPreview('');
      setAnswer(0);
    } else if (['+', '-', '*', '/'].includes(id)) {
      // Handle operator click
      setValues(id);
      setPreview((prev) => {
        // User Story #13: If 2 or more operators are entered consecutively, 
        // the operation performed should be the last operator entered.
        const lastCharIsOperator = ['+', '-', '*', '/'].includes(prev.slice(-1));
        return lastCharIsOperator ? prev.slice(0, -1) + id: prev + id;
      });
    } else if (id === '=') {
      try {
        // User Story #14: Pressing an operator immediately following = 
        // should start a new calculation that operates on the result of the previous evaluation.
        const result = eval(preview);
        setAnswer(result);
        setValues(result.toString());
        setPreview('');
      } catch (error) {
        setAnswer('Error');
        setValues('Error');
        setPreview('');
      }
    } else if (id === '.') {
      // User Story #11: When the decimal element is clicked, a . should append to the currently displayed value;
      // two . in one number should not be accepted.
      if (!values.includes('.')) {
        setValues((prev) => prev + id);
        setPreview((prev) => prev + id);
      }
    } else {
      // User Story #10: When inputting numbers, my calculator should not allow a number to begin with multiple zeros.
      setValues((prev) => (prev === '0' ? id : prev.concat(`${id}`)));
      setPreview((prev) => (prev === '0' ? id : prev.concat(`${id}`)));
    }
  };

  return <>
      <div className='container'>
      <div className='outputDisplay'>{preview}</div>
      <div className='inputDisplay' id='display'>{values}</div>
      <div className='buttonClass'>
        {buttons.map((keypads, index)=> (
          <Button key={index} {...keypads} handleClick={()=> clickButton(keypads.value)}/>
        ))}</div>
        </div>
          </>
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
