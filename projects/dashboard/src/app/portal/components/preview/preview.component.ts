import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PreviewService } from '../../services/preview.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @ViewChild('iframe', { static: true }) iframe: ElementRef;

  constructor(public previewService: PreviewService) { }

  ngOnInit() {
    this.previewService.get('https://www.bdgadgethouse.com')
      .subscribe(blob => {
        this.iframe.nativeElement.src = blob;
      });
  }

}
