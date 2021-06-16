import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.scss']
})
export class SearchItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchItems(form: NgForm): void {
    console.log(form.value.searchName)
    form.resetForm()
  }

}
