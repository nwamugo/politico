const signup = document.getElementById('popup');
const signupContent = document.getElementById('popup__content');
const loginContent = document.getElementById('popup__content2');

const btnLogin = document.querySelectorAll('.btn-login');
const btnSignUp = document.querySelectorAll('.btn-signup');

const span = document.getElementById('close-signup');
const loginSpan = document.getElementById('close-login');

const goToLogin = document.getElementById('go-to-login');
const goToSignup = document.getElementById('go-to-signup');

/**
 *
 *
 */
function togglePopup() {
  console.log('yea');
  signup.style.opacity = '1';
  signup.style.visibility = 'visible';
  loginContent.style.display = 'none';

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
  loginContent.style.display = 'block';


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

goToLogin.onclick = function() {
  closeSignUpModal();
  togglePopup2();
}

goToSignup.onclick = function() {
  closeLoginModal();
  togglePopup();
}
