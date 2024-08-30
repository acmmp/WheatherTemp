import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  error: string = '';

  constructor(private weatherService: WeatherService) { }

  getWeather() {
    if (!this.city) {
      this.error = 'Please enter a city name';
      return;
    }
    this.error = '';
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log('Weather data:', this.weatherData);
      },
      error: (error) => {
        console.error('Error details:', error);
        if (error.status === 404) {
          this.error = 'Ciudad no encontrada. Por favor, verifica el nombre e intenta de nuevo.';
        } else if (error.status === 401) {
          this.error = 'Error de autenticación. Verifica tu API key.';
        } else {
          this.error = `Error al obtener el clima: ${error.message}`;
        }
      }
    });
  }
}
