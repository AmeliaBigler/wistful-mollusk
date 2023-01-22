
$(function() {
    var API_key = '33f031fef3c3c8b1b91d38ca6a1b278c';
    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + API_key;

    var city;
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
    
        renderSearch();
    })

    function renderSearch(){
        var searchedCity = JSON.parse(localStorage.getItem('city'));
        var cityArray = JSON.parse(localStorage.getItem('cityArray'));

        if (searchedCity !== null) {
            cityArray.push(searchedCity);
            localStorage.setItem('cityArray', JSON.stringify(cityArray));
            localStorage.setItem('city', null);
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

    function init(){
        renderSearch();
    }

    init();
})