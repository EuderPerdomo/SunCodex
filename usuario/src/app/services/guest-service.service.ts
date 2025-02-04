import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from "rxjs";
import { GLOBAL } from '../services/global';


@Injectable({
  providedIn: 'root'
})
export class GuestServiceService {
  public url;

  constructor(
    private _http: HttpClient,
    //private _usuarioService: AdminService,
    private _router:Router,
  ) {
    this.url = GLOBAL.url;
  }

  listar_electrodomesticos_guest(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'listar_electrodomesticos_guest', { headers: headers })
  }


  listar_lamparas_guest(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'listar_lamparas_guest', { headers: headers })
  }

}
