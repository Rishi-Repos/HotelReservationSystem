import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../room/room';

@Injectable({
  providedIn: 'root',
})
export class DataPassService {
  currentRoomSelectionSubject = new BehaviorSubject<Room[]>(
    []
    // new Room(0, 'none', false, false, '', 0, 0.0, false, '')
  );

  currentRoomSelectionObservable = this.currentRoomSelectionSubject.asObservable();

  private numberOfRoomsSubject = new BehaviorSubject<number>(1);
  numberOfRoomsObservable = this.numberOfRoomsSubject.asObservable();

  setNumberOfRooms(count: number) {
    this.numberOfRoomsSubject.next(count);
  }

  constructor() {}

  // this method tells the subject to update to the new state
  // and emit a change notification to its Observable
  setCurrentRoomSelection(newRoom: Room[]) {
    this.currentRoomSelectionSubject.next(newRoom);
  }

  addRoom(room: Room) {
    const current = this.currentRoomSelectionSubject.value;

    if (current.some((selectedRoom) => selectedRoom.id === room.id)) {
      return;
    }

    this.currentRoomSelectionSubject.next([...current, room]);
  }

  removeRoom(roomId: number) {
    const current = this.currentRoomSelectionSubject.value;
    const updated = current.filter((selectedRoom) => selectedRoom.id !== roomId);

    this.currentRoomSelectionSubject.next(updated);
  }

  updateRoom(updatedRoom: Room) {
    const current = this.currentRoomSelectionSubject.value;

    const updated = current.map((room) => (room.id === updatedRoom.id ? updatedRoom : room));

    this.currentRoomSelectionSubject.next(updated);
  }
}
