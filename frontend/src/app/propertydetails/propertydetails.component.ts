import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-propertydetails',
  templateUrl: './propertydetails.component.html',
  styleUrls: ['./propertydetails.component.css']
})
export class PropertydetailsComponent implements OnInit {

  searchValue = ''
  details_data = []
  loading_complete = false
  display_data = []
  pageSize = 3

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getListings(history.state.data).subscribe((data: any) => {
      this.details_data = data
      this.display_data = this.details_data.slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
      this.loading_complete = true
    })
  }

  pageChangeEvent(event) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.display_data = this.details_data.slice(offset).slice(0, event.pageSize);
  }

  getListings(value) {
    console.log("BackendURL:"+environment.backendUrl)
    return this.http.get(environment.backendUrl+"search?searchParam=" + value);
  }
}
