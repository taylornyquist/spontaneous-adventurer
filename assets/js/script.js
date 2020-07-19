// seems like this one will accept uppercase or lowercase, still should use .val() and .trim()

var stateCode = "tn";

function getNPSData() {

    fetch(
        "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=" + stateCode + "&api_key=VWQc76Xi1MA1G7mT3R2RbvodV6ongjdqKvID51cV"
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
            var nationalParksListed = NPSResponse.data.length;

            //loop through all park responses
            for (i = 0; i < NPSResponse.data.length; i++) {

                //for each park listed, pull name and url
                var nationalParkName = NPSResponse.data[i].fullName;
                var nationalParkURL = NPSResponse.data[i].url;
                //for each park listed, create a list item and "a" element
                var nationalParkItem = document.createElement("li");
                var nationalParkItemLinked = document.createElement("a")
                //for each park listed, assign park name and link
                nationalParkItemLinked.textContent = nationalParkName;
                nationalParkItemLinked.href = nationalParkURL;
                console.log(nationalParkItem);
                //for each park listed, append link and item to ul
                nationalParkItem.append(nationalParkItemLinked);
                nationalParkSlot.appendChild(nationalParkItem);
                nationalParksEl.appendChild(nationalParkSlot);


                //limit parks listed to 5
                if (i >= 5) {
                    nationalParkItem.classList.add("hide");
                }
            }
            //create button below abbreviated list to show more results
            if (nationalParksListed >= 5) {
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
    var showMore = function () {
        var listItems = $(this).siblings("ul");
        var showLessBtn = $(this).siblings("button")
        var listChildren = listItems.children();

        if (listChildren.has("li.hide")) {
            listChildren.removeClass("hide");
            $(this).addClass("hide");
            console.log(listChildren)
        }
        if (listChildren.length > 5 && !listChildren.hasClass("hide")) {
            showLessBtn.removeClass("hide");
        }
    }

    var showLess = function () {
        var listItems = $(this).siblings("ul");
        var showMoreBtn = $(this).siblings("button")
        var listChildren = listItems.children();

        if (!listChildren.has("li.hide")) {
            listChildren.setAttribute("class", "hide");
            $(this).addClass("hide");
            console.log(listChildren)
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

var cityName = "nashville";

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
            ticketmasterEl.innerHTML = "<h5>Ticketmaster Events:</h5>";

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

var state = "tn";

function getCovidData() {

    fetch(
        "https://covidtracking.com/api/v1/states/" + state + "/current.json"
    )

        .then(function (CovidResponse) {
            return CovidResponse.json();
        })
        .then(function (CovidResponse) {
            console.log(CovidResponse);
            console.log(CovidResponse.positive);

        })

};

var city = "nashville"

function getWeatherForecast() {
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
                    cardEl.classList.add("two-columns", "card", "border");
                    //create element and pull date from each instance
                    var dateEl = document.createElement("h5");
                    date = weatherResponse.list[i].dt_txt;
                    dateEl.textContent = moment(date).format("MM/DD/YYYY");
                    //create element and pull icon depicting current weather conditions for each instance
                    var iconEl = document.createElement("img");
                    iconEl.src = "http://openweathermap.org/img/wn/" + weatherResponse.list[i].weather[0].icon + "@2x.png";
                    iconEl.alt = weatherResponse.list[i].weather[0].description;
                    iconEl.setAttribute("class", "icon");
                    //create element and pull temperature for each instance 
                    var tempEl = document.createElement("p");
                    tempEl.innerHTML = "<p>Temp: " + weatherResponse.list[i].main.temp + "&degF</p>";
                    //create element and pull humidity level for each instance
                    var humidityEl = document.createElement("p");
                    humidityEl.textContent = "Humidity: " + weatherResponse.list[i].main.humidity + "%";

                    //append all elements to cards
                    cardEl.appendChild(dateEl);
                    cardEl.appendChild(iconEl);
                    cardEl.appendChild(tempEl);
                    cardEl.appendChild(humidityEl);
                    // divEl.appendChild(cardEl);
                    forecastEl.append(cardEl);

                }
            }
        })
};

// Local Storage function
var searchHistory = function () {
    console.log(searchHistory);
}

// on click for search button icon
$("#search-btn").on("click", getNPSData);
$("#search-btn").on("click", getTickemaster);
console.log('test');



getNPSData();
getTickemaster();
getCovidData();
getWeatherForecast();
