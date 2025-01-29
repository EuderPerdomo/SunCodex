import { Component } from '@angular/core';
import { FooterComponent } from "../../../footer/footer.component";
import { NavComponent } from '../../../nav/nav.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolarPanel } from '../../../../interface/arreglos';
import { Group } from '../../../../interface/arreglos';

@Component({
  selector: 'app-arreglos',
  standalone: true,
  imports: [FooterComponent,NavComponent, FormsModule,CommonModule],
  templateUrl: './arreglos.component.html',
  styleUrl: './arreglos.component.css'
})
export class ArreglosComponent {
/*
//Inicia Simular arreglos Panel*******************************************************
public mipanel={
  voltaje:45,
  corriente:12
}
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
  const group = this.groups[groupIndex];
  console.log('GrupoPaneles',group.panels)
  if(group.panels[0].length>=12){
    alert('El sistema Solo permite un maximo de 12 Paneles en serie')
  }else{

    group.panels.forEach((row: any) => {
      row.push({ voltage: 24, current: 10 });
    });
    console.log('Grupos',this.groups)
    //this.calculateTotals();

  }

  this.calculateGroupTotals(groupIndex);
}

// Agregar un panel en paralelo (nueva fila)
addPanelInParallel(groupIndex: number) {
  const group = this.groups[groupIndex];
console.log('indice de grupo',groupIndex,group.panels[0])

if(group.panels[0].length===0){
  group.panels.forEach((row: any) => {
    row.push({ voltage: 24, current: 10 });
  });
}else{
  const newRow = group.panels[0].map(() => ({
    voltage: 24,
    current: 10
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
  if(group.panels.length===0){
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
     if(group.panels.length===0){
      console.log('Grupo queda vacio')
      this.groups[groupIndex] = { panels: [[]] };
     }
  this.calculateGroupTotals(groupIndex);
}

// Calcular el voltaje y corriente de un grupo
calculateGroupTotals(groupIndex: number) {
  const group = this.groups[groupIndex];
  let voltage = 0;
  let maxCurrent = 0;

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
  group['totalVoltage'] = voltage;
  group['totalCurrent'] = maxCurrent;

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

}
