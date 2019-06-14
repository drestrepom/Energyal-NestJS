import { IDocument } from './IDocument';

/**
 * Clase para representar un documento
 */
export class ElectrodomesticDto implements IDocument {

  /** id asignada por mongo */
  _id: string;

  /** Serial de fabrica */
  serial: string;

  /** Nombre que le da el usuario */
  name: string;

  /** Categoria a la cual pertenece */
  category: string;

  /** Voltage de funcionamiento */
  voltage: string;

  /** Estado el electrodomestico (encendido/ apagado) */
  onOff: boolean;

  /** id del medidor que le ha asignado el usuario */
  meter: string;

  /** Usuarios que tienen acceso al electrodoméstico */
  users: string[];

  /** Estado dentro de la base de datos  */
  status: boolean;

}

/**
 * Roles que puede tener un usuario sobre un electrodoméstico
 */
enum roles {
  'ADMIN',
  'USER',
}
