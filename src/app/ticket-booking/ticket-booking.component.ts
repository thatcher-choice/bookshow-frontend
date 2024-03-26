import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';
@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.scss']
})
export class TicketBookingComponent implements OnInit {
  totalCost: number = 0;

onSubmit() {
  event?.preventDefault();
  const payload = {
    'name' : this.formGroup.get('name')?.value,
    'email':this.formGroup.get('email')?.value,
    'phone': this.formGroup.get('phone')?.value,
    'seatLocation' : this.formGroup.get('seatLocation')?.value,
    'eventId' : this.eventItem.id,
    'numberOfTickets' : this.currentStep,
    'totalPrice' : this.totalCost,
    'dateOfPurchase' : new Date()
  }
  console.log(payload, 'payload');
  
  this.eventService.postTicket(payload).subscribe((res) => {
    console.log(res, 'postResult');
    if(res){

    }
  })
}
  eventItem: any;
  currentStep: number = 0;
  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    rangeControl: new FormControl(0, Validators.required),
    seatLocation: new FormControl('', Validators.required),
    totalPrice: new FormControl(0, Validators.required),
  });
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    console.log(new Date(), 'daatee');
    
    const storedId = localStorage.getItem('id');
    if(storedId)
    {
      this.eventService.getEventById(storedId).subscribe((response) => {
        this.eventItem = response;
        console.log(this.eventItem, 'item');
        
      })
    }
    this.formGroup.get('rangeControl')?.valueChanges.subscribe((value: number) => {
      this.currentStep = Math.round(value);
      this.totalCost = this.currentStep * this.eventItem.price;
      this.formGroup.get('totalPrice')?.setValue(this.totalCost);
    });
}

  
}
