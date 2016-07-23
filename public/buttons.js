window.onload = function() {
  var inButton = document.querySelector('#in');
  var outButton = document.querySelector('#out');
  var undoButton = document.querySelector('#undo');

  document.querySelector('#current-name').innerHTML = sessionStorage.getItem('name');
  document.querySelector('#current-location').innerHTML = sessionStorage.getItem('location');

  inButton.addEventListener('click', function(e) {
    sendAttendance(e.target.id);
  })

  outButton.addEventListener('click', function(e) {
    sendAttendance(e.target.id);
  })

  undoButton.addEventListener('click', function() {
    deleteLastAttendance();
  })
}

function deleteLastAttendance() {
  var request = new XMLHttpRequest();
  request.open('POST', '/attendance/delete-last', true);
  request.setRequestHeader('Content-Type', 'application/json');

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var responseData = JSON.parse(request.responseText);
      if (responseData.attendance) {
        var ins = [],
            outs = [];

        responseData.attendance.forEach(function(attendance) {
          if (attendance.type === 'in') ins.push(attendance);
          else outs.push(attendance);
        })

        document.querySelector('#num-in').innerHTML = ins.length;
        document.querySelector('#num-out').innerHTML = outs.length;
      }
    } else if (request.status != 200) {
      console.log('There was an error with the request!');
    }
  }
  request.send(JSON.stringify({ location: sessionStorage.getItem('location'),
                                user: sessionStorage.getItem('name') }));
}

function sendAttendance(type) {
  var request = new XMLHttpRequest();
  request.open('POST', '/attendance/new', true);
  request.setRequestHeader('Content-Type', 'application/json');

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var responseData = JSON.parse(request.responseText);
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
