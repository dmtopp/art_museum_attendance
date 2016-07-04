window.onload = function() {
  var inButton = document.querySelector('#in');
  var outButton = document.querySelector('#out');

  document.querySelector('#current-name').innerHTML = sessionStorage.getItem('name');
  document.querySelector('#current-location').innerHTML = sessionStorage.getItem('location');

  inButton.addEventListener('click', function(e) {
    sendAttendance(e.target.id);
  })

  outButton.addEventListener('click', function(e) {
    sendAttendance(e.target.id);
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
      var selector = '#num-' + responseData.attendance[0].type;
      document.querySelector(selector).innerHTML = responseData.attendance.length;
    } else if (request.status != 200) {
      console.log('There was an error with the request!');
    }
  }
  request.send(JSON.stringify({ type: type,
                                location: sessionStorage.getItem('location'),
                                user: sessionStorage.getItem('name') }));

}
