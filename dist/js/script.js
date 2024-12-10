const apiKey = "d9dfbfb00b864330803135127240912";

const search = document.getElementById("search");

document.addEventListener("DOMContentLoaded", function () {
  console.log("Le document HTML est prêt !");

  // Obtenir la date actuelle
  const aujourdHui = new Date();

  // Tableau des jours de la semaine
  const joursSemaine = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  // Fonction pour obtenir une date future
  function obtenirDateFuture(baseDate, joursAjoutes) {
    const futureDate = new Date(baseDate);
    futureDate.setDate(baseDate.getDate() + joursAjoutes);
    return futureDate;
  }

  // Obtenir les dates futures
  const aujourdHuiDate = aujourdHui; // Aujourd'hui
  const demainDate = obtenirDateFuture(aujourdHui, 1); // Demain
  const surlendemainDate = obtenirDateFuture(aujourdHui, 2); // Surlendemain
  const dansTroisJoursDate = obtenirDateFuture(aujourdHui, 3); // Dans 3 jours

  // Fonction pour extraire le jour et la date séparément
  function extraireJourEtDate(date) {
    const jourSemaine = joursSemaine[date.getDay()]; // Nom du jour
    const jour = date.getDate(); // Jour du mois
    const mois = date.getMonth() + 1; // Mois (les mois commencent à 0)
    const annee = date.getFullYear(); // Année
    const dateComplete = `${jour}/${mois}/${annee}`; // Formater la date
    const dateAPI = `${annee}-${mois}-${jour}`; // Formater la date pour l'API
    return { jourSemaine, dateComplete, dateAPI};
  }

  // Extraire les données pour chaque date
  const aujourdHuiData = extraireJourEtDate(aujourdHuiDate);
  const demainData = extraireJourEtDate(demainDate);
  const surlendemainData = extraireJourEtDate(surlendemainDate);
  const dansTroisJoursData = extraireJourEtDate(dansTroisJoursDate);

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        // Succès : on récupère la position
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`Latitude : ${latitude}, Longitude : ${longitude}`);

        // Construire la chaîne GPS
        let gps = `${latitude},${longitude}`;

        // Appeler la fonction pour récupérer la météo
        await getWeather(gps);
      },
      function (error) {
        // En cas d’erreur
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("Permission refusée par l'utilisateur.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Position non disponible.");
            break;
          case error.TIMEOUT:
            console.error("La demande a expiré.");
            break;
          default:
            console.error("Une erreur inconnue s'est produite.");
            break;
        }
      }
    );
  } else {
    console.error(
      "La géolocalisation n'est pas prise en charge par ce navigateur."
    );
  }

  // QUand je clique l'input de recherche ça efface le value
  search.addEventListener("click", function () {
    search.value = "";
  });
  search.addEventListener("keypress", async function (e) {
    if (e.key === "Enter") {
      await getWeather(search.value);
    }
  });

  // Fonction pour récupérer les données météo
  async function getWeather(location) {
    const baseUrl = "https://api.weatherapi.com/v1/forecast.json";
    const url = `${baseUrl}?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no`;
    console.log(url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }
      const data = await response.json();
      console.log(`Météo à ${data.location.name} : ${data.current.temp_c}°C`);
      console.log(`Condition: ${data.current.condition.text}`);
      const day0 = document.getElementById("day0");
      const date0 = document.getElementById("date0");
      const img0 = document.getElementById("img0");
      const celsius0 = document.getElementById("celsius0");
      const condition0 = document.getElementById("condition0");
      const day1 = document.getElementById("day1");
      const date1 = document.getElementById("date1");
      const img1 = document.getElementById("img1");
      const celsius1 = document.getElementById("celsius1");
      const condition1 = document.getElementById("condition1");
      const day2 = document.getElementById("day2");
      const date2 = document.getElementById("date2");
      const img2 = document.getElementById("img2");
      const celsius2 = document.getElementById("celsius2");
      const condition2 = document.getElementById("condition2");
      const day3 = document.getElementById("day3");
      const date3 = document.getElementById("date3");
      const img3 = document.getElementById("img3");
      const celsius3 = document.getElementById("celsius3");
      const condition3 = document.getElementById("condition3");

      search.value = data.location.name;
      day0.innerHTML = aujourdHuiData.jourSemaine;
      date0.innerHTML = aujourdHuiData.dateComplete;
      img0.src = data.current.condition.icon;
      img0.alt = data.current.condition.text;
      celsius0.innerHTML = `${data.current.temp_c}°C`;
      condition0.innerHTML = data.current.condition.text;

      day1.innerHTML = demainData.jourSemaine;
      date1.innerHTML = demainData.dateComplete;
      img1.src = data.forecast.forecastday[1].day.condition.icon;
      img1.alt = data.forecast.forecastday[1].day.condition.text;
      celsius1.innerHTML = `${data.forecast.forecastday[1].day.avgtemp_c}°C`;
      condition1.innerHTML = data.forecast.forecastday[1].day.condition.text;

      day2.innerHTML = surlendemainData.jourSemaine;
      date2.innerHTML = surlendemainData.dateComplete;
      img2.src = data.forecast.forecastday[2].day.condition.icon;
      img2.alt = data.forecast.forecastday[2].day.condition.text;
      celsius2.innerHTML = `${data.forecast.forecastday[2].day.avgtemp_c}°C`;
      condition2.innerHTML = data.forecast.forecastday[2].day.condition.text;

      day3.innerHTML = dansTroisJoursData.jourSemaine;
      date3.innerHTML = dansTroisJoursData.dateComplete;
      img3.src = data.forecast.forecastday[3].day.condition.icon;
      img3.alt = data.forecast.forecastday[3].day.condition.text;
      celsius3.innerHTML = `${data.forecast.forecastday[3].day.avgtemp_c}°C`;
      condition3.innerHTML = data.forecast.forecastday[3].day.condition.text;

    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }
});