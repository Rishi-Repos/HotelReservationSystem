import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../services/http-service';
import { DataPassService } from '../services/data-pass-service';

@Component({
  selector: 'app-employee-available-rooms-component',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './employee-available-rooms-component.html',
  styleUrl: './employee-available-rooms-component.css',
})
export class EmployeeAvailableRoomsComponent {
  constructor(private httpService: HttpService, private dataPass: DataPassService) {
    this.setTotalNumberOfRooms();
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: (fetchInfo, successCallback, failureCallback) => {
      const startDate: Date = new Date(fetchInfo.start);
      const endDate: Date = new Date(fetchInfo.end);
      this.httpService.getAllAvailableRooms(startDate, endDate).subscribe({
        next: (data) => {
          if (data.body === null) {
            return;
          }
          const totalRooms = this.dataPass.totalNumberOfRooms();
          console.log(data.body);
          const events = data.body.map((d) => ({
            // title: `${totalRooms - d.length} booked`,
            // date: d.date,
            // className: d.rooms.length === 0 ? 'fully-booked' : 'available',
          }));
          successCallback(events);
        },
        error: (err) => failureCallback(err),
      });
    },
  };

  setTotalNumberOfRooms() {
    this.httpService.getAllRooms().subscribe((data) => {
      if (data.body) {
        this.dataPass.totalNumberOfRooms.set(data.body.length);
      }
    });
  }
}
