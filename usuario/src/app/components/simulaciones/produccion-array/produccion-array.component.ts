import { Component, Input, Output,EventEmitter, SimpleChanges, OnChanges, AfterViewInit} from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-produccion-array',
  standalone: true,
  imports: [],
  templateUrl: './produccion-array.component.html',
  styleUrl: './produccion-array.component.css'
})
export class ProduccionArrayComponent implements OnChanges, AfterViewInit {

  public ChartProduccionMensual: any

//Definamos que entradas requerimos para mostar la produccion
//Radiacion en el plano horizontal para la ubicacions seleccionada
//Datos tecnicos del panel Solar
//Configuración del Array fotovoltaico

  //Entradas Necesarias desde el componente padre
  @Input() dataRadiacion: any = {}; // 
  @Input() fichaTecnicaPanel: any = {}
  @Input() configuracionArray: any = {};


//Definamos que salidas me dara este componente
//Produccion del array footovoltaico configurado para cada uno de los meses.
@Output() CambioProduccion = new EventEmitter<any>();//Emitir cuando se cambien los datos


ngAfterViewInit(): void {
    var canvas = <HTMLCanvasElement>document.getElementById('ChartPrueba')
    var ctx = canvas.getContext('2d')!

    this.ChartProduccionMensual = new Chart(ctx, {
      //type: 'bar',
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],// hora de cada mes   horas_total.slice(0, 23)
        datasets: [

          {
            type: 'line',
            label: 'Max_potencia Generada Array',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //irradiacion para ese mes  Potencia_t_total.slice(0, 23)
          },

          {
            type: 'line',
            label: 'Max_Voltaje Soportado Controlador',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //irradiacion para ese mes  Potencia_t_total.slice(0, 23)
          },

          {
            type: 'line',
            label: 'Max_Iintensidad soportada Controlador',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //irradiacion para ese mes  Potencia_t_total.slice(0, 23)
          },

          {
            type: 'bar',
            label: 'Potencia_Generada PV',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //irradiacion para ese mes  Potencia_t_total.slice(0, 23)
          },

          {
            type: 'bar',
            label: 'Voltaje_Generado PV',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //irradiacion para ese mes  Potencia_t_total.slice(0, 23)
          },

          {
            type: 'bar',
            label: 'Intensidad Generada PV',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //irradiacion para ese mes  Potencia_t_total.slice(0, 23)  
          }


        ]
      },

      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },


        plugins: {
          title: {
            display: true,
            text: 'Controlador VS array Fv',
            color: 'navy',
            position: 'bottom',
            align: 'center',
            font: {
              weight: 'bold'
            },
            padding: 2,
            fullSize: true,
          }
        }

      }

    });
  
}


  ngOnChanges(changes: SimpleChanges) {
    console.log('cambio detectado', changes)

    if (changes['fichaTecnicaPanel'] && !changes['fichaTecnicaPanel'].firstChange) {
      console.log('Cambio el panel Seleccionado hijo llamado produccion',this.fichaTecnicaPanel,'Configuracion ARRay',this.configuracionArray)
      //Tomamos los valores de la radiacion y los valores del Panel Solar y retornamos los datos de Produccion

         //Datos para el grafico
    var label = []
    var sumas = []
    var temperaturas = []

    //Extraccion de los datos para un mes en especifico
    var mes_selecionado = '9'
    //Produccion deacuerdo a temperatura
    var Tcell = []
    var voc_t = []
    var isc_t = []
    var Potencia_t = [] //Potencia total producida en cada Hora

    
      for (let clave of this.dataRadiacion) {
        if (clave.mes == parseInt(mes_selecionado)) {
      
          //console.log('Mes seeleccionado igual a mes', mes_selecionado,clave.irradiacion_plano_horizontal*clave.K*FI,clave.irradiacion_plano_horizontal,clave.K,FI)
          label.push(clave.hora)
          sumas.push(clave.irradiacion_plano_horizontal * clave.k )//Añadir aqui * FI
          temperaturas.push(clave.temperatura)
          //Calculamos los valores de produccion
          let temperatura_celula = clave.temperatura + (this.fichaTecnicaPanel.noct - 20) * clave.irradiacion_plano_horizontal * clave.K/ 800 //let temperatura_celula = clave.temperatura + (this.fichaTecnicaPanel.noct - 20) * clave.irradiacion_plano_horizontal * clave.K *FI/ 800 
          //console.log('Temperaturas de a celula',temperatura_celula)
          Tcell.push(temperatura_celula)
          let produce_v = (this.fichaTecnicaPanel.voc * (1 + (this.fichaTecnicaPanel.tc_of_voc / 100) * (temperatura_celula - 25))) * 1 //this.paneles_serie aqui son los paneles en serie, se deja por default en uno para pruebas
          voc_t.push(produce_v)
          let produce_i = (this.fichaTecnicaPanel.isc * (1 + (this.fichaTecnicaPanel.tc_of_isc / 100) * (temperatura_celula - 25)) * clave.irradiacion_plano_horizontal * clave.K / 1000) * 1 //produce_i = (this.fichaTecnicaPanel.isc * (1 + (this.fichaTecnicaPanel.coef_isc_temp / 100) * (temperatura_celula - 25)) * clave.irradiacion_plano_horizontal * clave.K * FI / 1000) * 1
          isc_t.push(produce_i)//Tomando en cuenta Una irradiancia especifica
          let produce = (this.fichaTecnicaPanel.potencia * (1 + (this.fichaTecnicaPanel.tc_of_pmax / 100) * (temperatura_celula - 25)) * (clave.irradiacion_plano_horizontal * clave.K / 1000)) * this.configuracionArray.cantidadPaneles
          //  let produce = (this.fichaTecnicaPanel.potencia * (1 + (this.fichaTecnicaPanel.coef_pmax_temp / 100) * (temperatura_celula - 25)) * (clave.irradiacion_plano_horizontal * clave.K * FI / 1000))
          if (produce < 0) {
            produce = 0
          }
          Potencia_t.push(produce)
        }
      }

      this.ChartProduccionMensual.data.datasets[0].data = Potencia_t //Energia almacenada porque potencia FV fue mayor a consumos
      this.ChartProduccionMensual.update(); //Actualizamos graficos 

      this.CambioProduccion.emit(Potencia_t);
    }
  }


}
