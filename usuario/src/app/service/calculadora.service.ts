import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { PanelSolarService } from '../services/panel-solar.service';
import { ControladorService } from '../services/controlador.service';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  public url=''
  public calculo = {

    //Del cliente
    usuario: '',
    latitud: 0,
    longitud: 0,
    autoriza_correccion: false,
    descripcion: '',
    tipo: 'potencias',
    nombre: '',//Nombre que se le quiere dar al calculo
    panel: '',
    inversor: '',
    bateria: '',
    controlador: '',
    simultaneo: 0,
    total_dia: 0,
    tension_sistema: 0,

    filtro: '',
    radio_busqueda: 0,
    //Potencias
    potencias: [{ nombre: '1', potencia: 0, horas_uso_dia: 0, consumo: 0 },
    { nombre: 'televis', potencia: 0, horas_uso_dia: 0, consumo: 0 }],

    //Del Controlador

    resultadoCalculoControlador: [{
      controlador_tension: 24,
      controlador_max_input_power: 360,
      controlador_max_pv_input_voltaje: 55,
      controlador_cantidad_paralelo: 3,
      minVoltageControlador: 0,
      minCorrienteControlador: 0,
    }],

    //DeL panel Solar
    resultadoCalculoPanel: [{
      potencia_arreglo_fv: 0,
      cantidad_paneles: 0,
      paneles_serie: 0,
      paneles_paralelo: 0,
      voltaje_array_fv: 0,
      amperaje_array_fv: 0,

    }],



    //De Las baterias
    resultadoCalculoBateria: [{
      baterias_serie: 1,
      baterias_paralelo: 1,
      total_baterias: 1,
      batterysize: 1,
      cuttoff: 1
    }],

    //Del inversor
    resultadoCalculoInversor: [{
      voltaje_in_inversor: 1,
      voltaje_out_inversor: 1,
      potencia_inversor: 1,
      potencia_pico_inversor: 1
    }]
    //
  }


  private calculoFinalSource = new BehaviorSubject<any>({});
  calculoFinal$ = this.calculoFinalSource.asObservable();


  constructor(
    private _http:HttpClient,
    private _router:Router,
   // private _panelSolarService:PanelSolarService,
   /// private _controladorService:ControladorService,
  ) { 
    this.url=GLOBAL.url

 /*
    combineLatest([
      this._panelSolarService.resultadoPanel$,
      this._controladorService.resultadoControlador$
    ]).subscribe(([resultadoPanel, resultadoControlador]) => {
      const datosCompletos = {
        panel: resultadoPanel,
        controlador: resultadoControlador
      };
      console.log('Datoscompletos',datosCompletos)
      this.calculoFinalSource.next(datosCompletos);
     
    });
*/
  }
  /**Inician pruebas de Centralizacion */
  
  private potenciaSource = new BehaviorSubject<number>(0);
  potencia$ = this.potenciaSource.asObservable();

/*
  private panelesSource = new BehaviorSubject<any>(null);
  paneles$ = this.panelesSource.asObservable();
  actualizarPotencia(nuevaPotencia: number) {
    this.potenciaSource.next(nuevaPotencia);
  }
*/
  //LLamado cuando se cambian los valores del Panel
 /*
  private calcularPanelSource = new BehaviorSubject<any>(null);
  calculoPanel$ = this.calcularPanelSource.asObservable();

  calcularPanel(data: any) {
    console.log('calculo paneñ')
    this._panelSolarService.calcularPaneles(data)
    //this.calcularPanelSource.next(data);
  }
  */
/*
  actualizarPaneles(nuevosPaneles: any) {
    this.panelesSource.next(nuevosPaneles);
  }
  */

/** Finalizan pruebas centralizacion */

////////////////////////////////////////Inicia nueva forma
private resultadoPanelSubject = new BehaviorSubject<any>(null);
resultadoPanel$ = this.resultadoPanelSubject.asObservable();

private resultadoControladorSubject = new BehaviorSubject<any>(null);
resultadoControlador$ = this.resultadoControladorSubject.asObservable();

private resultadoBateriaSubject = new BehaviorSubject<any>(null);
resultadoBateria$ = this.resultadoBateriaSubject.asObservable();

private resultadoInversorSubject = new BehaviorSubject<any>(null);
resultadoInversor$ = this.resultadoInversorSubject.asObservable();

// Métodos para actualizar cada resultado y emitir cambios
actualizarResultadoPanel(panelData: any) {
  this.calculo.resultadoCalculoPanel[0] = panelData;
  this.resultadoPanelSubject.next(panelData);
}

actualizarResultadoControlador(controladorData: any) {
  this.calculo.resultadoCalculoControlador[0] = controladorData;
  this.resultadoControladorSubject.next(controladorData);
}

private calculoSubject = new BehaviorSubject<any>(this.calculo);
  calculo$ = this.calculoSubject.asObservable();

actualizarCalculo(parte: string, valor: any) {
  this.calculo.panel = valor;
  console.log('actualizar valores panel',parte,valor,'ahora',this.calculo)
  this.calculoSubject.next(this.calculo);
}


setTensionSistema(tension: any) {
  this.calculo.tension_sistema = tension;
  //this.resultadoPanelSubject.next(tension);
}

setPanelResult(result: any) {
  this.calculo.resultadoCalculoPanel = result;
  console.log('calculoactualizado Panel,',result,this.calculo)
  this.resultadoPanelSubject.next(result);
}

setPanelId(id_Panel: any) {
  this.calculo.panel = id_Panel;
}


setBateriaResult(result: any) {
  this.calculo.resultadoCalculoBateria = result;
  console.log('calculo actualizado Bateria,',result,this.calculo)
  this.resultadoBateriaSubject.next(result);
}

setBateriaId(id_Bateria: any) {
  this.calculo.bateria = id_Bateria;
}

setControladorResult(result: any) {
  this.calculo.resultadoCalculoControlador = result;
  console.log('calculo actualizado Controlador,',result,this.calculo)
  this.resultadoControladorSubject.next(result);
}

setControladorId(id_Controlador: any) {
  this.calculo.controlador = id_Controlador;
}

setInversorResult(result: any) {
  this.calculo.resultadoCalculoInversor = result;
  console.log('calculo actualizado Inversor,',result,this.calculo)
  this.resultadoInversorSubject.next(result);
}

setInversorId(id_Inversor: any) {
  this.calculo.inversor = id_Inversor;
}

obtenerCalculo() {
  return this.calculo;
}

getPanelResult() {
  return this.calculo.resultadoCalculoPanel;
}

////////////////////////////////////////Finaliz anueva forma



  consulta_rendimiento_Pvgis(lat:any,lon:any,peakpower:any,atterysize:any,consumptionday:any,cutoff:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
   return this._http.get(this.url+'consulta_rendimiento_Pvgis/'+lat+'/'+lon+'/'+peakpower+'/'+atterysize+'/'+consumptionday+'/'+cutoff,{headers:headers});
  }

   //Consultar radiaicon diaria
   consultar_radiacion_diaria(lat: any, lon: any, angle: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'consultar_radiacion_diaria/' + lat + '/' + lon + '/' + angle, { headers: headers })
  }

  consultar_radiacion_diaria_plano_Horizontal(lat: any, lon: any, angle: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'consultar_radiacion_diaria_plano_Horizontal/' + lat + '/' + lon + '/' + angle, { headers: headers })
  }


  //referente a Guardado y consulta de Calculo
  registro_calculo_usuario(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
   // return this._http.post(this.url + 'registro_calculo_usuario', data, { headers: headers });

    if (this.isAuthenticate(['usuario_final', 'empresa', 'instalador'])) {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
      return this._http.post(this.url + 'registro_calculo_usuario', data, { headers: headers });
    }
    else {
      //El usuario no esta Autenticado GUardo en memoria 
      localStorage.setItem('calculo', JSON.stringify(data));
      
      console.log('Usuario no autenticado')
      // Redirigir al usuario a la página de registro
      this._router.navigate(['/login']);
      return of(false);
    }


  }


  public isAuthenticate(allowedroles: string[]): boolean {
    const token = String(localStorage.getItem('token') || '');
    if (!token) {
      return false
    }
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);
      if (helper.isTokenExpired(token)) {
        localStorage.clear()
        return false
      }
  
      if (!decodedToken) {
        localStorage.removeItem('token')
        return false
      }
  
    } catch (error) {
      localStorage.removeItem('token')
      return false
    }
    //En este punto el token existe y es valido, se verifican los permisos
    if(allowedroles.includes(decodedToken['role'])){
      return true
    }else{
      return false //retornar identificador de permiso invalido
    }
  
  }


}

