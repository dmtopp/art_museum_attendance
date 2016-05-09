window.onload = function() {
  var request = new XMLHttpRequest(),
      resultsContainer = document.querySelector('#attend-results'),
      responseData;
  request.open('GET', '/attendance/all', true);
  request.setRequestHeader('Content-Type', 'application/json');

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      responseData = JSON.parse(request.responseText);
      responseData.forEach(function(attendance) {
        var date = Date.parse(attendance.date);
        console.log(typeof(date));
        var dateTime = date.getHours() + ':' + date.getMinutes() + ' ' + date.getMonth() + '/' +  date.getDay() + '/' +  date.getFullYear();
        resultsContainer.appendChild('<p>' + attendance.type + '-> ' + dateTime + '</p>');
      })

    } else if (request.status != 200) {
      console.log('There was an error with the request!');
    }
  }
  request.send();
}
