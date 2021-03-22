// Foursquare API Info
const clientId = '2HEZONP5JJM4UK0XNPYMQIBCS3ZWIGABQYEQDEMHWKCVHRL0';
const clientSecret = 'M2A0B3JC3KSICMLB24LEJWROEWZRULB00ZDJSZX0XXF23ZFD';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '5a49e050390ab462e4db42ebb2b6eb85';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
const city = $input.val();
const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v-20210321`;
try {
const response = await fetch(urlToFetch);
} catch (error) {
  console.log(error);
} if (response.ok) {
  const jsonResponse = await response.json();
  return jsonResponse;
}
const venues = jsonResponse.response.groups[0].items;
console.log(venues);
return venues;
}

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
  try {
    const response = await fetch(urlToFetch);
  } catch (error) {}

}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
const venue = venues[index];
const venueIcon = venue.categories[0].icon;
const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};
	let weatherContent = '';
  $weatherDiv.append(weatherContent);

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast()
  return false;
}

$submit.click(executeSearch)