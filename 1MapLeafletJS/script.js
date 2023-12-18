// minimal configure
new Autocomplete("search", {
  // default selects the first item in
  // the list of results
  selectFirst: true,

  // The number of characters entered should start searching
  howManyCharacters: 2,

  // onSearch
  onSearch: ({ currentValue }) => {
    // You can also use static files
    // const api = '../static/search.json'
    const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&city=${encodeURI(
      currentValue
			)}`;

// Creating 
 // OR -------------------------------

    /**
     * Promise
     */
    return new Promise((resolve) => {
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          resolve(data.features);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  },
  // nominatim GeoJSON format parse this part turns json into the list of
  // records that appears when you type.
  onResults: ({ currentValue, matches, template }) => {
    const regex = new RegExp(currentValue, "gi");

    // if the result returns 0 we
    // show the no results element
    return matches === 0
      ? template
      : matches
          .map((element) => {
            return `
          <li class="loupe">
            <p>
              ${element.properties.display_name.replace(
                regex,
                (str) => `<b>${str}</b>`
              )}
            </p>
          </li> `;
          })
          .join("");
  },

  // we add an action to enter or click
  onSubmit: ({ object }) => {
    // remove all layers from the map
    map.eachLayer(function (layer) {
      if (!!layer.toGeoJSON) {
        map.removeLayer(layer);
      }
    });

    const { display_name } = object.properties;
    const [lng, lat] = object.geometry.coordinates;

    const marker = L.marker([lat, lng], {
      title: display_name,
    });

    marker.addTo(map).bindPopup(display_name);

    map.setView([lat, lng], 8);
  },

  // get index and data from li element after
  // hovering over li with the mouse or using
  // arrow keys ↓ | ↑
  onSelectedItem: ({ index, element, object }) => {
    console.log("onSelectedItem:", index, element, object);
  },

  // the method presents no results element
  noResults: ({ currentValue, template }) =>
    template(`<li>No results found: "${currentValue}"</li>`),
	});
         
// Creating a 
/*
 var map = L.map('map').setView([31.765537, 35.178223], 15);    

 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© Open'
	}).addTo(map);
	
	var marker = L.marker([31.765537, 35.178223]).addTo(map);
         */
				 
   const config = {
  minZoom: 17,
  maxZomm: 27,
};
// magnification with which the map will start
const zoom = 21;

// coordinates
const lat = 31.765537;
const lng = 35.178223;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// Used to load and display tile layers on the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);    




