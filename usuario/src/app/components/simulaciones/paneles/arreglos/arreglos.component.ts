import { Component, Input, OnInit, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FooterComponent } from "../../../footer/footer.component";
import { NavComponent } from '../../../nav/nav.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolarPanel } from '../../../../interface/arreglos';
import { Group } from '../../../../interface/arreglos';
import { PanelSolarService } from '../../../../services/panel-solar.service';

declare var iziToast: any
declare var $: any

@Component({
  selector: 'app-arreglos',
  standalone: true,
  imports: [FooterComponent, NavComponent, FormsModule, CommonModule],
  templateUrl: './arreglos.component.html',
  styleUrl: './arreglos.component.css'
})
export class ArreglosComponent implements OnInit, OnChanges {

  //Entradas Necesarias desde el componente padre
  @Input() tipoDeConexion: string = ''; // 
  @Input() cantidadPaneles: number = 12;
  @Input() valorPanel: number = 0; // 
  @Input() datosPanel: any = {} // En cada cambio debe recalcular el array

  //public paneles_bd: Array<any> = []

  @Output() voltajeArrayChange = new EventEmitter<number>();
  @Output() amperajeArrayChange = new EventEmitter<number>();
  @Output() potenciaArrayChange = new EventEmitter<number>();
  @Output() cantidadPanelesArrayChange = new EventEmitter<number>();

  @Output() ArrayChange = new EventEmitter<any>();
  voltajeSalidaArray = 0;
  potenciaSalidaArray = 0
  corrienteSalidaArray = 0
  cantidadPanelesArray = 0

  constructor(
    //private _panelSolarService: PanelSolarService,
  ) {

  }

  /*
    ngOnChanges(changes: SimpleChanges) {
      // Verifica si la propiedad 'datosPanel' ha cambiado
      
      if (changes['datosPanel']) {
        const nuevosDatos = changes['datosPanel'].currentValue; // Obtiene los nuevos datos
  console.log('Han cambiado los valores del panel')
  this.calculateGroupTotals(1)
      }
      else{
        console.log('No cambio')
      }
    }
    */



  ngOnChanges(changes: SimpleChanges) {
    console.log('cambio detectado', changes)

    if (changes['datosPanel'] && !changes['datosPanel'].firstChange) {
      //Asignamos los valores recibidos del panel al grupo porque es donde estan guardados los valores
      this.groups.forEach(group => {
        group.panels.forEach(row => {
          row.forEach(panel => {
            panel.voltage = this.datosPanel.voc; // ⚡ Actualizar voltaje
            panel.current = this.datosPanel.impp; // 🔋 Actualizar corriente
          });
        });

        this.recalcularValores(group);
      });

      this.emitirCambioArray();

      console.log('Grupo actual', this.groups)

      console.log('🔄 Se ha seleccionado un nuevo panel:', this.datosPanel);
      //this.calculateGroupTotals(0); // Llamar la función para actualizar los Valores del Array
    }
  }


  recalcularValores(group: Group) {
    // Cantidad de paneles en serie = Número de columnas en la primera fila (asumiendo que todas las filas son iguales)
    const panelesEnSerie = group.panels[0]?.length || 0;

    // Cantidad de filas = paneles en paralelo
    const panelesEnParalelo = group.panels.length;

    // Se suman los voltajes de los paneles en serie
    group.totalVoltage = panelesEnSerie * this.datosPanel.voc;

    //  Se suman las corrientes de los paneles en paralelo
    group.totalCurrent = panelesEnParalelo * this.datosPanel.isc;

    //  Total de paneles
    group.totalPanels = panelesEnSerie * panelesEnParalelo;

    // ⚡🔋 Potencia total = Voltaje total * Corriente total
    group.totalPower = group.totalPanels * this.datosPanel.potencia;
  }

  emitirCambioArray() {
    /*
        const nuevosValores={
          voltaje:this.voltajeSalidaArray,
          corriente:this.corrienteSalidaArray,
          potencia:this.potenciaSalidaArray,
          cantidadPaneles:this.cantidadPanelesArray,
        
        }
        this.ArrayChange.emit(nuevosValores)
    */
    /*
        const nuevosValores = {
          grupos: this.groups.map(group => ({
            totalVoltage: group.totalVoltage,
            totalCurrent: group.totalCurrent,
            totalPower: group.totalPower,
            totalPanels: group.totalPanels,
          }))
        };
    */
    const nuevosValores = {
      grupos: this.groups.map(group => ({
        voltaje: group.totalVoltage,
        corriente: group.totalCurrent,
        potencia: group.totalPower,
        cantidadPaneles: group.totalPanels,
      }))
    };

    console.log('Nuevos valores del array.', nuevosValores)
    this.ArrayChange.emit(nuevosValores);
  }

  ngOnInit(): void {
    //this.listar_paneles()
  }

  /*
    listar_paneles() {
  
      this._panelSolarService.listar_paneles().subscribe({
        next: (response) => {
          this.paneles_bd = response; // Aquí 'response' es el array de paneles
          if (this.paneles_bd.length == 0 || this.paneles_bd == undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: "No se encontraron Paneles Solares",
              displayMode: 1
            });
          }
          else {
            iziToast.show({
              title: 'OK',
              titleColor: '#00ff00',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: "Paneles Encontrados",
              displayMode: 1
            });
          }
        },
        error: (error) => {
          console.error("Error al listar paneles:", error);
        },
        complete: () => {
          console.log("Suscripción completada");
        }
      });
    }
  */
  public mipanel = {
    voc: 45,
    imp: 12,
    //parametros de seguridad
    vmp: 48,
    isc: 13
  }


  /*
  //Inicia Simular arreglos Panel*******************************************************
  
  groups: any[] = [];
  totalVoltage = 0;
  totalCurrent = 0;
  
  // Crear un nuevo grupo
  addGroup() {
    this.groups.push([[{ voltage: this.mipanel.voltaje, current: this.mipanel.corriente }]]);
    this.calculateTotals();
  }
  
  // Agregar panel en serie
  addPanelInSeries(groupIndex: number) {
    this.groups[groupIndex].forEach((row: any) => {
      row.push({ voltage: this.mipanel.voltaje, current: this.mipanel.corriente });
    });
    console.log('Grupos',this.groups)
    this.calculateTotals();
  }
  
  // Agregar panel en paralelo
  addPanelInParallel(groupIndex: number) {
    const newRow = this.groups[groupIndex][0].map(() => ({
      voltage: this.mipanel.voltaje,
      current: this.mipanel.corriente
    }));
    this.groups[groupIndex].push(newRow);
    console.log('Grupos',this.groups)
    this.calculateTotals();
  }
  
  // Editar panel
  editPanel(groupIndex: number, row: any, panel: any) {
    const voltage = prompt('Ingrese el voltaje del panel:', panel.voltage) || '0';
    const current = prompt('Ingrese la corriente del panel:', panel.current) || '0';
    panel.voltage = parseFloat(voltage);
    panel.current = parseFloat(current);
    this.calculateTotals();
  }
  
  // Eliminar grupo
  removeGroup(groupIndex: number) {
    this.groups.splice(groupIndex, 1);
    this.calculateTotals();
  }
  
  // Calcular totales
  calculateTotals() {
    this.totalVoltage = 0;
    this.totalCurrent = 0;
  
    this.groups.forEach((group) => {
      let groupVoltage = 0;
      let groupCurrent = 0;
  
      group.forEach((row: any) => {
        let rowVoltage = 0;
        row.forEach((panel: any) => {
          rowVoltage += panel.voltage;
        });
        groupVoltage = Math.max(groupVoltage, rowVoltage); // Voltaje total es el máximo de columnas
      });
  
      groupCurrent = group.length * group[0][0].current; // Corriente total es el número de filas * corriente de una celda
      this.totalVoltage += groupVoltage;
      this.totalCurrent += groupCurrent;
    });
  }
  //Finaliza Simular Arreglos Panel ********************************************************
  */

  groups: Group[] = [];
  totalVoltage: number = 0;
  totalCurrent: number = 0;
  totalPower: number = 0; // Potencia total instalada
  totalPanels: number = 0; // Total de paneles en todos los grupos

  public pruebaViechild = 0

  isSingleColumn(panels: any[][]): boolean {
    return panels.every(row => row.length === 1);
  }

  // Crear un nuevo grupo vacío
  addGroup() {
    this.groups.push({ panels: [[]] });
    console.log(this.groups)
    this.calculateTotals();
  }

  // Eliminar un grupo completo
  removeGroup(index: number) {
    this.groups.splice(index, 1);
    this.calculateTotals();
  }

  // Agregar un panel en serie dentro de un grupo

  addPanelInSeries(groupIndex: number) {
    console.log('Cantidad de paneles', this.cantidadPaneles)
    const group = this.groups[groupIndex];
    console.log('GrupoPaneles', group.panels)



    // Número de filas y columnas
    const totalFilas = group.panels.length;
    const totalColumnas = Math.max(...group.panels.map(row => row.length), 0);
    const panelesPorFila = group.panels.map(row => row.length);


    console.log('Total filas', totalFilas, 'Columnas', totalColumnas, 'Paneles Por Fila', panelesPorFila)

    if (group.panels[0].length >= 12) {
      iziToast.show({
        title: '⚠️ ALERTA ⚠️',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: "⚡ El sistema solo permite un máximo de 12 paneles en serie. 🔋"
      });
    } else {

      group.panels.forEach((row: any) => {
        row.push({ voltage: this.datosPanel.voc, current: this.datosPanel.impp });
      });
      console.log('Grupos', this.groups)
      //this.calculateTotals();

    }

    this.calculateGroupTotals(groupIndex);
  }

  // Agregar un panel en paralelo (nueva fila)
  addPanelInParallel(groupIndex: number) {
    const group = this.groups[groupIndex];
    console.log('indice de grupo', groupIndex, group.panels[0])

    if (group.panels[0].length === 0) {
      group.panels.forEach((row: any) => {
        row.push({ voltage: this.datosPanel.voc, current: this.datosPanel.impp });
      });
    } else {
      const newRow = group.panels[0].map(() => ({
        voltage: this.datosPanel.voc,
        current: this.datosPanel.impp
      }));

      group.panels.push(newRow);
    }
    //group.panels.push([{ voltage: 24, current: 10 }]); // Panel de ejemplo
    this.calculateGroupTotals(groupIndex);
  }


  // Eliminar un panel de un grupo
  removePanel(groupIndex: number, rowIndex: number, panelIndex: number) {
    const group = this.groups[groupIndex];
    group.panels[rowIndex].splice(panelIndex, 1);

    // Si la fila queda vacía, la eliminamos
    if (group.panels[rowIndex].length === 0) {
      group.panels.splice(rowIndex, 1);
    }
    if (group.panels.length === 0) {
      console.log('Grupo queda vacio')
      this.groups[groupIndex] = { panels: [[]] };

    }

    /*
    const group = this.groups[groupIndex];
        group.panels.splice(rowIndex, 1);
         if(group.panels.length===0){
          console.log('Grupo queda vacio')
          this.groups[groupIndex] = { panels: [[]] };
         }*/
    this.calculateGroupTotals(groupIndex);
  }


  removerFila(groupIndex: number, rowIndex: number) {

    const group = this.groups[groupIndex];
    group.panels.splice(rowIndex, 1);
    if (group.panels.length === 0) {
      console.log('Grupo queda vacio')
      this.groups[groupIndex] = { panels: [[]] };
    }
    this.calculateGroupTotals(groupIndex);
  }
  /*
  // Calcular el voltaje y corriente de un grupo
  calculateGroupTotals(groupIndex: number) {
    const group = this.groups[groupIndex];
    let voltage = 0;
    let maxCurrent = 0;
    let powerArray=0
  
    group.panels.forEach((row) => {
      if (row.length > 0) {
        // Suma voltajes en serie
        voltage = row.reduce((sum, panel) => sum + panel.voltage, 0);
  
        // Calcula la corriente total en paralelo (corriente máxima por fila)
        const rowCurrent = row[0].current; // Corriente es igual en serie
        maxCurrent += rowCurrent;
      }
    });
  console.log('grrupo:',groupIndex,'Voltaje',voltage,'Corriente',maxCurrent)
  group['totalPower'] = voltage;  
  group['totalVoltage'] = voltage;
    group['totalCurrent'] = maxCurrent;
  
    //Prueba output hacia el padre
    this.pruebaViewChild = voltage;
      this.pruebaViewChildChange.emit(this.pruebaViewChild); // Notificar al padre
   //Fin output hacia el padre
  
  
    this.calculateTotals();
  }
  
  // Calcular los totales globales
  calculateTotals() {
    this.totalVoltage = 0;
    this.totalCurrent = 0;
    this.groups.forEach((group) => {
      if (group['totalVoltage'] && group['totalCurrent']) {
        this.totalVoltage += group['totalVoltage'];
        this.totalCurrent += group['totalCurrent'];
      }
    });
    
  }
  
  */


  // Calcular el voltaje, corriente y potencia de un grupo
  calculateGroupTotals(groupIndex: number) {
    const group = this.groups[groupIndex];
    let voltage = 0;
    let maxCurrent = 0;
    let totalPanels = 0;
    let powerArray = 0; // Potencia total del grupo

    group.panels.forEach((row) => {
      if (row.length > 0) {
        // Suma voltajes en serie
        voltage = row.reduce((sum, panel) => sum + panel.voltage, 0);

        // Calcula la corriente total en paralelo (corriente máxima por fila)
        const rowCurrent = row[0].current; // La corriente es igual en serie
        maxCurrent += rowCurrent;

        // Contar la cantidad de paneles en el grupo
        totalPanels += row.length;

        // Calcular potencia individual y sumarla
        //powerArray += voltage * rowCurrent;
      }
    });

    powerArray = totalPanels * this.datosPanel.potencia
    // Asignar los valores al grupo
    group['totalPower'] = powerArray;
    group['totalVoltage'] = voltage;
    group['totalCurrent'] = maxCurrent;
    group['totalPanels'] = totalPanels; // Guardar el total de paneles del grupo

    console.log(
      `Grupo: ${groupIndex} - Paneles: ${totalPanels} - Voltaje: ${voltage}V - Corriente: ${maxCurrent}A - Potencia: ${powerArray}W`
    );

    // Notificar al padre Voltaje
    this.voltajeSalidaArray = voltage;
    //this.voltajeArrayChange.emit(this.voltajeSalidaArray); //Aqui emito el valor del nuevo voltaje

    // Notificar al padre Amperaje
    this.corrienteSalidaArray = maxCurrent;
    // this.amperajeArrayChange.emit(this.corrienteSalidaArray); //Aqui emito el valor del nuevo Amperaje

    // Notificar al padre Potencia
    this.potenciaSalidaArray = powerArray;
    //this.potenciaArrayChange.emit(this.potenciaSalidaArray); //Aqui emito el valor del nuevo Potencia


    // Notificar al padre Cantidad de PANELES
    this.cantidadPanelesArray = totalPanels;
    // this.cantidadPanelesArrayChange.emit(this.cantidadPanelesArray); //Aqui emito el valor del nuevo Potencia
    // Recalcular los totales generales
    this.calculateTotals();
  }

  // Calcular los totales globales
  calculateTotals() {
    this.totalVoltage = 0;
    this.totalCurrent = 0;
    this.totalPower = 0; // Potencia total instalada
    this.totalPanels = 0; // Total de paneles en todos los grupos

    this.groups.forEach((group) => {
      if (group['totalVoltage'] && group['totalCurrent'] && group['totalPower'] && group['totalPanels']) {
        this.totalVoltage += group['totalVoltage'];
        this.totalCurrent += group['totalCurrent'];
        //this.totalPower += group['totalPower']; // Sumar la potencia de cada grupo
        this.totalPanels += group['totalPanels']; // Contar los paneles en todos los grupos
      }
    });

    this.totalPower = this.totalPanels * this.datosPanel.potencia
    console.log(
      `Total Global - Paneles: ${this.totalPanels} - Voltaje: ${this.totalVoltage}V - Corriente: ${this.totalCurrent}A - Potencia: ${this.totalPower}W`
    );

    //Aqui esta dado como si fuese el primer array o en dado caso tomaria el ultimo array
    const nuevosValores = {
      voltaje: this.voltajeSalidaArray,
      corriente: this.corrienteSalidaArray,
      potencia: this.potenciaSalidaArray,
      cantidadPaneles: this.cantidadPanelesArray,

    }
    this.ArrayChange.emit(nuevosValores)

  }




}
