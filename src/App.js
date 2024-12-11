 import React from "react"


const Button = ({handleClick, value, id, classes})=>{
  return(
 <button onClick={()=>handleClick(value)} value={value} id={id} className={classes}>
  {value}
  </button>)
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = { 
      values: '0',
      preview: '0',
      answer: 0,
      buttons:[
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
    {id:'decimal', classes:"regulars", value:'.'}]
  }
  this.clickButton = this.clickButton.bind(this);
}
clickButton(id) {
  if (id === 'AC') {
    this.setState({
      values: '0',
      preview: '',
      answer: 0
    });
  } else if (['+', '*', '/'].includes(id)) {
    // Handle operator click
    const lastCharIsOperator = ['+', '*', '/'].includes(this.state.preview.slice(-1));
    this.setState((prev) => ({
      values: id,
      preview:
        // User Story #13: If 2 or more operators are entered consecutively, 
        // the operation performed should be the last operator entered.
        lastCharIsOperator ? prev.preview.slice(0, -1) + id : prev.preview + id
    }));
  } else if (['-'].includes(id)) {
    const lastCharIsOperator = ['-'].includes(this.state.preview.slice(-1));
    this.setState((prev) => ({
      values: id,
      preview:
        // User Story #13: If 2 or more operators are entered consecutively, 
        // the operation performed should be the last operator entered.
        lastCharIsOperator ? prev.preview.slice(0, -1) + id : prev.preview + id
    }));
  } else if (id === '=') {
    try {
      // User Story #14: Pressing an operator immediately following = 
      // should start a new calculation that operates on the result of the previous evaluation.
      const result = eval(this.state.preview);
      this.setState({
        answer: result,
        values: result.toString(),
        preview: result.toString()
      });
    } catch (error) {
      this.setState({
        answer: 'Error',
        values: 'Error',
        preview: ''
      });
    }
  } else if (id === '.') {
    // User Story #11: When the decimal element is clicked, a . should append to the currently displayed value;
    // two . in one number should not be accepted.
    if (!this.state.values.includes('.')) {
      this.setState((prev) => ({
        values: prev.values + id,
        preview: prev.preview + id
      }));
    }
  } else {
    // User Story #10: When inputting numbers, my calculator should not allow a number to begin with multiple zeros.
    this.setState((prev) => {
      const hasThreeConsecutiveOperators = /[\+\-\*\/]{3,}/.test(prev.preview);
    
      if (hasThreeConsecutiveOperators) {
        const operators = ['+', '-', '*', '/'];
        const consecutiveOperators = prev.preview.match(/[\+\-\*\/]{3,}/)[0];
        const firstOperatorIndex = prev.preview.indexOf(consecutiveOperators);
        const beforeFirstOperator = prev.preview.slice(0, firstOperatorIndex);
        const lastOperator = consecutiveOperators.slice(-1);
    
        return {
          values: id,
          preview: beforeFirstOperator + lastOperator + id
        };
      } else {
        return {
          values: prev.values === '0'
            ? id
            : prev.values.concat(`${id}`),
          preview: prev.preview === '0'
            ? id
            : prev.preview.concat(`${id}`)
        };
      }
    });
    
    
  }
}
  render(){
    return (
      <div className='container'>
      <div className='outputDisplay'>{this.state.preview}</div>
      <div className='inputDisplay' id='display'>{this.state.values}</div>
      <div className='buttonClass'>
        {this.state.buttons.map((keypads, index)=> (
          <Button key={index} {...keypads} handleClick={()=> this.clickButton(keypads.value)}/>
        ))}</div>
        </div>
          )
  }
}
export default App


