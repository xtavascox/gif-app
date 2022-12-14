import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchGifsResponse} from "../interfaces/gifs.interface";

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private readonly apiKey: string = 'MzmMnzdCm4VQHb42R2bwTAVpehYHRVae';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private readonly _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]
  }

  constructor(private readonly http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('ultimaBusqueda')!) || [];
  }

  buscarGifs(query: string) {
    query = query.toLowerCase();
    if (!query) return;

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(resp => {
        this.resultados = resp.data;
        localStorage.setItem('ultimaBusqueda', JSON.stringify(this.resultados));
      });

    if (this._historial.includes(query)) return;
    this._historial.length === 10 && this._historial.pop();
    this._historial.unshift(query);
    localStorage.setItem('historial', JSON.stringify(this._historial));


  }
}
