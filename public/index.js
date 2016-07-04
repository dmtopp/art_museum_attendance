window.onload = function() {
  console.log('hello from index');
  var location = document.querySelector('#location');
  var name = document.querySelector('#name');

  location.addEventListener('change', function(e) {
    sessionStorage.setItem('location', e.target.value);
  })

  name.addEventListener('change', function(e) {
    sessionStorage.setItem('name', e.target.value);
  })

}

function sendAttendance(type) {
  var request = new XMLHttpRequest();
  request.open('POST', '/attendance/new', true);
  request.setRequestHeader('Content-Type', 'application/json');

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var responseData = JSON.parse(request.responseText);
      console.log('response', responseData);
    } else if (request.status != 200) {
      console.log('There was an error with the request!');
    }
  }
  request.send(JSON.stringify({ type: type,
                                location: 'EAST',
                                user: 'Dan' }));

}
