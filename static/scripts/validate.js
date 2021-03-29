console.log('validator running')

let a = Object.values(document.getElementsByTagName('fieldset')).map(key => key.id ? (key.addEventListener('change', e => handleFieldset(e, key.id), prefillCache(key))) : false).filter(elem => typeof elem == 'object')
// a.map(key => key.addEventListener('change', event => (handleFieldset(event, key.id), localStorage.setItem(key.id, JSON.stringify([])))))

function handleFieldset(e, parentId) {
  let worker = localStorage.getItem(parentId) ? JSON.parse(localStorage.getItem(parentId)) : (localStorage.setItem(parentId, JSON.stringify({ data: {} })), JSON.parse(localStorage.getItem(parentId)))

  console.log(e.target.value);

  worker.data[`${e.target.name}`] = e.target.value
  localStorage.setItem(parentId, JSON.stringify(worker))
}

function prefillCache(parentId) {
  // localStorage.setItem(parentId, JSON.stringify({ data: {} }))

  // let divs = Object.values(parentId.children).find(key => key.localName == 'div')
  // let inputs = Object.values(divs.children).find(key => key.localName == 'div')
  // console.log(document.forms[`${parentId}`]);
  let z = document.getElementsByTagName('input')
  let x = Object.values(z).map(key => key.parentElement.parentElement.parentElement.id != '' && key.parentElement.parentElement.parentElement.id != 'enquette' ? ({ input: key, field: key.parentElement.parentElement.parentElement.id }) : false).filter(elem => typeof elem == 'object')
  // let y = x.map(x => x.input.type == 'radio' && x.input.checked == true ? { input: x.input, id: x.input.id, value: x.input.value } : x.input.type != 'radio' ? x : false).filter(elem => typeof elem == 'object')
  let y = x.map(x => x.input.type == 'radio' && !x.input.checked ? false : x.input.type != 'radio' ? false : x).filter(elem => typeof elem == 'object')
  // y.map(y=> localStorage.setItem(y.field, JSON.stringify(`${y.input.id}:${y.input.value}`)))
  y.map(y => {
    let name = y.input.id
    let saveData = { data: {} }
    saveData.data[y.input.name] = y.input.value

    // let a = localStorage.getItem(y.field) ? JSON.parse(localStorage.getItem(y.field)) : null
    // a ? a.data[y.input.name] = y.input.value : null 

    let existing = localStorage.getItem(y.field) ? JSON.parse(localStorage.getItem(y.field)) : localStorage.setItem(y.field, JSON.stringify({ data: {} }))

    !existing.data[y.input.name] ? (existing.data[y.input.name] = y.input.value, localStorage.setItem(y.field, JSON.stringify(existing))) : localStorage.setItem(y.field, JSON.stringify(saveData));

    // console.log(y);
    // localStorage.setItem(y.field, JSON.stringify(fresh))
    return
  })

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