// ============================================================
// 5. MINI APP — Weather Dashboard (simulated API calls)
// ============================================================
// Demonstrates a real-world async/await pattern:
//   1. Fetch city coordinates
//   2. Fetch weather data in parallel for multiple cities
//   3. Display a formatted summary
//   4. Handle errors gracefully

// ─── Simulated "API" functions ───────────────────────────────
// In real life these would use fetch() or axios

function getCoordinates(city) {
  const db = {
    London:    { lat: 51.5, lon: -0.1 },
    Tokyo:     { lat: 35.6, lon: 139.6 },
    NewYork:   { lat: 40.7, lon: -74.0 },
    Unknown:   null,
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const coords = db[city];
      if (coords) {
        resolve({ city, ...coords });
      } else {
        reject(new Error(`City not found: ${city}`));
      }
    }, 200);
  });
}

function getWeather({ city, lat, lon }) {
  // Simulate weather data based on latitude
  return new Promise((resolve) => {
    setTimeout(() => {
      const temp = Math.round(20 - Math.abs(lat) * 0.3 + Math.random() * 5);
      resolve({
        city,
        temperature: temp,
        condition: temp > 15 ? "Sunny" : "Cold",
        humidity: Math.round(40 + Math.random() * 40) + "%",
      });
    }, 300);
  });
}

// ─── Main application logic ──────────────────────────────────
async function getWeatherForCity(cityName) {
  try {
    const coords  = await getCoordinates(cityName);
    const weather = await getWeather(coords);
    return weather;
  } catch (err) {
    // Return error info instead of crashing the whole app
    return { city: cityName, error: err.message };
  }
}

async function weatherDashboard(cities) {
  console.log("Fetching weather for:", cities.join(", "), "...\n");

  // Fetch ALL cities in parallel (much faster than one-by-one)
  const results = await Promise.all(cities.map(getWeatherForCity));

  console.log("=".repeat(45));
  console.log(" WEATHER DASHBOARD");
  console.log("=".repeat(45));

  for (const data of results) {
    if (data.error) {
      console.log(`  ${data.city.padEnd(10)} ❌  ${data.error}`);
    } else {
      const bar = "█".repeat(Math.max(0, data.temperature));
      console.log(
        `  ${data.city.padEnd(10)} ${String(data.temperature).padStart(3)}°C  ` +
        `${data.condition.padEnd(6)}  Humidity: ${data.humidity}`
      );
    }
  }

  console.log("=".repeat(45));

  // Bonus: find the warmest city
  const valid = results.filter((r) => !r.error);
  if (valid.length > 0) {
    const warmest = valid.reduce((a, b) =>
      a.temperature > b.temperature ? a : b
    );
    console.log(`\n Warmest city: ${warmest.city} at ${warmest.temperature}°C`);
  }
}

// ─── Run the app ─────────────────────────────────────────────
weatherDashboard(["London", "Tokyo", "NewYork", "Unknown"]);

// Run: node 5_real_world_mini_app.js
