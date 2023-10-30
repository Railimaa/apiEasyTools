import { Request, Response } from 'express';

class WeatherController {
  async findAll(req: Request, res: Response) {
    try {
      const { city } = req.query;
      const apiKey = 'bdf6f78e81daf1256aa0d38c7d9b71ed';

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`);

      const weatherData = await response.json();

      return res.json(weatherData);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }
}

export default new WeatherController();
