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

export class FetchAPIDataService {
  /**
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * Making the api call for the user registration endpoint
   * @param userDetails 
   * @returns Observable of type any
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/register', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @param error 
   * @returns String
   */
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

  /**
   * Making the api call for the user login endpoint
   * @param userDetails 
   * @returns Observable of type any
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    // /users/:Username
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @returns Observable of type any
   */
  public getAllMovies(): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies', {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Non-typed response extraction
   * @param res 
   * @returns Response or Object
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }

  // public getSynopsis(): Observable<any> {
  //   return this.http.get(apiUrl + `movies/:Title`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
  //     map(this.extractResponseData),
  //     catchError(this.handleError)
  //   );
  // }

  // public getDirector(): Observable<any> {
  //   return this.http.get(apiUrl + `/movies/:Title/director`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
  //     map(this.extractResponseData),
  //     catchError(this.handleError)
  //   );
  // }

  // public getGenre(): Observable<any> {
  //   return this.http.get(apiUrl + `/movies/:Title/genre`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
  //     map(this.extractResponseData),
  //     catchError(this.handleError)
  //   );
  // }

  /**
   * @returns Observable of type any
   */
  public getUser(): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/users/${username}`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // // May need to add this route to REST API
  // public getFavoriteMovies(): Observable<any> {
  //   return this.http.get(apiUrl + `/users/${username}/favorites`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
  //     map(this.extractResponseData),
  //     catchError(this.handleError)
  //   );
  // }

  /**
   * @param movieId 
   * @returns Observable of type any
   */
  public addFavoriteMovie(movieId: any): Observable<any> {
    return this.http.post(apiUrl + `/users/${username}/favorites/${movieId}`, {}, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @param userDetails 
   * @returns Observable of type any
   */
  public updateUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.put(apiUrl + `/users/${username}`, userDetails, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @returns Observable of type any
   */
  public deleteUser(): Observable<any> {
    return this.http.delete(apiUrl + `/users/${username}`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token}), responseType: "text"}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @param movieId 
   * @returns Observable of type any
   */
  public deleteFavoriteMovie(movieId: any): Observable<any> {
    return this.http.delete(apiUrl + `/users/${username}/favorites/${movieId}`, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}