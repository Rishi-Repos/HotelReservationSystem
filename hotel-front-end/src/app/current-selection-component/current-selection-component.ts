import { Component, computed, signal } from '@angular/core';
import { HttpService } from '../services/http-service';
import { CommonModule } from '@angular/common';
import { Room } from '../room/room';
import { DataPassService } from '../services/data-pass-service';
import { RoomComponent } from '../room-component/room-component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-current-selection-component',
  standalone: true,
  imports: [CommonModule, RoomComponent],
  templateUrl: './current-selection-component.html',
  styleUrl: './current-selection-component.css',
})
export class CurrentSelectionComponent {
  selectedRooms = signal<Room[]>([]);
  numberOfRoomsCount = signal(1);

  selectedCount = computed(() => this.selectedRooms().length);
  remainingCount = computed(() => this.numberOfRoomsCount() - this.selectedCount());

  currentRoomNumber = computed(() => this.selectedCount() + 1);

  constructor(private httpService: HttpService, private dataPass: DataPassService) {
    this.dataPass.currentRoomSelectionObservable.subscribe((rooms) => {
      this.selectedRooms.set(rooms);
    });

    this.dataPass.currentRoomSelectionObservable
      .pipe(takeUntilDestroyed())
      .subscribe((rooms) => this.selectedRooms.set(rooms));
  }

  mockBooking = {
    numberOfRooms: 2,
  };

  roomSlots = computed(() => Array.from({ length: this.mockBooking.numberOfRooms }));

  mockNumberOfGuests4 = {
    numberOfGuests: 4,
  };

  mockNumberOfGuests2 = {
    numberOfGuests: 2,
  };
}
