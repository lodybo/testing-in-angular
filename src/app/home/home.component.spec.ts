import { MailData } from '../services/contact/maildata.interface';
import { Observable } from 'rxjs/Rx';
import { ContactService } from '../services';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';

import { HomeComponent } from './home.component';

describe('Contact form', () => {

});

class MockContactService {
    sendMail(mailData: MailData): Observable<any> {
        if (mailData.url !== '') {
            return Observable.throw('Got ya, Winnie the Pooh!');
        }

        return Observable.of(mailData);
    }
}
