import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Todo} from '../todo';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  // API: GET /todos
  public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get(API_URL + '/todos')
      .pipe(
        map(response => {
          const todos = response.json();
          return todos.map((todo) => new Todo(todo));
        }),
        catchError(this.handleError)
      );
  }

  // API: POST /todos
  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post(API_URL + '/todos', todo)
      .pipe(
        map(response => {
          return new Todo(response.json());
        }),
        catchError(this.handleError)
      );

  }

  // API: GET /todos/:id
  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get(API_URL + '/todos/' + todoId)
      .pipe(
        map(response => {
          return new Todo(response.json());
        }),
        catchError(this.handleError));
  }

  // API: PUT /todos/:id
  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put(API_URL + '/todos/' + todo.id, todo)
      .pipe(
        map(response => {
          return new Todo(response.json());
        }),
        catchError(this.handleError));
  }

  // DELETE /todos/:id
  public deleteTodoById(todoId: number): Observable<Todo> {
    return this.http
      .delete(API_URL + '/todos/' + todoId)
      .pipe(
        map(response => null),
        catchError(this.handleError)
      );
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
