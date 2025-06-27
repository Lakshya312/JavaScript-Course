      let calculation = localStorage.getItem('value') || '';

      document.querySelector('.display-calculation')
        .innerHTML = calculation ;
      
      function updateCalculation(value){
        calculation += value ;
        console.log(calculation);

      localStorage.setItem('value',calculation);

      document.querySelector('.display-calculation')
        .innerHTML = calculation ;
      }