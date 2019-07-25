import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CrudService {

    private API_KEY = '91d1db26963257686d610caa3a4df6f3';

    // baseURL = environment.baseURL;
    private header = new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
    });

    constructor(private http: HttpClient) { }

    getWeather(cityName: string, date?: number) {
        return this.http
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&type=hour&start=${date}&appid=${this.API_KEY}`);
    }

}
