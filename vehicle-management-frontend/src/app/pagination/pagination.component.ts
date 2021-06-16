import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input('paginationDetails') paginationDetails: any;
  @Input('totalItems') totalItems: number;
  @Output('pagination') pagination: EventEmitter<any> = new EventEmitter<any>()

  public totalPages: number
  public currentPage: number
  private itemsPerPage: number = 5;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes.totalItems) {
      if (changes.totalItems.firstChange) {
        this.pageCalculation()
        console.log(changes.totalItems.currentValue)
        console.log("1st Total Pages " + this.totalPages)
        console.log("1st Current Page " + this.currentPage)
      } else {
        this.totalPages = Math.ceil(changes.totalItems.currentValue / this.itemsPerPage);
        console.log(changes.totalItems.currentValue)
        if (this.totalPages < this.currentPage) {
          this.currentPage--;
          this.pagination.emit({ before: this.paginationDetails.startCursor, last: this.itemsPerPage, pageEvent: "deleteLastItemInPage" })
        }
        console.log("Total Pages " + this.totalPages)
        console.log("Current Page " + this.currentPage)
      }
    }
  }

  ngOnInit(): void {
    console.log("Init.....")
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
