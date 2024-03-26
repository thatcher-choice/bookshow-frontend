import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  eventList: any[] = [];

  constructor(private eventService: EventService, private router: Router) {
   }

  ngOnInit(): void {
    this.fetchEventList();
  }

  fetchEventList() {
    this.eventService.getEventList().subscribe(
      (events: any[]) => {
        this.eventList = events;
      },
      (error) => {
        console.error('Error fetching event list:', error);
      }
    );
  }

  goToEventDetails(eventName:any, eventId: any): void {
    this.router.navigate(['/events', eventName], { state: { eventId: eventId } });
    localStorage.setItem('id', eventId);
  }
  

}
