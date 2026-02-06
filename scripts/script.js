const eyeSymbol = document.getElementById('eye-icon');
const passwordInput = document.getElementById('password');
const createBtn = document.getElementById('create-btn');

const capsLockOn = document.getElementById('caps-warning');
const invalidWarning = document.getElementById('invalid-warning');
const successMessage = document.getElementById('successful-message');

const toggleEight = document.getElementById('toggle-eight');
const toggleUppercase = document.getElementById('toggle-uppercase');
const toggleNumber = document.getElementById('toggle-number');
const toggleSpecialCharacter = document.getElementById('toggle-specialcharacter');

let hasSubmitted = false;

createBtn.disabled = true;

eyeSymbol.onclick = function () {
  if (passwordInput.type === 'password') {
    eyeSymbol.src = 'icons/view.png';
    passwordInput.type = 'text';
  } else {
    eyeSymbol.src = 'icons/hide.png';
    passwordInput.type = 'password';
  }
};

passwordInput.addEventListener('keyup', (e) => {
  capsLockOn.style.display = e.getModifierState('CapsLock')
    ? 'grid'
    : 'none';
});

function updateIcon(element, isValid, allowFail) {
  if (isValid) {
    element.src = 'icons/check.png';
  } else if (allowFail) {
    element.src = 'icons/cross.png';
  } else {
    element.src = 'icons/full-stop.png';
  }
}

function validatePassword(live = false) {
  const pwd = passwordInput.value;

  const rules = {
    length: pwd.length >= 8,
    upper: /[A-Z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    special: /[^a-zA-Z0-9]/.test(pwd),
  };

  const allowFail = hasSubmitted && !live;

  updateIcon(toggleEight, rules.length, allowFail);
  updateIcon(toggleUppercase, rules.upper, allowFail);
  updateIcon(toggleNumber, rules.number, allowFail);
  updateIcon(toggleSpecialCharacter, rules.special, allowFail);

  return rules;
}

function handleSubmit() {
  hasSubmitted = true;

  const rules = validatePassword();
  const isInvalid =
    !rules.length ||
    !rules.upper ||
    !rules.number ||
    !rules.special;

  if (isInvalid) {
    invalidWarning.style.display = 'grid';
    successMessage.style.display = 'none';
    return;
  }

  invalidWarning.style.display = 'none';
  successMessage.style.display = 'grid';

  passwordInput.value = '';
  createBtn.disabled = true;
  hasSubmitted = false;

  updateIcon(toggleEight, false, false);
  updateIcon(toggleUppercase, false, false);
  updateIcon(toggleNumber, false, false);
  updateIcon(toggleSpecialCharacter, false, false);
}

passwordInput.addEventListener('input', () => {
  invalidWarning.style.display = 'none';
  successMessage.style.display = 'none';

  createBtn.disabled = passwordInput.value.length === 0;

  validatePassword(true);
});

passwordInput.addEventListener('blur', () => {
  validatePassword();
});

passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleSubmit();
  }
});

createBtn.addEventListener('click', handleSubmit);