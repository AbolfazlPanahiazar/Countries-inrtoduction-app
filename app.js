// Get data and push it into select element
$.ajax({
  url: "https://restcountries.eu/rest/v2/all",
  method: "GET",
  timeout: 0,
}).done((response) => {
  response.forEach((element) => {
    const temp = $("<option></option>").text(element.name);
    $("select").append(temp);
  });
});

$("#select").change(() => {
  $.ajax({
    url: `https://restcountries.eu/rest/v2/name/${$("#select option:selected").val()}`,
    method: "GET",
    timeout: 0,
  }).done((country) => {
    // Name section
    $("#name").text(country[0].name);
    $("#nativeName").text(country[0].nativeName);
    $("#capital").text(country[0].capital);
    $("#region").text(country[0].region);
    $("#population").text(country[0].population);
    let langs = [];
    for (let lang of country[0].languages) {
      langs.push(lang.name);
    }
    $("#languages").text(langs.join(", "));
    $("#timezones").text(country[0].timezones.join(", "));

    // Calling code section
    $("#callingCode").text(country[0].callingCodes.join(", "));

    // Flag section
    $("#flag").attr("src", country[0].flag);

    // Wheater section
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?q=${country[0].capital}&appid=db8863a90ed0b4976fe8b4361160d04a`,
      method: "GET",
      timeout: 0,
    }).done((weather) => {
      $("#windSpeed").text(weather.wind.speed);
      $('#temperature').text((weather.main.temp - 273).toFixed(2));
      $('#humidity').text(weather.main.humidity);
      $('#visibility').text(weather.visibility);
    });

    // Map section
    $("#map").empty();
    const app = new Mapp({
      element: "#map",
      presets: {
        latlng: {
          lat: country[0].latlng[0],
          lng: country[0].latlng[1],
        },
        zoom: 4,
      },
      apiKey:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlmMWJmOGM1MzQxMTgwYTAxMmNiMDQ4ZTUzMWZiODZlY2Y5NTQwZWU1NjBhMWFjNTViYmVlNTdhOWViOWJhNjNkZmZlODk4NTU4ZTM4MmVhIn0.eyJhdWQiOiI5NTI4IiwianRpIjoiOWYxYmY4YzUzNDExODBhMDEyY2IwNDhlNTMxZmI4NmVjZjk1NDBlZTU2MGExYWM1NWJiZWU1N2E5ZWI5YmE2M2RmZmU4OTg1NThlMzgyZWEiLCJpYXQiOjE1OTE0NDQyMjEsIm5iZiI6MTU5MTQ0NDIyMSwiZXhwIjoxNTk0MDM2MjIxLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.EQ2TwYQ3smTxplc7YsLx4Mw5nWsW57rAOsmmiSaiJh4nFdwDtPXwkuF_YAAHMs0dkHm6OxqW4iYTL6-9ilMwUvgJ_mXAI13YV9MPYqW_VmRAuNeJxUffVMJ0peqbHE0-AbYhVAcGdgAlY0ULZcSFRaDg0HpB0MyWK51d-Xr604oK4I1_nXvhh0_XYHWGx-dc2IlV7Z4w9fsyeBK4POAFYdulquAYFkmPrnMwbWybEXrcLnU7vShp1MKz5ieFMQZ5jaKWXt1eV148COCYuiJhSx0tSKdV5PSEGn8T1J9DGonFl641pMJNzRA45C08L58ktQ2eLOfYfq2aB7iAGqNsnA",
    });
    app.addLayers();
    app.addMarker({
      name: "basic-marker",
      latlng: {
        lat: country[0].latlng[0],
        lng: country[0].latlng[1],
      },
      popup: {
        title: {
          html: country[0].name,
        },
        description: {
          html: country[0].capital,
        },
        open: false,
      },
    });
  });
});
