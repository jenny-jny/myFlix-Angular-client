import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://jny-myflix.herokuapp.com';
const username = localStorage.getItem('username');
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})

//Change class name to FetchAPIData
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/register', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }

  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    // /users/:Username
    // post method
    return this.http.get(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + '/', {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }

  public getMovie(title: any): Observable<any> {
    return this.http.get(apiUrl + `/${title}`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getDirector(title: any): Observable<any> {
    return this.http.get(apiUrl + `/${title}/director`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getGenre(title: any): Observable<any> {
    return this.http.get(apiUrl + `/${title}/genre`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getUser(): Observable<any> {
    return this.http.get(apiUrl + `/users/${username}`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // May need to add this route to REST API
  public getFavoriteMovies(): Observable<any> {
    return this.http.get(apiUrl + `/users/${username}/favorites`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // May need to add { } as second parameter in post method
  public addFavoriteMovie(movieId: any): Observable<any> {
    return this.http.post(apiUrl + `/users/${username}/favorites/${movieId}`, movieId, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public updateUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.put(apiUrl + `/users/${username}`, userDetails, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public deleteUser(): Observable<any> {
    return this.http.delete(apiUrl + `/users/${username}`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public deleteFavoriteMovie(movieId: any): Observable<any> {
    return this.http.delete(apiUrl + `/users/${username}/favorites/${movieId}`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}