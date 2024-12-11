const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
function clickButton(id){
  if (id === 'AC') {
    this.setState({
      values: '0',
      preview: '',
      answer: 0
    })
  } else if (['+', '*', '/'].includes(id)) {
    // Handle operator click
    const lastCharIsOperator = ['+', '*', '/'].includes(this.state.preview.slice(-1));
    this.setState((prev)=>({
      values: id,
      preview: 
      // User Story #13: If 2 or more operators are entered consecutively, 
      // the operation performed should be the last operator entered.
    lastCharIsOperator ? prev.preview.slice(0, -1) + id : prev.preview + id
    }))
  } else if (['-'].includes(id)){
    const lastCharIsOperator = ['-'].includes(this.state.preview.slice(-1));
    this.setState((prev)=>({
      values: id,
      preview: 
      // User Story #13: If 2 or more operators are entered consecutively, 
      // the operation performed should be the last operator entered.
    lastCharIsOperator ? prev.preview.slice(0, -1) + id : prev.preview + id
    }))
  }
  else if (id === '=') {
    try {
      // User Story #14: Pressing an operator immediately following = 
      // should start a new calculation that operates on the result of the previous evaluation.
      const result = eval(this.state.preview);
      this.setState({
        answer: result,
        values: result.toString(),
        preview: result.toString()
      })
    } catch (error) {
      this.setState({
        answer: 'Error',
        values: 'Error',
        preview: ''
      })
    }
  } else if (id === '.') {
    // User Story #11: When the decimal element is clicked, a . should append to the currently displayed value;
    // two . in one number should not be accepted.
    if (!this.state.values.includes('.')) {
      this.setState((prev) =>({
        values: prev.values + id,
        preview: prev.preview + id
      }))
    }
  } else {
    // User Story #10: When inputting numbers, my calculator should not allow a number to begin with multiple zeros.
    this.setState((prev)=>({
      values: prev.values === '0'? id: prev.values.concat(`${id}`),
      preview: prev.preview === '0' ? id: prev.preview.concat(`${id}`)
    }))
  }
};



export default reportWebVitals;
