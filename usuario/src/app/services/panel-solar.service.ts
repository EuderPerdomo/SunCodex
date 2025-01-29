import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from "rxjs";
import { GLOBAL } from '../service/global';
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { JwtHelperService } from '@auth0/angular-jwt';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { CalculadoraService } from '../service/calculadora.service'; //Importacion de calculadora
import { ControladorService } from './controlador.service';


declare var iziToast: any

@Injectable({
  providedIn: 'root'
})
export class PanelSolarService {
  public url

  public panel_seleccionado = {
    voc: 0, //Voltaje En cicuito Abierto
    isc: 0, //Intensidad en corto circuito
    impp: 0, //Intensidad en maxima potencia
    vmpp: 0, //Voltaje en maxima potencia
    eficiencia: 0,//Eficiencia
    potencia: 0,//Potencia del Panel
    tc_of_pmax: 0, //Coeficiente de Potencia-Temperatura
    tc_of_voc: 0,//Coeficiente de Voltage-Temperatura
    tc_of_isc: 0, //Coeficiente de Corriente-Temperatura
    noct: 43, //Temperatura de Operacion Nominal de la Celula
    tension: 0,

    //Parametros adicionales
    max_isc: 0,
    min_isc: 0,
    max_voc: 0,
    min_voc: 0,
  }

  miBehaviorSubject = new BehaviorSubject<string>('hola behavior')

  // Subjects para datos de salida
  private resultadoPanelSubject = new BehaviorSubject<any>({});
  // Observables de salida
  resultadoPanel$ = this.resultadoPanelSubject.asObservable();

  constructor(
    private _calculoService: CalculadoraService, //Instancio calculo
    // private _controladorService: ControladorService,
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
    /*
        this._calculoService.potencia$.subscribe((potencia) => {
          this.calcularPanel(potencia);
        });
    */
    /*
         this._calculoService.calculoPanel$.subscribe((datos) => {
           this.calcularPaneles(datos);
         });
         */

  }
  /*
    calcularNuevosValorespanle(valoresPanel: any) {
      // Implementación de cálculo usando la potencia actualizada
      console.log('Nuevso avalores:', valoresPanel);
      // ...
    }
  
  
  
    calcularPanel(potencia: number) {
      // Implementación de cálculo usando la potencia actualizada
      console.log('Calculando panel con potencia en el servicio de panel:', potencia);
      // ...
    }*/

  /**calcularPaneles:
   * Funcion que calcula el numero de paneles necesarios basado en caracteristicas de un panel especifico asi como
   * hsp y consumo diario
   */
  calcularPaneles(datos: any) {

    const calculoActual = this._calculoService.obtenerCalculo();
    console.log('Ingreso a Calcular Panel con datosobtenidos', calculoActual, 'Con el panel seleccionado', this.panel_seleccionado)
    //Datos de entrada Necesarios: 

    //TensionDefinida True/False
    //PotenciaDefinida True/False
    //hspDefinido True/False
    //total_dia 
    //horas_sol_pico
    //panel_seleccionado.potencia
    //panel_seleccionado.tension
    //panel_seleccionado.vmpp
    //.panel_seleccionado.impp
    //Tension del sistema

    //Resultados Obtenidos:
    //peakPower --> Potencia Resultante del generador fotovoltaico
    //numero_paneles
    //paneles_paralelo
    //paneles_serie

    //Asignacion de valores a arreglo calculo Final

    //potencia_arreglo_fv = PGmax
    //cantidad_paneles = this.numero_paneles,
    //paneles_serie = this.paneles_serie
    //paneles_paralelo = this.paneles_paralelo
    //voltaje_array_fv = this.paneles_serie * this.panel_seleccionado.voc
    //amperaje_array_fv = this.panel_seleccionado.impp * this.paneles_paralelo

    //Asignacion de campos requeridos
    //this.camposRequeridos.potencia_arreglo_fv = true
    //this.camposRequeridos.cantidad_paneles = true
    //this.camposRequeridos.paneles_serie = true
    //this.camposRequeridos.paneles_paralelo = true
    //this.camposRequeridos.voltaje_array_fv = true
    //this.camposRequeridos.amperaje_array_fv = true

    //Calculado de Valores necesarios apra el Controlador

    //const IGsc = this.paneles_paralelo * this.panel_seleccionado.isc//Intensidad corto Circuito del los paneles
    // this.minCorrienteControlador = 1.25 * IGsc
    //this.camposRequeridos.minCorrienteControlador = true
    //const UGoc = this.paneles_serie * this.panel_seleccionado.voc
    //this.minVoltageControlador = UGoc + (this.panel_seleccionado.tc_of_voc) * (-10 - 25)
    //this.camposRequeridos.minVoltageControlador = true
    //this.tensionMaxiaGenerador = this.calculo.resultadoCalculoPanel[0].paneles_serie * this.panel_seleccionado.vmpp //vmpp voltaje d emaxima potencia
    //this.intensidadMaxiaGenerador = this.calculo.resultadoCalculoPanel[0].paneles_paralelo * this.panel_seleccionado.impp
    //this.calculo.resultadoCalculoControlador[0].minVoltageControlador = this.minVoltageControlador
    //this.calculo.resultadoCalculoControlador[0].minCorrienteControlador = this.minCorrienteControlador

    // Verificar si todos los datos están definidos antes de realizar los cálculos

    if (
      calculoActual
    ) {

      //Valores para emitir
      var numero_paneles = 0
      var paneles_paralelo = 0
      var paneles_serie = 0
      var peakpower = 0


      //Iniciamos nuevo calculo de paneles ****************************************************************

      //this.irradiacionGlobalDiaria

      //Formula:
      //Potencia generador = consumo energia diario X irradiancia en condiciones CEM( 1000) / valor medio mensual irradiacion con angulo optimo x PR

      const PotenciaMinimaGenerador = (datos.total_dia * 1000) / (datos.horas_sol_pico * 0.9 * 1000) //Multiplico *1000 porque las horas sol pico estan dadas en KWH
      console.log('Potencia Generador', PotenciaMinimaGenerador, 'W')
      //la maxima potencia del generador no sobrepasara el 20% del valor de PotenciaMinimaGenerador calculado
      const porcentaje = 1.2 * PotenciaMinimaGenerador
      console.log('porcentaje', porcentaje)

      //Calculo numero de modulos
      var numeropaneles = Math.round(PotenciaMinimaGenerador / datos.potencia)
      console.log('Numero de apaneles calculados', numeropaneles, datos.potencia)

      if (numeropaneles < 1) {
        numeropaneles = 1
        console.log('Numero de paneles menor que 1', numeropaneles)
      }
      console.log('Numero de panels', numeropaneles, PotenciaMinimaGenerador / datos.potencia)

      //Potencia resultante del generador
      const PotenciaGenerador = numeropaneles * datos.potencia
      console.log('resultante de potencia generador', PotenciaGenerador)
      peakpower = PotenciaGenerador //Valor de salida


      //Disposicion
      //Tomamos en cuenta como seria la disposicion respecto a como el cliente seleccione el panel
      //Determinamos de acuerdo a seleccion del panel
      const Np = datos.tension_sistema / datos.tension //const Np = this.tension / this.panel_seleccionado.tension //Ns = Numero de Paralelos
      if (Np < 1) {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: "Considere Usar un regulador MPPT, cambie la tension en las baterias o use un panel de menor tension",
          displayMode: 1
        });
        numero_paneles = numeropaneles
        paneles_paralelo = numeropaneles
        paneles_serie = 1
      }

      if (Np == 1) {
        numero_paneles = numeropaneles
        paneles_paralelo = numeropaneles
        paneles_serie = 1

      }

      if (Np > 1) {

        if (Np == 2) {
          const panelestotales = this.redondearAlMultiploSuperior(numeropaneles, 2)

          numero_paneles = panelestotales
          paneles_paralelo = panelestotales / 2
          paneles_serie = 2

        } else { //Deberia ser 4
          const panelestotales = this.redondearAlMultiploSuperior(numeropaneles, 4)

          numero_paneles = panelestotales
          paneles_paralelo = panelestotales / 4
          paneles_serie = 4

        }
      }

      //Verificamos no superar el 20%
      const porcentaje2 = 1.2 * PotenciaMinimaGenerador

      //Potencia resultante del generador
      const PGmax = numero_paneles * datos.potencia


      if (PGmax < 1.2 * PotenciaMinimaGenerador && Np >= 1) {

        iziToast.show({
          title: 'OK',
          titleColor: '#00ff00',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: "la configuración de paneles es Eficiente",
          displayMode: 2,
        });

      } else {

        iziToast.show({
          title: 'ALERTA',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: "Panel Sobredimensionado, Considere configuraciones diferentes para hacer mas optimo el sistema",
          displayMode: 2
        });

      }

      //Emito los resultados del calculo del panel
      /*
            const datos = {
      //del controlador
              max_potencia_paneles: this.controlador_seleccionado.max_potencia_paneles,
              Max_pv_voltaje: this.controlador_seleccionado.Max_pv_voltaje,
              amperaje: this.controlador_seleccionado.amperaje,
              numero_paneles: this.numero_paneles,
              potencia: this.panel_seleccionado.potencia,
        
              //De los paneles
              Potencia_arreglo_fv: this.potencia_arreglo_fv,
              paneles_paralelo: this.paneles_paralelo,
              isc: this.panel_seleccionado.isc,
              voc: this.panel_seleccionado.voc,
              paneles_serie: this.paneles_serie,
              tc_of_voc: this.panel_seleccionado.tc_of_voc,
              vmpp: this.panel_seleccionado.vmpp,
              impp: this.panel_seleccionado.impp
            }*/
      console.log('Ahora emitir')
      const resultadoPanel = {
        peakpower,
        numero_paneles,
        paneles_paralelo,
        paneles_serie,
        PGmax,
      }
      console.log('emito', resultadoPanel)
      this.resultadoPanelSubject.next(resultadoPanel);
      /*
 this.resultadoPanelSubject.next({
   peakpower,
   numero_paneles,
   paneles_paralelo,
   paneles_serie,
   PGmax,
   //voltaje_array_fv,
   //amperaje_array_fv
 });
 */

      this._calculoService.actualizarCalculo('panel', resultadoPanel);


      this._calculoService.actualizarResultadoPanel({
        peakpower,
        numero_paneles,
        paneles_paralelo,
        paneles_serie,
      });

      const data = {

        //controlador_seleccionado.max_potencia_paneles
        //controlador_seleccionado.Max_pv_voltaje
        //controlador_seleccionado.amperaje
        //numero_paneles
        //Panel_seleccionado.potencia
        //controlador_seleccionado.max_potencia_paneles

        //De los paneles
        //Potencia_arreglo_fv
        //paneles_paralelo
        //isc panel
        //voc panel
        //paneles_serie
        //tc_of_voc panel
        //vmpp panel
        //impp panel
      }

      //this._controladorService.calcularControlador_final(data)
      /*
          //Asigno valores a la variable de calculo Final 
          this.calculo.resultadoCalculoPanel[0].potencia_arreglo_fv = PGmax
          this.calculo.resultadoCalculoPanel[0].cantidad_paneles = this.numero_paneles,
            this.calculo.resultadoCalculoPanel[0].paneles_serie = this.paneles_serie
          this.calculo.resultadoCalculoPanel[0].paneles_paralelo = this.paneles_paralelo
          this.calculo.resultadoCalculoPanel[0].voltaje_array_fv = this.paneles_serie * this.panel_seleccionado.voc
          this.calculo.resultadoCalculoPanel[0].amperaje_array_fv = this.panel_seleccionado.impp * this.paneles_paralelo
      
          this.camposRequeridos.potencia_arreglo_fv = true
          this.camposRequeridos.cantidad_paneles = true
          this.camposRequeridos.paneles_serie = true
          this.camposRequeridos.paneles_paralelo = true
          this.camposRequeridos.voltaje_array_fv = true
          this.camposRequeridos.amperaje_array_fv = true
      */
    } else {
      /*
      iziToast.show({
        title: 'Alerta',
        titleColor: '#00ff00',
        color: '#FFF',
        class: 'text-info',
        position: 'topRight',
        message: "Debe definir primero, Tension, HSP, consumoDiario"
      });
      */

    }

  }


  redondearAlMultiploSuperior(numero: any, multiplo: any) {
    return Math.ceil(numero / multiplo) * multiplo;
  }




  //Asignar valor
  setData(data: any) {
    this.miBehaviorSubject.next(data)
  }

  //Recuperar valor
  getData() {
    return this.miBehaviorSubject.asObservable()
  }

  listar_paneles(): Observable<any[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get<{ data: any[] }>(this.url + 'listar_paneles', { headers: headers }).pipe(
      map(response => response.data)
    );
  }


}
