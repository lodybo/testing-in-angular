import { MailData } from './maildata.interface';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { ContactService } from './contact.service';

describe('Contact Service: Isolated unit test', () => {
  // Set up references for testing http calls
  let backend: MockBackend;
  let lastConnection: MockConnection;
  let contactService: ContactService;

  // Other setups
  let contactFormData: MailData = {
    name: 'Lody',
    email: 'lody.borgers@philips.com',
    message: 'Hello World',
    url: ''
  };

  // Custom responses
  const succesResponse = new Response(new ResponseOptions({
    status: 200,
    body: {
      sendStatus: 'Mail successfully sent',
      receiver: contactFormData.email
    }
  }));

  const errorResponse = new Response(new ResponseOptions({
    status: 400,
    body: {
      sendStatus: 'There was an error sending the email. Is the address correct?',
      receiver: 'lody'
    }
  }));

  // Set up our test module
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactService, MockBackend, BaseRequestOptions, {
        // Provide a Mock HTTP module so that we have control about what to return and inspect what's being sent
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory: (xhrBackend: XHRBackend, defaultOptions: BaseRequestOptions) => new Http(xhrBackend, defaultOptions)
      }]
    });
  });

  // Assign references
  beforeEach(inject([ContactService, MockBackend], (service, mockBackend) => {
    contactService = service;
    backend = mockBackend;

    // Make the last connection easily available in our tests
    backend.connections.subscribe((connection) => lastConnection = connection);
  }));

  // Check for no pending requests
  afterEach(() => {
    backend.verifyNoPendingRequests();
  });

  it('should send the data of the form to the server', fakeAsync(() => {
    // Make the call
    const call = contactService.sendMail(contactFormData);

    // Respond with our custom responses
    // lastConnection also has access to a request object, containing e.g. headers and url
    lastConnection.mockRespond(succesResponse);

    // Wait, since it's an async function
    tick();

    // HTTP in Angular is an Observable, so we can subscribe to that call and inspect the response
    call.subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.sendStatus).toBe('Mail successfully sent');
      expect(response.receiver).toBe('lody.borgers@philips.com');
    });
  }));

  it('should NOT send data of the email address is invalid', fakeAsync(() => {
    // Set up invalid email address
    contactFormData.email = 'lody';

    // Make the call and respond with our error response
    // lastConnection also has '.mockError', but that throws your error in your console
    // There is discussion about changing it to something like responding with an http error code and body
    const call = contactService.sendMail(contactFormData);
    lastConnection.mockRespond(errorResponse);

    tick();

    call.subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.sendStatus).toBe('There was an error sending the email. Is the address correct?');
      expect(response.receiver).toBe('lody');
    });
  }));
});
