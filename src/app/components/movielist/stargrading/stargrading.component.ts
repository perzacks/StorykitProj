import {Component, Input} from '@angular/core';
import {MovieListService} from '../../../http/getmovielist.service';

@Component({
  selector: 'app-stargrading',
  templateUrl: './stargrading.component.html',
  styleUrls: ['./stargrading.component.css']
})
export class StargradingComponent {

  @Input() grade: number;
  @Input() id: number;

  constructor(private movieListService: MovieListService) {
  }

  public onRateChange() {
    this.movieListService.updateMovieGrade(this.id, this.grade).subscribe(data => {
      console.log(data);
    });
  }

}
