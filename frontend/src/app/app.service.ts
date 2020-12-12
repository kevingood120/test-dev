import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './app.interface'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  rootUrl = 'http://localhost:3333/task'

  constructor(
    private http: HttpClient
  ) { }


  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.rootUrl)
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.rootUrl, task)
  }

  remove(id: number): Observable<Task> {
    return this.http.delete<Task>(this.rootUrl + `/${id}`)
  }

  update(task: Task): Observable<Task> {
    const id = task.id
    delete task.id
    const body = { ...task}
    return this.http.put<Task>(this.rootUrl + `/${id}`, body)
  }
}
