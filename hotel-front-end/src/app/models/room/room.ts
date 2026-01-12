/**
 * This creates the Room datatype. It contains all the information needed for a Room card displayed on the Room Component.
 */

export class Room {
  id: number;
  roomDescriptionId: number;
  deleted: boolean;

  //constructor
  constructor(id: number, roomDescriptionId: number, deleted: boolean) {
    this.id = id;
    this.roomDescriptionId = roomDescriptionId;
    this.deleted = deleted;
  }
}
