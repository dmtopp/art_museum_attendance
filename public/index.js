window.onload = function() {
  var location = document.querySelector('#location');
  var name = document.querySelector('#name');
  var gotIt = document.querySelector("#got-it");

  var locationValue, nameValue;

  gotIt.addEventListener('click', function(e) {
    if (!locationValue || !nameValue) {
      e.preventDefault();
      document.querySelector('#title').innerHTML = 'Please enter a name and a location!';
    }
  })

  location.addEventListener('change', function(e) {
    sessionStorage.setItem('location', e.target.value);
    locationValue = e.target.value;
  })

  name.addEventListener('change', function(e) {
    sessionStorage.setItem('name', e.target.value);
    nameValue = e.target.value;
  })

}
