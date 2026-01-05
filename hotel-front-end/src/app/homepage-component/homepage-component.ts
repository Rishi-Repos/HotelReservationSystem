import { Component, signal } from '@angular/core';
import { RoomDescription } from '../models/room-description/room-description';
import { CommonModule } from '@angular/common';
import { HttpService } from '../services/http-service';
import { CurrentSelectionComponent } from '../current-selection-component/current-selection-component';
import { RoomDescriptionComponent } from '../room-description-component/room-description-component';

/**
 * The Homepage component is the first page that guests will see when entering the website. It pulls a list of rooms from
 * the database and renders it via the RoomDescription component.
 * It also displays the current selection of rooms a guest has picked.
 */

@Component({
  selector: 'app-homepage-component',
  standalone: true,
  imports: [CommonModule, RoomDescriptionComponent, CurrentSelectionComponent],
  templateUrl: './homepage-component.html',
  styleUrl: './homepage-component.css',
})
export class HomepageComponent {
  constructor(private httpService: HttpService) {
    this.addRoomToHomepage();
    this.getAvailableRooms();
  }

  rooms = signal<RoomDescription[]>([]);

  getAvailableRooms() {
    const currentDate: Date = new Date();
    this.httpService.getAllAvailableRooms(currentDate).subscribe((data) => {
      console.log(data);
    });
  }

  addRoomToHomepage() {
    this.httpService.getAllRoomDescriptions().subscribe((data) => {
      const mappedRooms =
        data.body?.map(
          (newRoom) =>
            new RoomDescription(
              newRoom.id,
              newRoom.bedStyle,
              newRoom.adaCompliant,
              newRoom.isSmoking,
              newRoom.roomImage,
              newRoom.maxOccupancy,
              newRoom.price,
              true,
              newRoom.roomColor
            )
        ) || [];
      this.rooms.set(mappedRooms);
    });
  }
}
