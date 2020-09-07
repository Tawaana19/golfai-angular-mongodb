import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  data = ''
  searchFormControl = new FormControl('', [
    Validators.required,
  ]);
  option = ''
  options = {}

  matcher = new MyErrorStateMatcher();

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  searchDetails() {
    if (this.searchFormControl.value == '') {
      return
    }
    this.router.navigate(['details'], { state: { data: this.searchFormControl.value } });
  }

  getListings(value) {
    return this.http.get(environment.backendUrl+"search?searchParam=" + value);
  }

  autocompletedetails(event) {
    console.log(event.keycode)
    if (this.searchFormControl.value == '' || this.searchFormControl.value.length < 2) {
      return
    }
    this.getListings(this.searchFormControl.value).subscribe((data: any) => {
      var temp = []
      data.forEach(element => {
        if (element["Record Date"].includes(this.searchFormControl.value)) {
          temp.push(element["Record Date"])
        }
        if (element["Book Type"].includes(this.searchFormControl.value)) {
          temp.push(element["Book Type"])
        }
        if (element["Legal Description"].includes(this.searchFormControl.value)) {
          temp.push(element["Legal Description"])
        }
      });
      this.options = new Set(temp);
    })
  }
}
