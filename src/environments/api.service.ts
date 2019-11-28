import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject, } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'my-auth-token' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private error = new BehaviorSubject<any>("");
  errorMessage = this.error.asObservable();

  public AccessUrl = "localhost:3307";

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
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

  getAllData(url: string): Observable<any[]> {
    const path = `${this.AccessUrl}/${url}`;
    return this.http.get<any[]>(path)
      .pipe(
        catchError(this.handleError<any[]>('GETTING DATAS', []))
      );
  }

  addData(item: any, url: any): Observable<any> {
    console.log(item)
    const path = `${this.AccessUrl}/${url}`;
    console.log(path)
    return this.http.post<any>(path, item, httpOptions);
    //console.log(path)
    /*
    return this.http.post<any>(path, item, httpOptions)
    .pipe(
      catchError(this.handleError<any>('ADDING DATA'))
    );*/
  }

  deleteData(id: number, url: any): Observable<{}> {
    const path = `${this.AccessUrl}/${url}/${id}`;
    console.log(path)
    return this.http.delete<any>(path, httpOptions)
    .pipe(
      catchError(this.handleError<any>('DELETING DATA'))
    );

  }

  getData(id: number, url: any): Observable<any> {
    const path = `${this.AccessUrl}/${url}/${id}`;
    console.log(path)
    return this.http.get<any[]>(path)
    .pipe(
      catchError(this.handleError<any[]>('GETTING DATA'))
    );
  }


  updateData(item: any, url: any): Observable<any> {
    const path = `${this.AccessUrl}/${url}/${item.id}`;
    console.log(path)
    return this.http.put<any>(path, item, httpOptions)
    .pipe(
      catchError(this.handleError<any>('UPDATING DATA'))
    );

  }
}
