export interface SolarPanel {
    voltage: number;
    current: number;
  }
  
  export interface Group {
    panels: SolarPanel[][];
    totalVoltage?: number; // Propiedad opcional
  totalCurrent?: number; // Propiedad opcional
  }