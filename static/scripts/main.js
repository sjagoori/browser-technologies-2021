const form = document.forms.enquette;
// form.addEventListener('change', e => console.log(e))


var params = '';
for (var i = 0; i < document.form.elements.length; i++) {
  var fieldName = document.form.elements[i].name;
  var fieldValue = document.form.elements[i].value;

  // use the fields, put them in a array, etc.

  // or, add them to a key-value pair strings, 
  // as in regular POST

  params += fieldName + '=' + fieldValue + '&';
}


console.log(param)
