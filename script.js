const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const Cpassword = document.getElementById("Cpassword");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  // In css .form-control.success input
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re =
    /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//check required field looop thru array
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    // we want to check here not log
    if (input.value.trim() == "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// get the first letter of the ID and make it capital use
// + sign and .slice to start after first letter
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, minNum, maxNum) {
  if (input.value.length < minNum) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${minNum} characters`
    );
  } else if (input.value.length > maxNum) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${maxNum} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value != input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// adding event listen when clicking submit takes in parameter e
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, Cpassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, Cpassword);
});
