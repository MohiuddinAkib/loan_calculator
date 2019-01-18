document.addEventListener('DOMContentLoaded', () => {
  // Get ui elems
  const form = document.getElementById('form'),
    loanAmount = document.getElementById('loan-amount'),
    interestAmount = document.getElementById('interest-amount'),
    years = document.getElementById('years'),
    results = document.getElementById('results'),
    monthlyPayment = document.getElementById('monthly-payment'),
    totalPayment = document.getElementById('total-payment'),
    totalInterest = document.getElementById('total-interest'),
    removeResultBtn = document.querySelector('.message .delete');

  // hiding the results div
  results.style.display = 'none';

  // Listen for form submit
  form.addEventListener('submit', e => {
    document
      .querySelectorAll('.card .control')
      .forEach(control => control.classList.add('is-loading'));

    setTimeout(() => {
      calculateInterest();
    }, 3000);
    e.preventDefault();
  });

  // Define funtion to calculate interest
  function calculateInterest() {
    document
      .querySelectorAll('.card .control')
      .forEach(control => control.classList.remove('is-loading'));

    // Validate input
    if (
      loanAmount.value === '' ||
      interestAmount.value === '' ||
      years.value === ''
    ) {
      showErr('Please fill in all input field');
      return false;
    } else if (
      isNaN(loanAmount.value) ||
      isNaN(interestAmount.value) ||
      isNaN(years.value)
    ) {
      showErr('Please enter valid value');
      return false;
    }

    // adding class to the input fields and icon tags
    addClass('success', 'check');

    //show results
    results.style.display = 'block';

    const principal = parseFloat(loanAmount.value),
      calculatedInterest = parseFloat(interestAmount.value) / 100 / 12,
      calculatedPayments = parseFloat(years.value) * 12;

    // compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments),
      monthly = (principal * x * calculatedInterest) / (x - 1);

    // showing value inside result fields
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    setTimeout(() => {
      removeClass('is-success');
      // resetting form
      form.reset();
    }, 3000);
  }

  // Error Message function
  function showErr(msg) {
    // create div el
    const div = document.createElement('div');
    // give the div a class
    div.className = 'notification is-danger';
    // createing the text node with msg
    const message = document.createTextNode(msg);
    // appending the child elems to the parent
    div.appendChild(message);
    // inserting the alert in the DOM
    document
      .querySelector('.column')
      .insertBefore(div, document.querySelector('.card'));

    // adding class to the input fields and icon tags
    addClass('danger', 'fas fa-times');

    // remove error after 3 seconds
    setTimeout(() => {
      div.remove();
      // removing class from input fields
      removeClass('is-danger');
    }, 3000);
  }

  // add class function
  function addClass(className1, className2) {
    loanAmount.className += ` is-${className1}`;
    interestAmount.className += ` is-${className1}`;
    years.className += ` is-${className1}`;
    loanAmount.nextElementSibling.children[0].className = `fas fa-${className2}`;
    interestAmount.nextElementSibling.children[0].className = `fas fa-${className2}`;
    years.nextElementSibling.children[0].className = `fas fa-${className2}`;
  }

  // remove class function
  function removeClass(className) {
    loanAmount.classList.remove(className);
    interestAmount.classList.remove(className);
    years.classList.remove(className);
    loanAmount.nextElementSibling.children[0].className = '';
    interestAmount.nextElementSibling.children[0].className = '';
    years.nextElementSibling.children[0].className = '';
  }

  removeResultBtn.addEventListener('click', e => {
    e.target.parentElement.parentElement.remove();
  });
});
