import {Component, OnInit} from '@angular/core';
import {MovieListService} from '../../http/getmovielist.service';
import {MovieInt} from '../../interface/movie-int';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {
  public movieList: MovieInt[] = [];
  loading = false;
  searchTextedChanged: Subject<string> = new Subject<string>();


  constructor(private movieListService: MovieListService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.movieListService.getMovieList().subscribe(
      (data) => {
        this.movieList = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  public searchMovie(searchVal: string) {

    /* Nedan så throttlar jag med hjälp av debounceTime som väntar med att göra en request för varje sekund som går.
     distinctUntilChanged skickar ej iväg en request till servern om requesten ser likadan ut som tidigare request.
     Och sedan så så används switchMap för att kolla race conditions genom att avbryta tidigare requests mot servern om det har gjorts en liknande tidigare.

    */
    this.loading = true;
    if (this.searchTextedChanged.observers.length === 0) {
      this.searchTextedChanged
        .pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          switchMap((data: string) => this.movieListService.searchMovieList(data)))
        .subscribe((data) => {
            this.movieList = data;
            this.loading = false;
          },
          (error) => {
            console.log(error);
            this.loading = false;
          });
    }
    this.searchTextedChanged.next(searchVal);
  }
}
