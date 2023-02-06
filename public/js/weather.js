let apiKey = "5db043ba04e4b09dcf0cf34d59fd87d1";
var errorHappened = false;

let resultContainer = document.getElementById("result");




function getWeather(){
  clearError();

  //remove table if it exists
  var tab = document.getElementById('table');
  if (tab)
    resultContainer.removeChild(tab);

  //remove title if it exists
  var t = document.getElementById('title');
  if (t)
    resultContainer.removeChild(t);


  var cityIsChecked = document.getElementById("city").checked;
  var zipIsChecked = document.getElementById("zip").checked;
  var input = $("#input").val();
  var inputIsValid = false;
  var url;

  function toFahrenheit(k){
    let f = 1.8*(k-273) + 32
    return f.toFixed(1);
  }

  //determine what radio button is checked and the appropriate url
  if (cityIsChecked) {
    if (isNaN(input))
      url = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=" + apiKey;
    else {
      //NOT A CITY NAME
      errorHappened = true;
      displayError();
    }
  } else if (zipIsChecked) { //may have to add USA code
    if (!isNaN(input))
      url = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=" + apiKey;
    else {
      //NOT A ZIP CODE
      errorHappened = true;
      displayError();
    }
  } else {
    var coords = input.split(" ");
    url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + coords[0] + "&lon=" + coords[1] + "&appid=" + apiKey;
  }

  
  if (!errorHappened)
    $.get(url)
     .done(function (data) {
      clearError();

      console.log(data);

      //Get relevant data
      var maxTemp = getMaxOf(data, 'temp_max');
      var minTemp = getMinOf(data, 'temp_min');
      var humidity = getMaxOf(data, 'humidity');
      var clouds = getMaxOf(data, 'clouds');
      var dates = getDates(data);

      var title = document.createElement("h1");
      title.id = "title";
      title.innerHTML = "Forecast for " + data['city']['name']; 
      //document.body.appendChild(title);
      resultContainer.appendChild(title);

      //Make the table
      var table = document.createElement("table");
      table.id = "table";
      table.className = "table table-bordered";
    

      var thead = document.createElement("thead");
      var trHead = document.createElement("tr");
      var th0 = document.createElement("th");
      th0.innerHTML = "";
      var thA = document.createElement("th");
      thA.innerHTML = dates[0];
      var thB = document.createElement("th");
      thB.innerHTML = dates[1];
      var thC = document.createElement("th");
      thC.innerHTML = dates[2];

      trHead.appendChild(th0);
      trHead.appendChild(thA);
      trHead.appendChild(thB);
      trHead.appendChild(thC);

      thead.appendChild(trHead);
      table.appendChild(thead);


      var tr = document.createElement("tr");

      var td0 = document.createElement("td");
      td0.innerHTML = "Max Temp (°F)";
      var tdA = document.createElement("td");
      tdA.innerHTML = toFahrenheit(maxTemp[0]) + "°";
      var tdB = document.createElement("td");
      tdB.innerHTML = toFahrenheit(maxTemp[1]) + "°";
      var tdC = document.createElement("td");
      tdC.innerHTML = toFahrenheit(maxTemp[2]) + "°";

      tr.appendChild(td0);
      tr.appendChild(tdA);
      tr.appendChild(tdB);
      tr.appendChild(tdC);

      table.appendChild(tr);

      tr = document.createElement("tr");

      td0 = document.createElement("td");
      td0.innerHTML = "Min Temp (°F)";
      tdA = document.createElement("td");
      tdA.innerHTML = toFahrenheit(minTemp[0]) + "°";
      tdB = document.createElement("td");
      tdB.innerHTML = toFahrenheit(minTemp[1]) + "°";
      tdC = document.createElement("td");
      tdC.innerHTML = toFahrenheit(minTemp[2]) + "°";

      tr.appendChild(td0);
      tr.appendChild(tdA);
      tr.appendChild(tdB);
      tr.appendChild(tdC);

      table.appendChild(tr);

      tr = document.createElement("tr");

      td0 = document.createElement("td");
      td0.innerHTML = "Max Clouds";
      tdA = document.createElement("td");
      tdA.innerHTML = clouds[0] + '%';
      tdB = document.createElement("td");
      tdB.innerHTML = clouds[1] + '%';
      tdC = document.createElement("td");
      tdC.innerHTML = clouds[2] + '%';

      tr.appendChild(td0);
      tr.appendChild(tdA);
      tr.appendChild(tdB);
      tr.appendChild(tdC);

      table.appendChild(tr);

      tr = document.createElement("tr");

      td0 = document.createElement("td");
      td0.innerHTML = "Max Humidity";
      tdA = document.createElement("td");
      tdA.innerHTML = humidity[0] + "%";
      tdB = document.createElement("td");
      tdB.innerHTML = humidity[1] + "%";
      tdC = document.createElement("td");
      tdC.innerHTML = humidity[2] + "%";

      tr.appendChild(td0);
      tr.appendChild(tdA);
      tr.appendChild(tdB);
      tr.appendChild(tdC);

      table.appendChild(tr);

   
      //document.body.appendChild(table);
      resultContainer.appendChild(table);

    })
    .fail(function(){
      displayError();
    });


  errorHappened = false;
}

$("#input").on("keydown", function(event){
  if(event.key=="Enter"){ 
    getWeather();
  }
});

$("#submit").on("click", function () {
    getWeather();
});


//Returns an array of size 3 containing the dates for the weather forecast
function getDates(data) {
  var dates = [];
  var date;
  var j = 0;
  for (var i = 0; i < 3; i++) {
    do {
      date = getDate(data['list'][j]['dt_txt']);
    } while (date == getDate(data['list'][++j]['dt_txt']));
    dates.push(getDate(date));
  }

  return dates;
}

//Takes a dt_txt field from the data, and returns just the date
function getDate(date) {
  return date.split(" ")[0];
}

//Returns an array of 3 values: [today,tomorrow,next day]
//Params: data, and the name of the field you want to find the max of 
function getMaxOf(data, field) {
  var today = 0;
  var tomorrow = 0;
  var nextDay = 0;

  var isCloud = (field == 'clouds');

  var temp;
  var max = 0;

  var i = 0;
  var date;

  do { //Today
    if (isCloud)
      temp = parseFloat(data['list'][i]['clouds']['all']);
    else
      temp = parseFloat(data['list'][i]['main'][field]);

    if (temp > max) max = temp;
    date = getDate(data['list'][i]['dt_txt']);

  } while (date == getDate(data['list'][++i]['dt_txt']));

  today = max;
  max = 0;

  do { //Tomorrow
    if (isCloud)
      temp = parseFloat(data['list'][i]['clouds']['all']);
    else
      temp = parseFloat(data['list'][i]['main'][field]);

    if (temp > max) max = temp;
    date = getDate(data['list'][i]['dt_txt']);

  } while (date == getDate(data['list'][++i]['dt_txt']));

  tomorrow = max;
  max = 0;

  do { //Next Day
    if (isCloud)
      temp = parseFloat(data['list'][i]['clouds']['all']);
    else
      temp = parseFloat(data['list'][i]['main'][field]);

    if (temp > max) max = temp;
    date = getDate(data['list'][i]['dt_txt']);

  } while (date == getDate(data['list'][++i]['dt_txt']));

  nextDay = max;

  return [today, tomorrow, nextDay];

}

//Returns an array of 3 values: [today,tomorrow,next day]
//Params: data, and the name of the field you want to find the min of 
function getMinOf(data, field) {
  var today = 0;
  var tomorrow = 0;
  var nextDay = 0;

  var isCloud = (field == 'clouds');

  var temp;
  var min = 9999999999;

  var i = 0;
  var date;

  do { //Today
    if (isCloud)
      temp = parseFloat(data['list'][i]['clouds']['all']);
    else
      temp = parseFloat(data['list'][i]['main'][field]);

    if (temp < min) min = temp;
    date = getDate(data['list'][i]['dt_txt']);

  } while (date == getDate(data['list'][++i]['dt_txt']));

  today = min;
  min = 9999999999;

  do { //Tomorrow
    if (isCloud)
      temp = parseFloat(data['list'][i]['clouds']['all']);
    else
      temp = parseFloat(data['list'][i]['main'][field]);

    if (temp < min) min = temp;
    date = getDate(data['list'][i]['dt_txt']);

  } while (date == getDate(data['list'][++i]['dt_txt']));

  tomorrow = min;
  min = 9999999999;

  do { //Next Day
    if (isCloud)
      temp = parseFloat(data['list'][i]['clouds']['all']);
    else
      temp = parseFloat(data['list'][i]['main'][field]);

    if (temp < min) min = temp;
    date = getDate(data['list'][i]['dt_txt']);

  } while (date == getDate(data['list'][++i]['dt_txt']));

  nextDay = min;

  return [today, tomorrow, nextDay];

}

//Erase error message
function clearError() {
  var error = document.getElementById("err");
  error.innerHTML = "";

}

//Write error message
function displayError() {
  var error = document.getElementById('err');
  error.innerHTML = "Invalid input";
}