console.log('validator running');

setCache();
bindFieldsetEvents();

/**
 * Function binds fieldset elements to event
 * @requires prefillCache
 */
function bindFieldsetEvents() {
  Object.values(document.getElementsByTagName('fieldset'))
    .map(key => key.id
      ? (key.addEventListener('change', e => handleFieldset(e, key.id), prefillCache()))
      : false)
    .filter(elem => typeof elem == 'object');

  // Object.values(document.getElementsByTagName('fieldset'))
  // .map(key => key.id ? checkFilled(key.id) : null)
}

/**
 * Function updates cache with changes in fieldsets
 * @param {Event} e - event
 * @param {String} parentId - element id
 * @requires bindFieldsetEvents
 */
function handleFieldset(e, parentId) {
  let worker = localStorage.getItem(parentId)
    ? JSON.parse(localStorage.getItem(parentId))
    : (localStorage.setItem(parentId, JSON.stringify({ data: {} })), JSON.parse(localStorage.getItem(parentId)));

  // console.log(e.target.value);

  worker.data[`${e.target.name}`] = e.target.value;
  localStorage.setItem(parentId, JSON.stringify(worker));
}

/**
 * Function fills cache with input element's values 
 * @requires setCache
 */
function prefillCache() {
  let z = document.getElementsByTagName('input')

  let x = Object.values(z)
    .map(key => key.parentElement.parentElement.parentElement.id != '' && key.parentElement.parentElement.parentElement.id != 'enquette'
      ? ({ input: key, field: key.parentElement.parentElement.parentElement.id })
      : false)
    .filter(elem => typeof elem == 'object');

  let a = x.map(key => key.input.id.includes('week') ? false : key).filter(elem => typeof elem == 'object')
  // console.log(b);

  let y = x
    .map(x => x.input.type == 'radio' && !x.input.checked
      ? false : x.input.type != 'radio'
        ? false
        : x)
    .filter(elem => typeof elem == 'object');

  y.map(y => {
    let saveData = { data: {} };
    saveData.data[y.input.name] = y.input.value;

    let existing = localStorage.getItem(y.field) ? JSON.parse(localStorage.getItem(y.field)) : null;

    !existing.data[y.input.name]
      ? (existing.data[y.input.name] = y.input.value, localStorage.setItem(y.field, JSON.stringify(existing)))
      : localStorage.setItem(y.field, JSON.stringify(saveData));

    let b = a.map(key => {
      let storage = JSON.parse(localStorage.getItem(key.field))
      storage.data[`${key.field}-week`] = [1, 3]
      storage.data[`${key.field}-eigeninzichten`] = ''
      localStorage.setItem(key.field, JSON.stringify(storage))
    })
  })
}

/**
 * Function generates cache entries
 */
function setCache() {
  Object.values(document.getElementsByTagName('fieldset'))
    .map(key => key.id != ''
      ? localStorage.setItem(key.id, JSON.stringify({ data: {} }))
      : null);
}

function checkFilled(pick) {
  let fieldset = JSON.parse(localStorage.getItem(pick))
  // let a = Object.values(fieldset.data).map(key => key != '' || key != undefined ? true : false).filter(elem => elem == true).length
  let checkEmptyString = Object.values(fieldset.data).map(key => key != '' ? key : false).filter(elem => typeof elem == 'boolean').length;
  let checkEmptyObject = Object.values(fieldset.data).map(key => typeof key == 'object' && key.length == 0 ? false : key).filter(elem => typeof elem == 'boolean').length
  console.log(pick, 'string', checkEmptyString);
  console.log(pick, 'weeks', checkEmptyObject);

  // let a = Object.values(fieldset.data).map(key => key != '' || key != undefined ? key : false).length
  return checkEmptyString > 0 || checkEmptyObject > 0 ? false : true
}



const form = document.getElementById('enquette')
form.addEventListener('change', e => handleForm(e))
form.children[form.children.length - 1].remove()

const submitButtons = document.querySelectorAll('[formaction]');
Object.values(submitButtons).map((key, index) => index == (submitButtons.length - 1) ? key.textContent = 'Submit' : key.remove())

const inputs = document.getElementsByTagName('input');
const navigationButtons = document.getElementsByTagName('a')

function handleForm(e) {
  e.preventDefault() // 

  let parentElement = e.target.parentElement.parentElement.parentElement
  let nextSibling = parentElement.nextElementSibling ? parentElement.nextElementSibling.id : parentElement.id
  let navButton = nextSibling ? Object.values(navigationButtons).map(key => key.hash.substring(1) == parentElement.id ? key : false).filter(elem => typeof elem == 'object')[0] : null

  if (checkFilled(parentElement.id)) {
    navButton ? document.getElementById(nextSibling).scrollIntoView({ behavior: 'smooth' }) : null
    navButton ? navButton.style.textDecoration = 'line-through' : null
  }

  return checkAll() ? true : false
}

function checkAll() {
  let vakken = Object.values(localStorage);
  // console.log(vakken.);
  let inputsInVakken = vakken.map(key => JSON.parse(key).data)
  console.log('print\t', inputsInVakken);

  var empty = 0

  inputsInVakken.forEach(element => {
    Object.values(element).map(key => {
      if (typeof key == 'object') {
        if (key.length < 2) empty++
      }
      if (key == '') empty++
    })
  })

  console.log(empty);
  return empty > 0 ? false : true
}

form.onformdata = (e) => {
  console.log('formdata fired');
}
A


function checkText(input) {
  return input.value.length == 0 ? generateError(input, input.title) : true
}

function checkNumber(input) {
  // console.log(input);
  return input.value.length == 0 || input.value != input.pattern ? generateError(input, 'kiezen moet je') : true
}


function generateError(input, errorMessage) {
  let error = document.createElement('span');
  error.style.color = 'red';
  error.textContent = errorMessage;
  let exists = input.parentElement.contains(error);
  if (!exists) {
    input.parentElement.appendChild(error)
  }

  //use this to generate an error message
}