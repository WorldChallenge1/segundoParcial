import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Test } from './Test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  testsUrl = 'http://10.4.200.117:3000/admin/tests';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.testsUrl)
      .pipe(
        tap(_ => console.log('fetched tests')),
        catchError(this.handleError<Test[]>('getTests', []))
      );
  }

  getTest(id: number): Observable<Test> {
    const url = `${this.testsUrl}/${id}`;
    return this.http.get<Test>(url)
      .pipe(
        tap(_ => console.log(`fetched test id=${id}`)),
        catchError(this.handleError<Test>(`getTest id=${id}`))
    )
  }

  addTest(test: Test): Observable<Test> {
    return this.http.post<Test>(this.testsUrl, test, this.httpOptions)
      .pipe(
        tap((newTest: Test) => console.log(`added test w/ id=${newTest.id}`)),
        catchError(this.handleError<Test>('addTest'))
      );
  }

  editTest(test: Test): Observable<Test> {
    const url = `${this.testsUrl}/${test.id}`;
    return this.http.put<Test>(url, test, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated test id=${test.id}`)),
        catchError(this.handleError<any>('editTest'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
