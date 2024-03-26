import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8080/events';
  private eventByIdUrl = 'http://localhost:8080/events/{0}';
  private postBuyTicket = 'http://localhost:8080/events/buyTicket';
  constructor(private http: HttpClient) { }

  getEventList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEventById(data:any): Observable<any[]> {
    let url = this.eventByIdUrl.replace("{0}", data)
    return this.http.get<any[]>(url);
  }

  postTicket(data:any):Observable<any[]>{
    return this.http.post<any[]>(this.postBuyTicket, data);
  }

}
