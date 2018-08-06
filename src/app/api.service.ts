import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Todo} from './todo';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {SessionService} from './session.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private session: SessionService
  ) {
  }

  public signIn(username: string, password: string) {
    return this.http
      .post(API_URL + '/sign-in', {
        username,
        password
      })
      .pipe(
        catchError(this.handleError)
      );
  }
  // API: GET /todos
  public getAllTodos(): Observable<any> {
    const options = this.getRequestOptions();
    return this.http
      .get(API_URL + '/todos', options)
      .pipe(
        map(response => {
          const todos = <any[]> response;
          return todos.map((todo) => new Todo(todo));
        }),
        catchError(this.handleError)
      );
  }

  // API: POST /todos
  public createTodo(todo: Todo): Observable<Todo> {
    const options = this.getRequestOptions();
    return this.http
      .post(API_URL + '/todos', todo, options)
      .pipe(
        map(response => {
          return new Todo(response);
        }),
        catchError(this.handleError)
      );

  }

  // API: GET /todos/:id
  public getTodoById(todoId: number): Observable<Todo> {
    const options = this.getRequestOptions();

    return this.http
      .get(API_URL + '/todos/' + todoId, options)
      .pipe(
        map(response => {
          return new Todo(response);
        }),
        catchError(this.handleError));
  }

  // API: PUT /todos/:id
  public updateTodo(todo: Todo): Observable<Todo> {
    const options = this.getRequestOptions();

    return this.http
      .put(API_URL + '/todos/' + todo.id, todo, options)
      .pipe(
        map(response => {
          return new Todo(response);
        }),
        catchError(this.handleError));
  }

  // DELETE /todos/:id
  public deleteTodoById(todoId: number): Observable<Todo> {
    const options = this.getRequestOptions();

    return this.http
      .delete(API_URL + '/todos/' + todoId, options)
      .pipe(
        map(_ => null),
        catchError(this.handleError)
      );
  }

  private handleError(error: Response | any): Observable<never> {
    console.error('ApiService::handleError', error);
    return throwError(error);
  }
  private getRequestOptions() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.session.accessToken
    });
    return { headers };
  }
}
