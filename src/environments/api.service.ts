import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject, } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private error = new BehaviorSubject<any>("");
  errorMessage = this.error.asObservable();

  pathAdress = "http://localhost:3307"

  constructor(private http: HttpClient) { }

  getpatient():Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3307/patient")
  }

  getAllData(url: string): Observable<any[]> {
    const path = `${this.pathAdress}/${url}`;
    return this.http.get<any[]>(path)
      .pipe(
        catchError(this.handleError<any[]>('GETTING DATAS', []))
      );
  }

  addData(item: any, url: any): Observable<any> {
    const path = `${this.pathAdress}/${url}`;
    console.log(path)
    return this.http.post<any>(path, item, httpOptions)
    .pipe(
      catchError(this.handleError<any>('ADDING DATA'))
    );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed, code: ${error.status}, ${error.name} `);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message)
    this.error.next(message)
    this.error.next("");
  }

}
