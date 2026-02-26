import { formatWeatherReport, getSampleWeather } from '../exampleProgram';

describe('Example weather program', () => {
  it('returns predefined weather data for Warszawa', () => {
    const sample = getSampleWeather('Warszawa');

    expect(sample.city).toBe('Warszawa');
    expect(sample.temperatureC).toBe(18);
  });

  it('returns fallback weather for unknown city', () => {
    const sample = getSampleWeather('Radom');

    expect(sample.city).toBe('Radom');
    expect(sample.condition).toBe('Sunny');
  });

  it('formats report in readable form', () => {
    const report = formatWeatherReport({
      city: 'Kraków',
      temperatureC: 16,
      humidity: 70,
      condition: 'Light rain'
    });

    expect(report).toContain('Pogoda dla: Kraków');
    expect(report).toContain('Temperatura: 16°C');
  });
});
