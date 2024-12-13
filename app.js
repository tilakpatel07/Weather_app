const container = document.querySelector(".container");
const search = document.querySelector(".container button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather_details");

search.addEventListener("click", () => {
  const APIkey = "3315c56100a2dbda32546981decf8948";
  const city = document.querySelector(".search-box input").value;

  if (city == "") {
    return;
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const image = document.querySelector(".weather-box img");
        const temp = document.querySelector(".temperature");
        const description = document.querySelector(".description");
        const humidity = document.querySelector(".humidity span");
        const wind = document.querySelector(".wind span");
        const error = document.querySelector(".not-found");

        if (data.cod == "404") {
          container.style.height = "400px";
          weatherBox.classList.remove("active");
          weatherDetails.classList.remove("active");
          error.classList.add("active");
          return;
        } else {
          container.style.height = "555px";
          weatherBox.classList.add("active");
          weatherDetails.classList.add("active");
          error.classList.remove("active");

          switch (data.weather[0].main) {
            case "Clear":
              image.src = "./images/clear.png";
              break;

            case "Clouds":
              image.src = "./images/cloud.png";
              break;

            case "Rain":
              image.src = "./images/rain.png";
              break;

            case "Snow":
              image.src = "./images/snow.png";
              break;

            case "Mist":
              image.src = "./images/mist.png";
              break;

            case "Haze":
              image.src = "./images/mist.png";
              break;

            default:
              image.src = "./images/cloud.png";
          }

          temp.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
          description.innerHTML = `${data.weather[0].description}`;
          humidity.innerHTML = `${data.main.humidity}%`;
          wind.innerHTML = `${parseInt(data.wind.speed)}km/h`;
        }
      });
  }
});
