import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BreadcrumbService } from 'projects/content-management/src/app/shared/services/breadcrumb.service';
import { BehaviorSubject } from 'rxjs';
import { Slide } from '../../interfaces/slider';
import { SlideListService } from '../../services/slide-list.service';
import { SliderDataService } from '../../services/slider-data.service';

@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.scss']
})
export class SlideListComponent implements OnInit, OnDestroy {
  sliderId: string = null;
  slides$ = new BehaviorSubject<Slide[]>([]);
  
  constructor(
    private breadCrumbService: BreadcrumbService,
    private sliderDataService: SliderDataService,
    private slideListService: SlideListService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((param: ParamMap) => {
      const sliderid: string = param["id"];
      this.sliderId = sliderid;

      this.sliderDataService.getSlides(this.sliderId)
      .subscribe((data) => this.slides$.next(data));
    });

    this.breadCrumbService.addBreadcrumb({
      title: "Slides",
      route: "widgets/sliders/slides/list/" + this.sliderId,
    });

    this.breadCrumbService.addBreadcrumb({
      title: this.sliderId,
      route: "",
    })
  }

  ngOnDestroy(): void {
    // this.breadCrumbService.removeByTitle("Slides");
    // this.breadCrumbService.removeByTitle(this.sliderId);
  }

}
