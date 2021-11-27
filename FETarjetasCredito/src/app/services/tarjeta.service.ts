import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private myAppUrl = 'https://localhost:44364/'
  private myApi = 'api/TarjetaCredito/'

  constructor(private http: HttpClient) { }

  getListTarjetas(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApi);
  }

  deleteTarjeta(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApi + id);
  }

  saveTarjeta(tarjeta: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApi, tarjeta);

  }
  updateTarjeta(id: number, tarjeta: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApi + id, tarjeta);
  }
}
