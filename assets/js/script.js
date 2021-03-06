var savedLocationsArray = JSON.parse(localStorage.getItem("searched-location"));

var loadHistory = function () {

    if (!savedLocationsArray) {
        savedLocationsArray = [];
    };

    // console.log(savedLocationsArray);
    showPrevious(savedLocationsArray);
};

var showData = function () {

    // show data-section and weather-forecast (hidden on page load)
    $(".data-section").addClass("show");
    $(".weather-forecast").addClass("show");
};

// function to clear out previous NPS and weather divs
function clear() {
    // clear the city and state input boxes
    $("#city-input").val("");
    $("#state-input").val("");
    // clear all of the previous Ticketmaster data
    $("#ticketmaster").empty();
    // clear all of the previous NPS data
    $("#nationalParks").empty();
    // clear all of the previous weather data
    $("#forecast").empty();
};

function getNPSData(state) {

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

            //loop through all park responses
            for (i = 0; i < NPSResponse.data.length; i++) {

                var nationalParkResponse = NPSResponse.data[i];

                //for each park listed, pull name and url, description and image
                var nationalParkName = nationalParkResponse.fullName;
                var nationalParkURL = nationalParkResponse.url;
                var nationalParkDescription = nationalParkResponse.description;
                var nationalParkImageEl = document.createElement("img");
                var nationalParkImage = nationalParkResponse.images;

                if (nationalParkImage.length === 0) {
                    var nationalParkImageEl = document.createElement("img");
                    nationalParkImageEl.textContent = "No images available.";
                    nationalParkImageEl.setAttribute("class", "img")
                } else {
                    var nationalParkImageUrl = nationalParkImage[0].url;
                    var nationalParkImageAlt = nationalParkImage[0].altText;

                    nationalParkImageEl.src = nationalParkImageUrl;
                    nationalParkImageEl.alt = nationalParkImageAlt;
                    nationalParkImageEl.setAttribute("class", "img");
                }

                //for each park listed, create a list item and "a" element
                var nationalParkItem = document.createElement("li");
                nationalParkItem.setAttribute("class", "parkItem");
                var nationalParkItemLinked = document.createElement("a");
                nationalParkItemLinked.setAttribute("class", "park");
                nationalParkItemLinked.setAttribute("target", "_blank");
                nationalParkItemLinked.href = nationalParkURL;

                //create a div to hold image and description
                var nationalParkAdditionalInfoEl = document.createElement("div");
                nationalParkAdditionalInfoEl.setAttribute("class", "hide");
                nationalParkAdditionalInfoEl.setAttribute("id", "info")

                //add description below each park name
                var nationalParkDescriptionEl = document.createElement("p");
                nationalParkDescriptionEl.textContent = nationalParkDescription;
                nationalParkDescriptionEl.setAttribute("class", "description")

                // for each park listed, iterate through addresses and pull city/state for physical address
                for (j = 0; j < nationalParkResponse.addresses.length; j++) {

                    if (nationalParkResponse.addresses[j].type === "Physical") {

                        nationalParkCity = nationalParkResponse.addresses[j].city;
                        nationalParkState = nationalParkResponse.addresses[j].stateCode;
                        nationalParkLocation = nationalParkCity + ", " + nationalParkState;
                    }
                };

                //assign name and location to park listing
                nationalParkItemLinked.innerText = nationalParkName + " - " + nationalParkLocation;

                //for each park listed, append link and item to ul
                nationalParkAdditionalInfoEl.append(nationalParkImageEl);
                nationalParkAdditionalInfoEl.append(nationalParkDescriptionEl);
                nationalParkItem.append(nationalParkItemLinked);
                nationalParkItem.append(nationalParkAdditionalInfoEl);
                nationalParkSlot.appendChild(nationalParkItem);
                nationalParksEl.appendChild(nationalParkSlot);

                //limit parks listed to 5
                if (i >= 5) {
                    nationalParkItem.classList.add("hide");
                }

                //add function to show image upon hover
                $(".parkItem").hover(showImage, removeImage);

                var showImage = function () {
                    var parkImage = $(this).children("#info");
                    parkImage.removeClass("hide");
                };

                var removeImage = function () {
                    var parkImage = $(this).children("#info");
                    parkImage.addClass("hide");
                }
            };

            //create button below abbreviated list to show more results
            if (nationalParksListed.length >= 5) {
                var showMoreEl = document.createElement("button");
                showMoreEl.setAttribute("class", "more-btn");
                showMoreEl.textContent = "Show More";
                nationalParksEl.appendChild(showMoreEl);
                showMoreEl.addEventListener("click", showMore);
                var showLessEl = document.createElement("button");
                showLessEl.textContent = "Show Less";
                showLessEl.setAttribute("class", "more-btn");
                showLessEl.setAttribute("class", "hide");
                nationalParksEl.appendChild(showLessEl);
                showLessEl.addEventListener("click", showLess);
            }
        });

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
            showLessBtn.addClass("more-btn");
        }
    };

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

function getTickemaster(city) {

    fetch(
        "https://app.ticketmaster.com/discovery/v2/events.json?&city=" + city + "&apikey=tjyAA0gwpffEVvhQI0s0EEVJT3wznjso"
    )
        .then(function (ticketmasterResponse) {
            return ticketmasterResponse.json();
        })
        .then(function (ticketmasterResponse) {
            //Get DOM element for ticketmaster div
            var ticketmasterEl = document.getElementById("ticketmaster");

            //Sort events
            var ticketmasterArray = ticketmasterResponse._embedded.events.sort(
                (a, b) => {
                    if (a.dates.start.dateTime < b.dates.start.dateTime)
                    return -1;
                    if (a.dates.start.dateTime > b.dates.start.dateTime)
                    return 1;
                    return 0;
                }
            );

            // console.log(ticketmasterResponse);
            
            //For loop to get data from ticketmaster API
            for (i = 0; i < 5; i++) {
                //Get API data for events
                var eventName = ticketmasterArray[i].name;
                var eventDate = ticketmasterArray[i].dates.start.localDate;
                var eventTime = ticketmasterArray[i].dates.start.localTime;
                var eventVenue = ticketmasterArray[i]._embedded.venues[0].name;
                var eventUrl = ticketmasterArray[i].url;
                var eventImage = ticketmasterArray[i].images[0].url;

                //Create DOM element to hold event information
                var eventDiv = document.createElement("div");
                var eventList = document.createElement("div");

                //Create DOM element for image
                var eventImageEl = document.createElement("img");
                eventImageEl.src = eventImage;
                eventImageEl.classList.add("event-image");
                eventDiv.appendChild(eventImageEl);

                //Create DOM element for event name and append to event div
                var eventNameEl = document.createElement("a");
                eventNameEl.innerHTML = "What: " + eventName;
                eventNameEl.href = eventUrl;
                eventNameEl.target = "_blank";
                eventList.appendChild(eventNameEl);

                //Create DOM element for event date and append to event div
                var eventDateEl = document.createElement("span");
                eventDate = moment(eventDate).format("MM/DD/YYYY");
                if (Object.is(eventTime, undefined)) {
                    eventTime = "- All Day Event"    
                } else {
                    eventTime = moment(eventTime, "HH:mm:ss").format("LT")    
                };
                eventDateEl.innerHTML = "When: " + eventDate + " " + eventTime;
                eventList.appendChild(eventDateEl);

                //Create DOM element for event venue and append to event div
                var eventVenueEl = document.createElement("span");
                eventVenueEl.innerHTML = "Where: " + eventVenue;
                eventList.appendChild(eventVenueEl);

                eventDiv.classList.add("border", "event-div");
                eventList.classList.add("event-list");

                //Append eventList to ticketmaster div
                eventDiv.append(eventList);
                ticketmasterEl.append(eventDiv);
            }

            //Create link to more events
            var moreEventsEl = document.createElement("a");
            moreEventsEl.innerHTML = "Find More Events";
            moreEventsEl.href = "https://www.ticketmaster.com/search?q=" + city;
            moreEventsEl.target = "_blank";
            moreEventsEl.classList.add("border", "event-div", "more-events");
            ticketmasterEl.append(moreEventsEl);
        })
};

// state must be lowercase and two letter abbreviation, we'll use toLowerCase() method
// user will need to input both a city and a state for these api's to work

function getCovidData(state) {

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

function getCurrent(city) {

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

function getWeatherForecast(city) {

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
var saveLocation = function (city, state) {

    var newSearch =
        { "city": city, "state": state };

    // add the newSearch object to the savedLocationsArray
    savedLocationsArray.push(newSearch);
    // console.log(savedLocationsArray);

    // start remove dupicates script
    jsonObject = savedLocationsArray.map(JSON.stringify);
    // console.log(jsonObject);

    uniqueSet = new Set(jsonObject);
    savedLocationsArray = Array.from(uniqueSet).map(JSON.parse);
    // console.log(savedLocationsArray);

    // save the new array to localStorage
    localStorage.setItem("searched-location", JSON.stringify(savedLocationsArray));

    // call the showPrevious function to populate search history side bar
    showPrevious(savedLocationsArray);
};

// function showPrevious shows the previously searched locations pulled from local storage
var showPrevious = function (savedLocationsArray) {

    if (savedLocationsArray) {

        $("#prev-searches").empty();

        for (var i = 0; i < savedLocationsArray.length; i++) {

            var locationBtn = $("<button>").attr("type", "button").attr("class", "button-primary btn loc-btn").text(savedLocationsArray[i].city + ", " + savedLocationsArray[i].state);
            $("#prev-searches").prepend(locationBtn);

        }
    }
};

//script for error
function errorMessage() {
    $("#myMessage").empty();
    var message, state;
    message = document.getElementById("myMessage");
    state = document.getElementById("state-input").value;
    city = document.getElementById("city-input").value;
    // console.log(state.length);

    if (city === "") {
        message.classList.add("show");
        message.innerText = "Please be sure to enter a city.";
    }
    else if (state === "") {
        message.classList.add("show");
        message.innerText = "Please be sure to enter a state.";
    }
    else if (state.length !== 2) {
        message.classList.add("show");
        message.innerText = "Please use two-digit state abbreviation.";
        return;
    }

    else {
        searchClick();
    }
};

var checkError = function () {
    errorMessage();
}

var searchClick = function () {

    var city = document.querySelector(".search-city").value;
    var state = $("#state-input").val().trim().toLowerCase();

    saveLocation(city, state);
    getNPSData(state);
    getTickemaster(city);
    getCovidData(state);
    getCurrent(city);
    getWeatherForecast(city);
    showData();
    clear();
};

var historyClick = function (searchedCity, searchedState) {

    var city = searchedCity;
    var state = searchedState.toLowerCase();

    // saveLocation(city, state);
    getNPSData(state);
    getTickemaster(city);
    getCovidData(state);
    getCurrent(city);
    getWeatherForecast(city);
    showData();
    clear();
};

// on click for search button icon
$("#search-btn").on("click", checkError);

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

// on click for previously saved locations
$(document).on("click", ".loc-btn", function () {
    var searchedLocation = $(this)[0].innerText;

    // split searchedLocation at the comma
    var splitWords = searchedLocation.split(",");
    var searchedCity = splitWords[0].trim();
    var searchedState = splitWords[1].trim()
    // console.log(searchedCity);
    // console.log(searchedState);

    historyClick(searchedCity, searchedState);
});

loadHistory();