var savedLocationsArray = JSON.parse(localStorage.getItem("searched-cities"));

// function to clear out previous NPS and weather divs
function clear() {
    // clear all of the previous Ticketmaster data
    $("#ticketmaster").empty();
    // clear all of the previous NPS data
    $("#nationalParks").empty();
    // clear all of the previous weather data
    $("#forecast").empty();
};

// seems like this one will accept uppercase or lowercase, still should use .val() and .trim()
// var stateCode = "tn";

function getNPSData() {

    var state = $("#state-input").val().trim().toLowerCase();

    fetch(
        "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=" + state + "&api_key=VWQc76Xi1MA1G7mT3R2RbvodV6ongjdqKvID51cV"
    )

        .then(function (NPSResponse) {
            return NPSResponse.json();
        })
        .then(function (NPSResponse) {
            //attach Javascript to existing element in document
            var nationalParksEl = document.getElementById("nationalParks");
            //create ul element to hold list items
            var nationalParkSlot = document.createElement("ul");
            nationalParkSlot.setAttribute("id", "npList")
            var nationalParksListed = NPSResponse.data;
<<<<<<< HEAD
           
            
            console.log(NPSResponse);
=======
            // console.log(NPSResponse);
>>>>>>> master

            //loop through all park responses
            for (i = 0; i < NPSResponse.data.length; i++) {

                var nationalParkResponse = NPSResponse.data[i];

                //for each park listed, pull name and url, description and image
                var nationalParkName = nationalParkResponse.fullName;
                var nationalParkURL = nationalParkResponse.url;
                var nationalParkDescription = nationalParkResponse.description;
                var nationalParkImage = nationalParkResponse.images;
                var missingImage = document.createElement("button");
                missingImage.textContent = "No images available.";
            missingImage.setAttribute("class", "hide");

                // debugger;
                if (nationalParkImage[0]) {
                    var nationalParkImageUrl = nationalParkImage[0].url;
                    var nationalParkImageAlt = nationalParkImage[0].altText;



                    //add function to show image upon hover
                    $(nationalParkItem).hover(showImage, removeImage); 
                        
                        var showImage = function() {
                        var parkInfo = $(this).children("div");
                        parkInfo.removeClass("hide");
                        };

                        var removeImage = function() {
                            var parkInfo = $(this).children("div");
                            parkInfo.addClass("hide");
                        }

                    // console.log(nationalParkImageUrl);
                } else {
                    // nationalParkImageEl.addClass("hide");
                    var parkBtn = $(this).children("button");
                    parkBtn.removeClass("hide");

                }

               
                //for each park listed, create a list item and "a" element
                var nationalParkItem = document.createElement("li");
                nationalParkItem.setAttribute("class", "parkItem");
                var nationalParkItemLinked = document.createElement("h6");
                nationalParkItemLinked.setAttribute("class", "park");


                 //create button with link to website that appears below image
                // nationalParkItemLinked.href = nationalParkURL;
                
                
                
                //create a div to hold image and description
                var nationalParkAdditionalInfoEl = document.createElement("div");
                // nationalParkAdditionalInfoEl.setAttribute("id", "info")
                //add description below each park name
                var nationalParkDescriptionEl = document.createElement("p");
                nationalParkDescriptionEl.textContent = nationalParkDescription;
                nationalParkDescriptionEl.setAttribute("class", "description")
                //add image to each element
                var nationalParkImageEl = document.createElement("img")
                nationalParkImageEl.src = nationalParkImageUrl;
                nationalParkImageEl.alt = nationalParkImageAlt;
                nationalParkImageEl.setAttribute("class", "img");
                nationalParkAdditionalInfoEl.setAttribute("class", "hide");

                //add city/state label to image
                // var nationalParkLocationEl = document.createElement("title");

                 // for each park listed, iterate through addresses and pull city/state for physical address
                 for (j = 0; j < nationalParkResponse.addresses.length; j++) {

                    if (nationalParkResponse.addresses[j].type === "Physical") {
                
                        nationalParkCity = nationalParkResponse.addresses[j].city;
                        nationalParkState = nationalParkResponse.addresses[j].stateCode;
                        // console.log(nationalParkCity);
                        // console.log(nationalParkState);
                        nationalParkLocation = nationalParkCity + ", " + nationalParkState;
                        
                    }
                }

                //assign name and location to park listing
                nationalParkItemLinked.innerText = nationalParkName + " - " + nationalParkLocation;
               

                //for each park listed, append link and item to ul
                nationalParkAdditionalInfoEl.append(nationalParkDescriptionEl);
                nationalParkAdditionalInfoEl.append(nationalParkImageEl);
                nationalParkAdditionalInfoEl.append(missingImage);
                nationalParkItem.append(nationalParkItemLinked);
                nationalParkItem.append(nationalParkAdditionalInfoEl);
                // nationalParkItem.append(nationalParkImageEl);
                nationalParkSlot.appendChild(nationalParkItem);
                nationalParksEl.appendChild(nationalParkSlot);

                //limit parks listed to 5
                if (i >= 5) {
                    nationalParkItem.classList.add("hide");
                }
            }
            //create button below abbreviated list to show more results
            if (nationalParksListed.length >= 5) {
                var showMoreEl = document.createElement("button");
                showMoreEl.textContent = "Show More";
                nationalParksEl.appendChild(showMoreEl);
                showMoreEl.addEventListener("click", showMore);
                var showLessEl = document.createElement("button");
                showLessEl.textContent = "Show Less";
                showLessEl.setAttribute("class", "hide");
                nationalParksEl.appendChild(showLessEl);
                showLessEl.addEventListener("click", showLess);
            }
        })

        //function to show more results
    var showMore = function () {
        var listItems = $(this).siblings("ul");
        var showLessBtn = $(this).siblings("button")
        var listChildren = listItems.children();

        if (listChildren.has("li.hide")) {
            listChildren.removeClass("hide");
            $(this).addClass("hide");
        }
        if (listChildren.length > 5 && !listChildren.hasClass("hide")) {
            showLessBtn.removeClass("hide");
        }
    }

    //function to show fewer results
    var showLess = function () {
        var listItems = $(this).siblings("ul");
        var showMoreBtn = $(this).siblings("button")
        var listChildren = listItems.children();

        if (!listChildren.has("li.hide")) {
            listChildren.setAttribute("class", "hide");
            $(this).addClass("hide");
        }
        if (listChildren.length >= 5) {
            for (i = 0; i < listChildren.length; i++) {
                if (i >= 5) {
                    listChildren[i].classList.add("hide");
                }
            }
            $(this).addClass("hide");
            showMoreBtn.removeClass("hide");
        }
    };
};

// var cityName = "nashville";

function getTickemaster() {
    //Get DOM element for search value to place in API call
    var searchInput = document.querySelector(".search-city").value;

    fetch(
        "https://app.ticketmaster.com/discovery/v2/events.json?&city=" + searchInput + "&apikey=tjyAA0gwpffEVvhQI0s0EEVJT3wznjso"
    )
        .then(function (ticketmasterResponse) {
            return ticketmasterResponse.json();
        })
        .then(function (ticketmasterResponse) {
            //Get DOM element for ticketmaster div
            var ticketmasterEl = document.getElementById("ticketmaster");
            // ticketmasterEl.innerHTML = "<h5>Ticketmaster Events:</h5>";

            //For loop to get data from ticketmaster API
            for (i = 0; i < 5; i++) {
                //Get API data for events
                var eventName = ticketmasterResponse._embedded.events[i].name;
                var eventDate = ticketmasterResponse._embedded.events[i].dates.start.localDate;
                var eventTime = ticketmasterResponse._embedded.events[i].dates.start.localTime;
                var eventVenue = ticketmasterResponse._embedded.events[i]._embedded.venues[0].name;
                var eventUrl = ticketmasterResponse._embedded.events[i].url;

                //Create DOM element to hold event information
                var eventList = document.createElement("div")

                //Create DOM element for event name and append to event div
                var eventNameEl = document.createElement("a");
                eventNameEl.innerHTML = "What: " + eventName;
                eventNameEl.href = eventUrl;
                eventNameEl.target = "_blank";
                eventList.appendChild(eventNameEl);

                //Create DOM element for event date and append to event div
                var eventDateEl = document.createElement("span");
                eventDate = moment(eventDate).format("MM/DD/YYYY");
                eventTime = moment(eventTime, "HH:mm:ss").format("LT");
                eventDateEl.innerHTML = "When: " + eventDate + " at " + eventTime;
                eventList.appendChild(eventDateEl);

                //Create DOM element for event venue and append to event div
                var eventVenueEl = document.createElement("span");
                eventVenueEl.innerHTML = "Where: " + eventVenue;
                eventList.appendChild(eventVenueEl);

                eventList.classList.add("border", "event-div");

                //Append eventList to ticketmaster div
                ticketmasterEl.append(eventList);
            }
            
            
        })
};

// state must be lowercase and two letter abbreviation, we'll use toLowerCase() method
// user will need to input both a city and a state for these api's to work

function getCovidData() {
    // var state = "tn";
    var state = $("#state-input").val().trim().toLowerCase();

    fetch(
        "https://covidtracking.com/api/v1/states/" + state + "/current.json"
    )

        .then(function (CovidResponse) {
            return CovidResponse.json();
        })
        .then(function (CovidResponse) {
            // console.log(CovidResponse);
            // console.log(CovidResponse.positive);

            var covidPositive = (CovidResponse.positive).toLocaleString();
            $("#covid-data").text(covidPositive);

            var covidState = state.toUpperCase();
            $("#covid-state").text(covidState);

            $(".covid-warning").addClass("show");

        })

};

// var city = "nashville"

function getCurrent() {

    var city = document.querySelector(".search-city").value;

    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1a779978d53b819f8904840069dffbb8&units=imperial"
    )
        .then(function (currentResponse) {
            return currentResponse.json();
        })
        .then(function (currentResponse) {
            // console.log(currentResponse);

            // generate header for section
            $("#weather-header").text("Weather for " + currentResponse.name + ":");

            // create card to hold current weather data
            var currentCardEl = document.createElement("div");
            currentCardEl.classList.add("two", "columns", "card", "border");

            // create card header with city name
            var currentCardHeaderEl = document.createElement("div");
            currentCardHeaderEl.textContent = "Current";

            // create element and pull icon depicting current weather conditions
            var currentIconDiv = document.createElement("div");
            var currentIconEl = document.createElement("img");
            currentIconEl.src = "https://openweathermap.org/img/wn/" + currentResponse.weather[0].icon + ".png";
            currentIconEl.alt = currentResponse.weather[0].description;
            currentIconEl.setAttribute("class", "icon");

            // create div element for temp and humidity <p> tags
            var currentCardBody = document.createElement("div");
            currentCardBody.setAttribute("class", "card-body");

            // create element and pull temperature
            var currentTempEl = document.createElement("p");
            currentTempEl.innerHTML = "<p>Temp: " + currentResponse.main.temp + "&degF</p>";

            // create element and pull humidity level
            var currentHumidityEl = document.createElement("p");
            currentHumidityEl.textContent = "Humidity: " + currentResponse.main.humidity + "%";

            // append all elements to cards
            currentCardEl.appendChild(currentCardHeaderEl);
            currentCardEl.appendChild(currentIconDiv);
            currentIconDiv.appendChild(currentIconEl);
            currentCardEl.appendChild(currentCardBody);
            currentCardBody.appendChild(currentTempEl);
            currentCardBody.appendChild(currentHumidityEl);

            // append current weather card to the page
            $("#forecast").append(currentCardEl);

        });    
};

function getWeatherForecast() {

    var city = document.querySelector(".search-city").value;

    fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=23374a7ea0862c1bbdc6d9a18c5c0b7a"
    )
        .then(function (weatherResponse) {
            return weatherResponse.json();
        })
        .then(function (weatherResponse) {
            //create element to house forecast information
            var forecastEl = $("#forecast");
            forecastEl.innerHTML = "<h4>" + city + ":</h4>";
            // var forecastRowEl = document.createElement("div");
            // forecastRowEl.className = "row";
            // var divEl = document.createElement("div");
            // divEl.classList.add("card-deck");


            for (i = 0; i < weatherResponse.list.length; i++) {
                //find instances in the forecast data occurring at 3 p.m. 
                if (weatherResponse.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                    //create cards to hold forecast data
                    var cardEl = document.createElement("div");
                    cardEl.classList.add("two", "columns", "card", "border");

                    //create element and pull date from each instance
                    var dateEl = document.createElement("div");
                    date = weatherResponse.list[i].dt_txt;
                    dateEl.textContent = moment(date).format("MM/DD/YY");

                    //create element and pull icon depicting current weather conditions for each instance
                    var iconDiv = document.createElement("div");
                    var iconEl = document.createElement("img");
                    iconEl.src = "http://openweathermap.org/img/wn/" + weatherResponse.list[i].weather[0].icon + ".png";
                    iconEl.alt = weatherResponse.list[i].weather[0].description;
                    iconEl.setAttribute("class", "icon");

                    //create div element for temp and humidiy <p> tags
                    var cardBody = document.createElement("div");
                    cardBody.setAttribute("class", "card-body");

                    //create element and pull temperature for each instance 
                    var tempEl = document.createElement("p");
                    tempEl.innerHTML = "<p>Temp: " + weatherResponse.list[i].main.temp + "&degF</p>";

                    //create element and pull humidity level for each instance
                    var humidityEl = document.createElement("p");
                    humidityEl.textContent = "Humidity: " + weatherResponse.list[i].main.humidity + "%";

                    //append all elements to cards
                    cardEl.appendChild(dateEl);
                    cardEl.appendChild(iconDiv);
                    iconDiv.appendChild(iconEl);
                    cardEl.appendChild(cardBody);
                    cardBody.appendChild(tempEl);
                    cardBody.appendChild(humidityEl);
                    // divEl.appendChild(cardEl);
                    forecastEl.append(cardEl);

                }
            }
        })
};

// local storage function
var saveLocation = function (city) {
    // console.log(cityLocation);

    // add location to the saved locations array
    if (savedLocationsArray === null) {
        savedLocationsArray = [city];
    } else if (savedLocationsArray.indexOf(city) === -1) {
        savedLocationsArray.push(city);
    }

    // save the new array to localStorage
    localStorage.setItem("city-input", JSON.stringify(savedLocationsArray));
    localStorage.setItem("state-input", JSON.stringify(savedLocationsArray));
    // console.log(savedLocationsArray);
    showPrevious();

};


// function showPrevious shows the previously searched locations pulled from local storage
var showPrevious = function () {

    if (savedLocationsArray) {

        $("#prev-searches").empty();
        var btns = $("<div>").attr("class", "list-group");
        for (var i = 0; i < savedLocationsArray.length; i++) {
            var locationBtn = $("<button>").attr("class", "loc-btn list-group-item list-group-item-action list-group-item-primary").text(savedLocationsArray[i]);
            btns.prepend(locationBtn);
        }

        $("#prev-searches").append(btns);

    }
};


var click = function () {

    getNPSData();
    getTickemaster();
    getCovidData();
    getCurrent();
    getWeatherForecast();
    clear();
}

// on click for search button icon

$("#search-btn").on("click", click);


$("#city-input").on("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
});

$("#state-input").on("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
});



