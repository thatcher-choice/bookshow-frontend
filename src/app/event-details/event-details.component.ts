import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  public eventItem :any;
  constructor(private eventService : EventService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    const storedId = localStorage.getItem('id');
    if(storedId)
    {
      this.eventService.getEventById(storedId).subscribe((response) => {
        this.eventItem = response;
        console.log(this.eventItem, 'item');
        
      })
    }
  }
  buyNow(eventName:any, eventId:any){
    this.router.navigate(['/events',eventName,'book']);
    sessionStorage.setItem('id', eventId);
  }
}
