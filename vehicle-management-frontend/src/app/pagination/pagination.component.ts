import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input('paginationDetails') paginationDetails: any;
  @Input('totalItems') totalItems: number;
  @Input('searchStatus') searchStatus: boolean;
  @Output('pagination') pagination: EventEmitter<any> = new EventEmitter<any>()

  public totalPages: number
  public currentPage: number
  private itemsPerPage: number = 5;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.totalItems) {

      if (changes.totalItems.firstChange) {
        this.pageCalculation()
      }
      else {

        if (this.searchStatus) {
          this.pageCalculation()
        } else {
          this.totalPages = Math.ceil(changes.totalItems.currentValue / this.itemsPerPage);
          if (this.totalPages < this.currentPage) {
            this.currentPage--;
            this.pagination.emit({ pageEvent: "deleteLastItemInPage" })
          }
        }

      }

    }
    else if (changes.paginationDetails) {
      if (this.searchStatus) {
        this.pageCalculation()
      }
    }

  }

  ngOnInit(): void {
  }

  previousPageInvoke() {

    this.currentPage--;
    this.pagination.emit({ before: this.paginationDetails.startCursor, last: this.itemsPerPage, pageEvent: "previous" })

  }

  nextPageInvoke() {

    this.currentPage++;
    this.pagination.emit({ first: this.itemsPerPage, after: this.paginationDetails.endCursor, pageEvent: "next" })

  }

  firstPageInvoke() {
    console.log("First Page")
  }

  lastPageInvoke() {
    console.log("Last page")
  }

  pageCalculation() {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage)
  }
  
}
