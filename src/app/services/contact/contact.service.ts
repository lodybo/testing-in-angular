import { MailData } from './maildata.interface';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ContactService {

    constructor(private http: Http) {}

    sendMail(mailData: MailData): Observable<any> {
        if (mailData.url !== '') {
            return Observable.throw('Got ya, Winnie the Pooh!');
        }

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let options = new RequestOptions({
            headers: headers
        });

        return this.http.post('http://localhost:9004/send/mail', mailData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error));
    }
}
