import { Component, OnInit } from '@angular/core';
import { SliderDataService } from '../../services/slider-data.service';
import { SliderListService } from '../../services/slider-list.service';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html',
  styleUrls: ['./slider-list.component.scss']
})
export class SliderListComponent implements OnInit {

  constructor(
    public sliderDataService: SliderDataService, 
    public sliderListService: SliderListService
  ) { }

  ngOnInit() {
  }

}
