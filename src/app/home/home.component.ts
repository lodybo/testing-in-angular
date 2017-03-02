import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data = {
    name: '',
    email: '',
    message: ''
  };

  state = {
      submitting: false,
      submitted: false,
      resend: false,
      error: false
  };

  constructor() {
    // Do stuff
  }

  ngOnInit() { }

}
