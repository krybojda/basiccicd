interface WeatherSample {
  city: string;
  temperatureC: number;
  humidity: number;
  condition: string;
}

const SAMPLE_DATA: Record<string, WeatherSample> = {
  warszawa: { city: 'Warszawa', temperatureC: 18, humidity: 62, condition: 'Partly cloudy' },
  krakow: { city: 'Kraków', temperatureC: 16, humidity: 70, condition: 'Light rain' },
  gdansk: { city: 'Gdańsk', temperatureC: 14, humidity: 78, condition: 'Windy' }
};

function getSampleWeather(city: string): WeatherSample {
  const normalizedCity = city
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (!normalizedCity) {
    throw new Error('Podaj nazwę miasta, np. "Warszawa".');
  }

  return SAMPLE_DATA[normalizedCity] ?? {
    city,
    temperatureC: 20,
    humidity: 60,
    condition: 'Sunny'
  };
}

function formatWeatherReport(sample: WeatherSample): string {
  return [
    `Pogoda dla: ${sample.city}`,
    `Temperatura: ${sample.temperatureC}°C`,
    `Wilgotność: ${sample.humidity}%`,
    `Warunki: ${sample.condition}`
  ].join('\n');
}

if (require.main === module) {
  const city = process.argv[2] ?? 'Warszawa';

  try {
    const weather = getSampleWeather(city);
    console.log('=== Przykładowy program pogodowy ===');
    console.log(formatWeatherReport(weather));
    console.log('\nTo proste demo CLI do szybkiego pokazania działania.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Nieznany błąd';
    console.error(`Błąd: ${message}`);
    process.exit(1);
  }
}
