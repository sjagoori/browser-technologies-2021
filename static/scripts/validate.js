console.log('validator running')

const form = document.getElementById('enquette').addEventListener('submit', e => handleForm(e))

function handleForm(e){
  e.preventDefault() // delete when done validating
  
  let formAction = e.target.getAttribute("action");
  let activeElementAction = document.activeElement.getAttribute("formaction");
  let action = activeElementAction || formAction;
  console.log(action);
}