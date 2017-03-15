import { MailData } from './maildata.interface';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { ContactService } from './contact.service';
