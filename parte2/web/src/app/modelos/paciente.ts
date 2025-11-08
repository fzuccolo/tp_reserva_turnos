export interface Paciente {
    id?: number;
    nombres: string;
    apellidos: string;
    dni: string;
    fechaDeNacimiento: string;
    obraSocialId?: number;
    sexo?: 'M' | 'F' | 'X';
    credencial?: string;
    esUsuario?: boolean;
}