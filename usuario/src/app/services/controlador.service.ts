import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { GLOBAL } from '../services/global';
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { JwtHelperService } from '@auth0/angular-jwt';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CalculadoraService } from '../services/calculadora.service';

import { BehaviorSubject } from 'rxjs';
import { PanelSolarService } from './panel-solar.service';


@Injectable({
  providedIn: 'root'
})
export class ControladorService {
  public url

  // Subjects para datos de salida
  private resultadoControladorSubject = new BehaviorSubject<any>({});
  // Observables de salida
  resultadoControlador$ = this.resultadoControladorSubject.asObservable();

  constructor(
    ///private _calculadoraService: CalculadoraService,
    private _http: HttpClient,
    //private _panelSolarService:PanelSolarService,
  ) {
    this.url = GLOBAL.url;

/*
    this._calculadoraService.potencia$.subscribe((potencia) => {
      this.calcularControlador(potencia);
    });
*/

//Lo apunto a un cambio en el panel entonces se calcula al tiempo y debe esperar a tener los datos del panel
/*this._calculadoraService.calculoPanel$.subscribe((data) => {
  this.calcularControlador(data);
});
*/
/*
this._panelSolarService.resultadoPanel$.subscribe((resultadoPanel) => {
  if (resultadoPanel) {
    this.calcularControlador(resultadoPanel); // Realiza el cálculo solo con datos completos
  }
});

*/
  }
/*
  calcularControlador(data: any) {
    // Implementación de cálculo usando la potencia actualizada
   
    // ...
  }
*/

  calcularControlador(data: any) {
    console.log('Calculando Controlador cuando se calcula panel:', data);
    //Calculamos valores del Para el controlador

    const IGsc = data.paneles_paralelo * data.isc//Intensidad corto Circuito del los paneles
    const minCorrienteControlador = 1.25 * IGsc
    //this.camposRequeridos.minCorrienteControlador = true

    //Determinar tEnsion minima controlador
    const UGoc = data.paneles_serie * data.voc

    const minVoltageControlador = UGoc + (data.tc_of_voc) * (-10 - 25)
    console.log('Voltaje minima controlador', minVoltageControlador)
    //this.camposRequeridos.minVoltageControlador = true

    console.log('serie', data.paneles_serie, 'Paralelo', data.paneles_paralelo)


    const tensionMaxiaGenerador = data.paneles_serie * data.vmpp //vmpp voltaje d emaxima potencia
    const intensidadMaxiaGenerador = data.paneles_paralelo * data.impp

    //Asignacion de valores o valores a emitir
    //this.calculo.resultadoCalculoControlador[0].minVoltageControlador = this.minVoltageControlador
    //this.calculo.resultadoCalculoControlador[0].minCorrienteControlador = this.minCorrienteControlador

      //Descartar si el panel y controlador si son o no compatibles
      if (data.potencia_arreglo_fv >= data.max_potencia_paneles) {
        console.log('La potencia del Arreglo de  paneles es superior a la potencia soportada por el controlador a la tension que desea manejar')
      } else if (minVoltageControlador >= data.Max_pv_voltaje) {
        console.log('El voltaje del Arreglo de paneles  es superior al soportado por el controlador')
      } else if (minCorrienteControlador >= data.amperaje) {
        console.log('El Amperaje del Arreglo de paneles es superior al soportado por el controlador')
      } else {

      }

      let potencia_fotovoltaica = data.numero_paneles * data.potencia //Potencia del panel en uso
      let cantidad_paneles_controlador = potencia_fotovoltaica / data.max_potencia_paneles

      if (cantidad_paneles_controlador < data.numero_paneles) {
        console.log('Es necesario usar varios Contoladores')
      } else {
        console.log('un solo controlador es suficiente')
      }

      //this.controladorDefinido = true
    
console.log('deberia emitir',minVoltageControlador,minCorrienteControlador)
          //Emito los resultados del calculo del Controlador
          this.resultadoControladorSubject.next({
            minVoltageControlador,
            minCorrienteControlador
          });

  }


  listar_controladores(): Observable<any[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get<{ data: any[] }>(this.url + 'listar_controladores', { headers: headers }).pipe(
      map(response => response.data)
    );
  }

}
