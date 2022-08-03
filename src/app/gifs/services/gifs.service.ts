import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apikey: string = '9hbgLhq7Z1qVW79cWpnlCegmGX3gY5rh';
  
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

    constructor ( private http: HttpClient ){

     this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
     this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    } 
     buscarGifs( query: string = ''){


    query = query.trim().toLowerCase();

    if( !this._historial.includes( query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = new HttpParams()
          .set('api_key', this.apikey)
          .set('limit', '10')
          .set( 'q', query);

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=9hbgLhq7Z1qVW79cWpnlCegmGX3gY5rh&q=${query}&limit=10`)
        .subscribe( ( resp) => {
          console.log(resp);
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));

        });
     
  }
}
