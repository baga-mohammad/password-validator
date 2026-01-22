const eyeSymbol = document.getElementById('eye-icon');
const passwordInput = document.getElementById('password');

eyeSymbol.onclick = function() {
  if (passwordInput.type === 'password') {
    eyeSymbol.src = 'icons/view.png';
    passwordInput.type = 'text';
  } else {
    eyeSymbol.src = 'icons/hide.png';
    passwordInput.type = 'password';
  }
}

const capsLockOn = document.getElementById('caps-warning');

// passwordInput.addEventListener('keyup', (e) => {
//   if (e.getModifierState('CapsLock')) {
//     capsLockOn.style.display = 'grid';
//   } else {
//     capsLockOn.style.display = 'none';
//   }
// });

passwordInput.addEventListener('keyup', function(e) {
  if (e.getModifierState('CapsLock')) {
    capsLockOn.style.display = 'grid';
  } else {
    capsLockOn.style.display = 'none';
  }
});

// passwordInput.addEventListener('keyup', (e) => {
//   capsLockOn.style.display = 
//     e.getModifierState('CapsLock') ? 'grid' : 'none';
// });

const toggleEight = document.getElementById('toggle-eight');
const toggleUppercase = document.getElementById('toggle-uppercase');
const toggleNumber = document.getElementById('toggle-number');
const toggleSpecialCharacter = document.getElementById('toggle-specialcharacter');

passwordInput.addEventListener('input', function() {
  const userPassword = passwordInput.value;

  if (userPassword.length >= 8) {
    // checkIcon.style.visibility = 'visible'; no longer needed since i added a different icon for 
    toggleEight.src = 'icons/check.png';
  } else {
    toggleEight.src = 'icons/cross.png';
  }

  if (userPassword.match(/[A-Z]/)) {
    toggleUppercase.src = 'icons/check.png';
  } else {
    toggleUppercase.src = 'icons/cross.png';
  }

  if (userPassword.match(/[0-9]/)) {
    toggleNumber.src = 'icons/check.png';
  } else {
    toggleNumber.src = 'icons/cross.png';
  }

  if (userPassword.match(/[^a-zA-Z0-9]/)) {
    toggleSpecialCharacter.src = 'icons/check.png';
  } else {
    toggleSpecialCharacter.src = 'icons/cross.png';
  }

});