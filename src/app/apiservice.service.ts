import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
   apiUrl = 'https://jsonplaceholder.typicode.com/users';
   registeredDataSubject = new BehaviorSubject<any[]>([]);
  registeredData$ = this.registeredDataSubject.asObservable();
  registeredData: any[] = [];
   deletedIds: any[] = [];

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateRegisteredData(newData: any[]) {
    this.registeredData = newData;
    this.registeredDataSubject.next(this.registeredData);
  }

  deleteRecordById(id: string) {
    this.registeredData = this.registeredData.filter(user => user.id !== id);
    this.deletedIds.push(id);
    this.registeredDataSubject.next(this.registeredData);
  }

  getDeletedIds(): string[] {
    return this.deletedIds;
  }
}
