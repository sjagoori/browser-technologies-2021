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

  console.log(e.target.value);

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

  let a = x.map(key => key.input.id.includes('week') ? key : false).filter(elem => typeof elem == 'object')
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

// {y.input.id:  y.input.value}


// let template = {
//   name: parentId,
//   docent: e.target.name.includes('docent') ? e.target.value : undefined,
//   week: [
//     e.target.name.includes('Start') ? e.target.value : undefined,
//     e.target.name.includes('End') ? e.target.value : undefined
//   ],
//   beoordeling: e.target.name.includes('beoordeling') ? e.target.value : undefined,
//   lesstof: e.target.name.includes('lesstof') ? e.target.value : undefined,
//   uitleg: e.target.name.includes('uitleg') ? e.target.value : undefined,
//   eigeninzichten: e.target.name.includes('eigeninzichten') ? e.target.value : undefined,
// }

















const form = document.getElementById('enquette')
form.addEventListener('submit', e => handleForm(e))
form.children[form.children.length - 1].remove()
const inputs = document.getElementsByTagName('input');

function handleForm(e) {
  e.preventDefault() // delete when done validating

  let submitButton = e.submitter.getAttribute('formaction') ? null : e.submitter
  let textInput = Object.values(inputs).map(input => {
    // if (input.type == 'text') checkText(input);
    // if (input.type == 'number') checkNumber(input);
  })

  new FormData(form);

  // return true  // return true if everything is good
}

form.onformdata = (e) => {
  console.log('formdata fired');

  // Get the form data from the event object
  let data = e.formData;
  for (var value of data.values()) {
    console.log(value);
  }

  // submit the data via XHR
  // var request = new XMLHttpRequest();
  // request.open("POST", "/formHandler");
  // request.send(data);
};



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