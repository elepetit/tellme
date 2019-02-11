import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class BellovacomService {

  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.');
}

private extractData(res: Response) {
  let body = res;
  return body || { };
}
getCarte(): Observable<any> {
  return this.http.get('https://bellovacom.fr/ws_carte.php', httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}
getCarteId(id): Observable<any> {
  return this.http.get('https://bellovacom.fr/ws_carteid.php?idcarte=%27'+id+'%27', httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
} 
}
