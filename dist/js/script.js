// Fonction pour récupérer les données météo
async function getWeather(location) {
    const baseUrl = "http://api.weatherapi.com/v1/current.json";
    const apiKey = "d9dfbfb00b864330803135127240912";
    const url = `${baseUrl}?key=${apiKey}&q=${location}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }
      const data = await response.json();
      console.log(`Météo à ${location}: ${data.current.temp_c}°C`);
      console.log(`Condition: ${data.current.condition.text}`);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }
  
  // Appeler la fonction
  getWeather();
  