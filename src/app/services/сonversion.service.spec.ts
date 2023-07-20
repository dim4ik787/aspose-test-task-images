import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConversionService } from './conversion';
import { ConvertImages, ImageFile } from '../models/preview.interface';

describe('ConversionService', () => {
  let service: ConversionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConversionService],
    });

    service = TestBed.inject(ConversionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve JWT token', () => {
    const mockToken = {
      access_token: 'mockToken',
      token_type: 'Bearer',
      expires_in: 11111,
    };

    service['getJwtToken']().subscribe((token) => {
      expect(token).toEqual(mockToken);
    });

    const req = httpMock.expectOne(environment.authURL);
    expect(req.request.method).toBe('POST');
    req.flush(mockToken);
  });

  it('should convert image', fakeAsync(() => {
    const mockToken = { access_token: 'mockToken', token_type: 'Bearer' };
    const mockConversion: ConvertImages = {
      endFormat: 'jpeg',
      images: [
        {
          file: new File([''], 'test.png', { type: 'image/png' }),
          isConverted: false,
          name: 'test.png',
          src: '',
        },
      ],
      startFormat: '',
    };
    const mockResponseBlob = new Blob([''], { type: 'image/jpeg' });

    spyOn<any>(service, 'getJwtToken').and.returnValue(of(mockToken));

    service.convertImages(mockConversion).subscribe((image: ImageFile) => {
      expect(image.isConverted).toBeTrue();
      expect(image.name).toBe('test.jpeg');
    });

    const req = httpMock.expectOne(
      `${environment.baseURL}?format=${mockConversion.endFormat}`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponseBlob);
  }));

  it('should not process more than environment.threadsCount images concurrently', fakeAsync(() => {
    const mockToken = { access_token: 'mockToken', token_type: 'Bearer' };
    const mockConversion: ConvertImages = {
      endFormat: 'jpeg',
      images: [
        {
          file: new File([''], 'test1.png', { type: 'image/png' }),
          isConverted: false,
          name: 'test1.png',
          src: '',
        },
        {
          file: new File([''], 'test2.png', { type: 'image/png' }),
          isConverted: false,
          name: 'test2.png',
          src: '',
        },
        {
          file: new File([''], 'test3.png', { type: 'image/png' }),
          isConverted: false,
          name: 'test3.png',
          src: '',
        },
        {
          file: new File([''], 'test4.png', { type: 'image/png' }),
          isConverted: false,
          name: 'test4.png',
          src: '',
        },
        {
          file: new File([''], 'test5.png', { type: 'image/png' }),
          isConverted: false,
          name: 'test5.png',
          src: '',
        },
        {
          file: new File([''], 'test6.png', { type: 'image/png' }),
          isConverted: false,
          name: 'test6.png',
          src: '',
        },
        {
          file: new File([''], 'test7.png', { type: 'image/png' }),
          isConverted: false,
          name: 'test7.png',
          src: '',
        },
        {
          file: new File([''], 'test8.png', { type: 'image/png' }),
          isConverted: false,
          name: 'test8.png',
          src: '',
        },
      ],
      startFormat: 'png',
    };
    const mockResponseBlob = new Blob([''], { type: 'image/jpeg' });

    spyOn<any>(service, 'getJwtToken').and.returnValue(of(mockToken));

    service.convertImages(mockConversion).subscribe();

    tick(0);

    let requests = httpMock.match(() => true);

    while (requests.length) {
      expect(requests.length).toBeLessThanOrEqual(environment.threadsCount);
      requests.forEach((req) => req.flush(mockResponseBlob));
      tick(0);
      requests = httpMock.match(() => true);
    }
  }));

  it('should replace file extension', () => {
    const filename = 'test.png';
    const newExtension = 'jpeg';
    const newFilename = service['replaceFileExtension'](filename, newExtension);
    expect(newFilename).toBe('test.jpeg');
  });
});
