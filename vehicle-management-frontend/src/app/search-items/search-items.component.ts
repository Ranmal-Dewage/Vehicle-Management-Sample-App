import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.scss']
})
export class SearchItemsComponent implements OnInit {

  @Output("searchItem") searchItem: EventEmitter<{ value: string }> = new EventEmitter<{ value: string }>();

  constructor() { }

  ngOnInit(): void {
  }

  searchItems(form: NgForm): void {
    this.searchItem.emit({ value: form.value.searchName })
    form.resetForm()
  }

}
