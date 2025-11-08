export interface Turno {
  id?: number;
  pacienteId: number;
  sucursalId: number;
  horario: string; // ISO string
}
