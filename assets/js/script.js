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
            console.log(NPSResponse);
            console.log(NPSResponse.data[0].fullName);
            console.log(NPSResponse.data[0].description);

        })

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
        
        })

};




getNPSData();
getTickemaster();
getCovidData();