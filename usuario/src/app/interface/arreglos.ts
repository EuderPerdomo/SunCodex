export interface SolarPanel {
  voltage: number;
  current: number;
}

export interface Group {
  panels: SolarPanel[][];
  totalVoltage?: number; // Propiedad opcional
  totalPower?: number; // Propiedad opcional
  totalPanels?: number;
  totalCurrent?: number; // Propiedad opcional
}