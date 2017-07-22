import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageService } from '../shared/image.service';

import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit, OnDestroy {
  images: any[];
  imagesFound = false;
  searching = false;
  searchQuery: string;

  currentPage: number;
  isSearchingByScroll = false;

  // Timer to solve scroll event problem
  private timer;
  private sub: Subscription;

  constructor(private _imageService: ImageService) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  searchImages(query: string) {
    this.searching = true;

    this.currentPage = 1;
    this.images = [];

    this._imageService.getImage(query, this.currentPage).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    )
  }

  handleSuccess(data) {
    console.log(data);
    this.imagesFound = true;
    this.images = this.images.concat(data.hits);
  }

  handleError(error) {
    console.log(error);
  }

  onScrollDown(){
    if (!this.isSearchingByScroll){
      console.log(11);
      this.isSearchingByScroll = true;
      this.currentPage++;

      this._imageService.getImage(this.searchQuery, this.currentPage, 20).subscribe(
        data => this.handleSuccess(data),
        error => this.handleError(error),
        () => {
          this.searching = false;  
          this.isSearchingByScroll = true;

          this.timer = Observable.timer(1200);
          this.sub = this.timer.subscribe(t => this.isSearchingByScroll=false);
        }
      )
    }
  }

  imageIdentify(index, image){
    return image.id;
  }
}
