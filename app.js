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
    // Name seciont
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
    $("#flag").attr("src", country[0].flag);
    $("#code").text(country[0].callingCodes.join(","));
  });
});
