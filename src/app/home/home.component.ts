import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../services/';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('contactForm') contactForm;
    data = {
        name: '',
        email: '',
        message: '',
        url: ''
    };

    state = {
        submitting: false,
        submitted: false,
        error: false
    };

    constructor(private contactService: ContactService) { }

    ngOnInit() { }

    onSubmit() {
        this.state.submitted = true;
    }

    resetForm() {
        this.data = {
            name: '',
            email: '',
            message: '',
            url: ''
        };

        this.contactForm.reset();
    }

    sendForm() {
        if (this.data.url === null) {
            this.data.url = '';
        }

        // Set form state to submitting
        this.state.submitting = true;

        // Make REST call
        this.contactService.sendMail(this.data)
            .subscribe(() => {
                // Mark form as submitted
                this.state.submitted = true;
                this.state.submitting = false;
            }, (err) => {
                console.error('Error while sending: ', err);
                this.state.submitting = false;
                this.state.submitted = false;

                this.state.error = true;
            }, () => {
                // Reset form, if no error was found
                if (!this.state.error) {
                    this.resetForm();
                }
            });
    }

    resendForm() {
        this.state.submitted = false;
    }
}
