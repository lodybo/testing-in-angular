import { MailData } from '../services/contact/maildata.interface';
import { Observable } from 'rxjs/Rx';
import { ContactService } from '../services';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';

import { HomeComponent } from './home.component';

describe('Contact form: Isolated unit test', () => {
  // Reference to component
  let component: HomeComponent;

  // Async because we're loading an external template
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule], // Needed for ngModel
      declarations: [HomeComponent],
      providers: [{provide: ContactService, useClass: MockContactService}] // Mock class because the ContactService is tested elsewhere
    });

    // Get an instance of our component
    component = TestBed.createComponent(HomeComponent).componentInstance;
  }));

  it('should send mail data', fakeAsync(() => {
    // Set component data like we're filling in the form
    component.data = {
      name: 'Lody',
      email: 'lody.borgers@philips.com',
      message: 'Hello World',
      url: ''
    };

    expect(component.state.submitted).toBe(false);

    component.sendForm();
    tick();

    expect(component.state.submitted).toBe(true);
  }));

  it('should NOT send mail data if the form has been honey potted', fakeAsync(() => {
    // Set component data, including the url parameter
    component.data = {
      name: 'Lody',
      email: 'lody.borgers@philips.com',
      message: 'Hello World',
      url: 'visit http://bot.spamalot.com'
    };

    expect(component.state.submitted).toBe(false);
    expect(component.state.error).toBe(false);

    component.sendForm();
    tick();

    expect(component.state.submitted).toBe(false);
    expect(component.state.error).toBe(true);
  }));
});

describe('Contact form: Component test', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let element: any;
  let elName: any;
  let elEmail: any;
  let elMessage: any;
  let elSubmit: any; // Element misses the 'disabled' and 'value' properties, so we're choosing 'any' for now

  //  Async because we need to load an external template
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HomeComponent],
      providers: [{
        provide: ContactService,
        useClass: MockContactService
      }]
    });
  }));

  // Set up component and elements
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    element = fixture.nativeElement;

    elName = element.querySelector('#name');
    elEmail = element.querySelector('#email');
    elMessage = element.querySelector('#message');
    elSubmit = element.querySelector('#submit');
  });

  // Component testing with fakeAsync
  it('should prohibit sending data if the form is empty', fakeAsync(() => {
    // Give Angular a chance to catch up
    fixture.detectChanges();
    tick();

    // All inputs are empty by default
    expect(elName.textContent).toBe('');
    expect(elEmail.textContent).toBe('');
    expect(elMessage.textContent).toBe('');

    // Give Angular a chance to catch up
    fixture.detectChanges();
    tick();

    // Now check for the button to be disabled
    expect(elSubmit.disabled).toBe(true);
  }));

  // Component testing with async
  it('should send if all fields are filled', async(() => {
    // Give Angular a chance to catch up, again..
    fixture.detectChanges();

    // And when done..
    fixture.whenStable().then(() => {
      // Fill form
      elName.value = 'Lody';
      elEmail.value = 'lody.borgers@philips.com';
      elMessage.value = 'Hello World';

      // Send events up to Angular's Form
      dispatchEvent(elName, 'input');
      dispatchEvent(elEmail, 'input');
      dispatchEvent(elMessage, 'input');

      // Keep up Angular..
      fixture.detectChanges();
      expect(elSubmit.disabled).toBe(false);
    });
  }));
});

class MockContactService {
    sendMail(mailData: MailData): Observable<any> {
        if (mailData.url !== '') {
            return Observable.throw('Got ya, Winnie the Pooh!');
        }

        return Observable.of(mailData);
    }
}
