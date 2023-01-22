
$(function() {
    var API_key = '33f031fef3c3c8b1b91d38ca6a1b278c';

    var lat;
    var lon;

    var cityArray = [];
    var searchButton = $('#searchBtn');

    if (!localStorage.getItem('cityArray')){
        localStorage.setItem('cityArray', JSON.stringify(cityArray));
    }

    searchButton.on('click', function(){
        var city = {
          city: $('input')[0].value,
        };
    
        localStorage.setItem('city', JSON.stringify(city));
    
        renderSearchHistory();
        getAPI();
    })

    function renderSearchHistory(){
        var searchedCity = JSON.parse(localStorage.getItem('city'));
        var cityArray = JSON.parse(localStorage.getItem('cityArray'));

        if (searchedCity !== null) {
            cityArray.push(searchedCity);
            localStorage.setItem('cityArray', JSON.stringify(cityArray));
        }

        if (cityArray !== null){
            var cityArray = JSON.parse(localStorage.getItem('cityArray'));
            $('#searchHistory').empty();
            for (var i = 0; i<cityArray.length; i++){
              var searchHistory = $('<p></p>').text(cityArray[i].city);
              $('#searchHistory').append(searchHistory);
            }
        } 
    }

    function getAPI() {
        var city = JSON.parse(localStorage.getItem('city')).city;

        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + API_key;
        fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $('#current').empty();
            console.log(data);
            lon = data.coord.lon;
            lat = data.coord.lat;
            var cityName = $('<p></p>').text(data.name);
            var iconCode = data.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            var icon = $('<img src="">').attr('src', iconURL);
            var temp = $('<p></p>').text(data.main.temp + " degrees Fahrenheit");
            var humid = $('<p></p>').text(data.main.humidity + "%");
            var wind = $('<p></p>').text(data.wind.speed + " mph");
            $('#current').append(cityName, icon, temp, humid, wind);

        })

        // var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + API_key;
        // fetch(queryURL)
        // .then(function (response) {
        //     return response.json();
        // })
        // .then(function (data) {
        //     console.log(data);
        // })
    }    

    function init(){
        renderSearchHistory();
    }

    init();
})