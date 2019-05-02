import { IDocument } from './IDocument';

export class RoomDto implements IDocument {
  _id?: string;
  user?: string;
  name?: string;
}
