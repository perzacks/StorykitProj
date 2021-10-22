import { Injectable } from '@angular/core';
import {MovieInt} from '../interface/movie-int';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) { }


  public getMovieList(): Observable<MovieInt[]> {
    return this.http.get<MovieInt[]>(this.apiUrl + '/movies');
  }

  public searchMovieList(searchVal): Observable<MovieInt[]> {
    return this.http.get<MovieInt[]>(this.apiUrl + `/movies/${searchVal}`);
  }
  public updateMovieGrade(id, movieGrade): Observable<MovieInt[]> {
    const body = { grade: movieGrade };
    return this.http.put<MovieInt[]>(this.apiUrl + `/movies/${id}`, body);
  }
}
