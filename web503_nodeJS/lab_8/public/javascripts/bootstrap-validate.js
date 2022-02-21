window.addEventListener('load', function() {
  let inputList = document.querySelectorAll('.js-bootstrap-validate');
  
  inputList.forEach(input => {
    input.addEventListener('change', function() {
      let pattern = new RegExp(input.getAttribute('pattern'), 'g');
      
      if (pattern.test(input.value) === true) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');

      } else if (pattern.test(input.value) === false) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
      }
    })
  });
})