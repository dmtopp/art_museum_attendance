window.onload = function() {
  console.log('THE DOM IS LOADED.  HEAD FOR THE HILLS.');
  var inButton = document.querySelector('#in');
  var outButton = document.querySelector('#out');

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
      console.log(responseData);
    } else if (request.status != 200) {
      console.log('There was an error with the request!');
    }
  }
  request.send(JSON.stringify({ type: type }));

}
