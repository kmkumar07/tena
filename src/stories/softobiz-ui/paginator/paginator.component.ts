import { Component, ViewEncapsulation } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'sft-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent {
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  
  // getRangeLabel = (page: number, pageSize: number, length: number) =>  {
  //   if (length === 0 || pageSize === 0) {
  //     return `0 / ${length}`;
  //   }
  //   length = Math.max(length, 0);
  //   const startIndex = page * pageSize;
  //   const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
  //   return `Showing ${startIndex + 1} of   ${endIndex} / ${length}`;
  // }
}
