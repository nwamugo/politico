let signup = document.getElementById('popup');
let signupContent = document.getElementById('popup__content');
let loginContent = document.getElementById('popup__content2');

let btnLogin = document.querySelectorAll('.btn-login');
let btnSignUp = document.querySelectorAll('.btn-signup');

let span = document.getElementById('close-signup');
let loginSpan = document.getElementById('close-login');

let modalChange1 = document.getElementById('change-modals1');
let modalChange2 = document.getElementById('change-modals2');

/**
 *
 *
 */
function togglePopup() {
  console.log('yea');
  signup.style.opacity = '1';
  signup.style.visibility = 'visible';

  signupContent.style.opacity = '1';
  signupContent.style.transform = 'translate(-50%, -50%) scale(1)';
}

/**
 *
 *
 */
function togglePopup2() {
  console.log('yea');
  signup.style.opacity = '1';
  signup.style.visibility = 'visible';

  loginContent.style.opacity = '1';
  loginContent.style.transform = 'translate(-50%, -50%) scale(1)';
}

btnSignUp[0].onclick = function() {
  togglePopup();
}

btnSignUp[1].onclick = function() {
  togglePopup();
}

btnLogin[0].onclick = function() {
  togglePopup2();
}

btnLogin[1].onclick = function() {
  togglePopup2();
}

/**
 *
 *
 */
function closeSignUpModal() {
  signupContent.style.opacity = '0';
  signupContent.style.transform = 'translate(-50%, -50%) scale(0)';

  signup.style.opacity = '0';
  signup.style.visibility = 'hidden';
}

/**
 *
 *
 */
function closeLoginModal() {
  loginContent.style.opacity = '0';
  loginContent.style.transform = 'translate(-50%, -50%) scale(0)';

  signup.style.opacity = '0';
  signup.style.visibility = 'hidden';
}

span.onclick = function() {
  closeSignUpModal()
}

loginSpan.onclick = function() {
  closeLoginModal();
}

window.onclick = function(event) {
  console.log(event.target);

  if (event.target == signup) {
    closeSignUpModal();
    closeLoginModal();
  }
}

modalChange1.onclick = function() {
  closeSignUpModal();
  togglePopup2();
}

modalChange2.onclick = function() {
  closeLoginModal();
  togglePopup();
}


const modalSignup = document.getElementById('modalSignup');

modalSignup.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    phone_number: document.getElementById('phoneNumber').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  fetch('http://localhost:3005/api/v1/auth/signup', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then((json) => {
      if (json.data[0].token) {
        localStorage.setItem('token', json.data[0].token);
        window.location.href = 'ui/profile.html';
        console.log(json);
      }
    })
    .catch(err => console.log(err));
});


const modalLogin = document.getElementById('modalLogin');

modalLogin.addEventListener('click', (e) => {
  e.preventDefault();

})