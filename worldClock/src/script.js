function updateTime() {
  //Milan

  let milanElement = document.querySelector("#milan");
  let milanDateElement = milanElement.querySelector(".date");
  let milanTimeElement = milanElement.querySelector(".time");

  let milanTime = moment().tz("Europe/Vatican");
  milanDateElement.innerHTML = milanTime.format("MMMM do, YYYY");
  milanTimeElement.innerHTML = milanTime.format("h:mm:ss[<small>]A[</small>]");

  //Accra

  let accraElement = document.querySelector("#accra");
  let accraDateElement = accraElement.querySelector(".date");
  let accraTimeElement = accraElement.querySelector(".time");

  let accraTime = moment().tz("Africa/Accra");
  accraDateElement.innerHTML = accraTime.format("MMMM do, YYYY");
  accraTimeElement.innerHTML = accraTime.format("h:mm:ss[<small>] A[</small>]");
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
    <div class="city">
      <div>
        <h2>${cityName}</h2>
        <div class="date">${cityTime.format("MMMM do, YYYY")}</div>
      </div>
      <div>
        <div class="time">
          ${cityTime.format("h:mm:ss")}
          <small>${cityTime.format("A")}</small>
        </div>
      </div>
    </div> 
    <a href="/">Back</a>
  `;
}

updateTime();
setInterval(updateTime, 1000);

let citySelectElement = document.querySelector("#city");
citySelectElement.addEventListener("change", updateCity);
