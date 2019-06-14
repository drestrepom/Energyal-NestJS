/**
 * Representar un documento de la base de datos
 */
export interface IDocument {
  /** id asignada por mongo */
  _id?: string;
  /** Estado del registro dentro de la base de datos */
  status?: boolean;
}
