
$(function() {
    var API_key = '33f031fef3c3c8b1b91d38ca6a1b278c';

    var cityArray = [];
    var searchButton = $('#searchBtn');

    // if (!localStorage.getItem('cityArray')){
        localStorage.setItem('cityArray', JSON.stringify(cityArray));
    // }

    searchButton.on('click', function(){
        var city = {
          city: $('input')[0].value,
        };
    
        localStorage.setItem('city', JSON.stringify(city));

        $('#forecast').empty();
    
        renderSearchHistory();
        getAPI();
        clearStorage();
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
              var searchHistory = $('<button type="button" class="btn btn-secondary"></button>').text(cityArray[i].city);
              $('#searchHistory').append(searchHistory);
            }
        } 
    }

    // console.log($('#searchHistory').children.length);
    // $('#searchHistory').children.forEach(function(element){
    //     element.on('click', function(){
    //         var city = {
    //             city: this.value
    //         };
        
    //         localStorage.setItem('city', JSON.stringify(city));

    //         $('#forecast').empty();
        
    //         renderSearchHistory();
    //         getAPI();
    //         clearStorage(); 
    //     })
        
    // });

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
            var cityName = $('<p></p>').text(data.name);
            var iconCode = data.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            var icon = $('<img src="">').attr('src', iconURL);
            var temp = $('<p></p>').text(data.main.temp + " °F");
            var humid = $('<p></p>').text(data.main.humidity + "% humidity");
            var wind = $('<p></p>').text(data.wind.speed + " mph wind");
            $('#current').append(cityName, icon, temp, humid, wind);
            
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            localStorage.setItem('cityLat', JSON.stringify(lat));
            localStorage.setItem('cityLon', JSON.stringify(lon));
        })

        var lat = JSON.parse(localStorage.getItem('cityLat'));
        var lon = JSON.parse(localStorage.getItem('cityLon'));
        var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + API_key;
        fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i<data.list.length; i++) {
                if (data.list[i].dt_txt.includes('12:00:00')){
                    var dateText = data.list[i].dt_txt;
                    var dayDate = $('<p></p>').text(dateText.split('').splice(0, 10).join(''));
                    var iconCode = data.list[i].weather[0].icon;
                    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                    var icon = $('<img src="">').attr('src', iconURL); 
                    var temp = $('<p></p>').text(data.list[i].main.temp + " °F");
                    var humid = $('<p></p>').text(data.list[i].main.humidity + "% humidity");
                    var wind = $('<p></p>').text(data.list[i].wind.speed + " mph wind");
                    var dayCard = $('<div class="dayCard col-12 col-md-2 card text-white bg-dark mb-3"></div>').attr('id', i+'card')
                    $('#forecast').append(dayCard);
                    $('#'+i+'card').append(dayDate, icon, temp, humid, wind);
                }
            }
        })
    } 
    
    function clearStorage(){
        localStorage.setItem('city', JSON.stringify(null));
    }

    function init(){
        renderSearchHistory();
    }

    init();
})