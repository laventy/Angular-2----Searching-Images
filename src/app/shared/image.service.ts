import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageService {
  private query: string;

  private API_KEY: string = environment.PIXABAY_API_KEY;
  private API_URL: string = environment.PIXABAY_API_URL;

  private URL = `${this.API_URL}${this.API_KEY}&q=`;

  constructor(private _http: Http) { }

  getImage(query, page=1, perPage=20) {
    //console.log(this.URL + query + this.perPage + `&page=${ page }`);
    return this._http.get(this.URL + query + `&per_page=${ perPage }` + `&page=${ page }`).map(res => res.json());
  }

}
