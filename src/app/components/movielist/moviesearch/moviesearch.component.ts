import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-moviesearch',
  templateUrl: './moviesearch.component.html',
  styleUrls: ['./moviesearch.component.css']
})
export class MovieSearchComponent {
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() loading: boolean;

  searchMovie($event) {
    this.newItemEvent.emit($event.target.value);
  }
}
