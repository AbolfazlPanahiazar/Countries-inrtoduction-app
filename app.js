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
