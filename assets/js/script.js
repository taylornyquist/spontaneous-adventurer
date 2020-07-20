// add saved locations array (not sure if we need this?)
var savedLocationsArray = JSON.parse(localStorage.getItem("searched-cities"));

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
            var nationalParksListed = NPSResponse.data;
            console.log(NPSResponse);

            //loop through all park responses
            for (i = 0; i < NPSResponse.data.length; i++) {

                //for each park listed, pull name and url
                var nationalParkName = NPSResponse.data[i].fullName;
                var nationalParkURL = NPSResponse.data[i].url;
                var nationalParkImage = NPSResponse.data[i].images;

                // debugger;
                if (nationalParkImage[0]){
                    var nationalParkImageUrl = nationalParkImage[0].url;
                    var nationalParkImageAlt = nationalParkImage[0].altText;

                   

                    //add function to show image upon hover
                    $(nationalParkItem).hover(showImage, removeImage); 
                        
                        var showImage = function() {
                        var parkImage = $(this).children("img");
                        parkImage.removeClass("hide");
                        };

                        var removeImage = function() {
                            var parkImage = $(this).children("img");
                            parkImage.addClass("hide");
                        }
//     var selectedPark = $(this)
//     var parkImages = $(this).images;
//     console.log(selectedPark);
//     var parkImageURL = NPSResponse.data[i].images[0].url;
//    var parkImageEl = document.createElement("img");

//    parkImageEl.src = parkImageURL;
//    console.log(parkImage);

// })
                    console.log(nationalParkImageUrl);
                } else {
                    console.log("No images available")
                    
                }
                //for each park listed, create a list item and "a" element
                var nationalParkItem = document.createElement("li");
                var nationalParkItemLinked = document.createElement("a")
                //for each park listed, assign park name and link
                nationalParkItemLinked.textContent = nationalParkName;
                nationalParkItemLinked.href = nationalParkURL;
                //add image to each element
                var nationalParkImageEl = document.createElement("img")
                nationalParkImageEl.src = nationalParkImageUrl;
                nationalParkImageEl.height ="150";
                nationalParkImageEl.style.cssFloat = "right";
                nationalParkImageEl.alt = nationalParkImageAlt;
                nationalParkImageEl.setAttribute("class", "hide");
                //for each park listed, append link and item to ul
                nationalParkItem.append(nationalParkImageEl);
                nationalParkItem.append(nationalParkItemLinked);
                nationalParkSlot.appendChild(nationalParkItem);
                nationalParksEl.appendChild(nationalParkSlot);

                //display image of park on hover



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




var cityName = "nashville";

function getTickemaster() {

    fetch(
        "https://app.ticketmaster.com/discovery/v2/events.json?&city=" + cityName + "&apikey=tjyAA0gwpffEVvhQI0s0EEVJT3wznjso"
    )
        .then(function (ticketmasterResponse) {
            return ticketmasterResponse.json();
        })
        .then(function (ticketmasterResponse) {
            console.log(ticketmasterResponse);
            console.log(ticketmasterResponse._embedded.events[0].name);
            console.log(ticketmasterResponse._embedded.events[0].url);

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

            var covidPositive = (CovidResponse.positive).toLocaleString();
            $("#covid-data").text(covidPositive);

            var covidState = state.toUpperCase();
            $("#covid-state").text(covidState);

        })

};

var city = "nashville"

function getWeatherForecast() {
    fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=23374a7ea0862c1bbdc6d9a18c5c0b7a"
    )
    .then(function(weatherResponse) {
        return weatherResponse.json();
    })
    .then(function(weatherResponse) {
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

var click = function() {
    console.log("test");
    getNPSData();
    getTickemaster();
    getCovidData();
    getWeatherForecast();
}

// on click for search button icon
$("#search-btn").on("click", click);


$("#search-input").on("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
})



