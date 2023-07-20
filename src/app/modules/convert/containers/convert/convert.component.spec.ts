import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ConvertComponent } from './convert.component';
import { ImageFile } from 'src/app/models/preview.interface';
import { Subject } from 'rxjs';
import { ConversionService } from 'src/app/services/conversion';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ConvertComponent', () => {
  let component: ConvertComponent;
  let fixture: ComponentFixture<ConvertComponent>;
  let conversionService: ConversionService;

  const fakeFirstDependencyService = jasmine.createSpyObj('ConversionService', ['convertImages'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertComponent],
      providers: [{ provide: ConversionService, useValue: fakeFirstDependencyService }],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(ConvertComponent);
    conversionService = TestBed.inject(ConversionService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle image upload correctly', () => {
    const testImages: ImageFile[] = [
      {
        name: 'test1.jpg',
        src: 'test1.jpg',
        file: new File(['test content'], 'test1.jpg', { type: 'image/jpeg' }),
      },
      {
        name: 'test2.jpg',
        src: 'test2.jpg',
        file: new File(['test content'], 'test2.jpg', { type: 'image/jpeg' }),
      },
    ];
    component.uploadHandler(testImages);
    expect(component.images).toEqual(testImages);
  });

  it('should handle image deletion correctly', () => {
    const testImages: ImageFile[] = [
      {
        name: 'test1.jpg',
        src: 'test1.jpg',
        file: new File(['test content'], 'test1.jpg', { type: 'image/jpeg' }),
      },
      {
        name: 'test2.jpg',
        src: 'test2.jpg',
        file: new File(['test content'], 'test2.jpg', { type: 'image/jpeg' }),
      },
    ];
    component.images = [...testImages];
    const indexToDelete = 1;
    component.deleteHandler(indexToDelete);
    expect(component.images).toEqual([testImages[0]]);
  });

  it('should handle image conversion correctly', fakeAsync(() => {
    // Mock the ConversionService to return an observable for image conversion
    const convertedImage1: ImageFile = {
      src: 'test1.png',
      name: 'test1.png',
      file: {} as File
    };
    const convertedImage2: ImageFile = {
      src: 'test2.png',
      name: 'test2.png',
      file: {} as File
    };
    const sub = new Subject();
    fakeFirstDependencyService.convertImages.and.returnValue(sub.asObservable());


    // Add images for conversion
    const testImages: ImageFile[] = [
      {
        name: 'test1.jpg',
        src: 'test1.jpg',
        file: new File(['test content'], 'test1.jpg', { type: 'image/jpeg' }),
      },
      {
        name: 'test2.jpg',
        src: 'test2.jpg',
        file: new File(['test content'], 'test2.jpg', { type: 'image/jpeg' }),
      },
    ];
    component.images = [...testImages];

    // Trigger the conversion process
    component.convertHandler();
    expect(component.isConversionProcessing).toBe(true);
    tick();

    sub.next(convertedImage1);
    tick();
    sub.next(convertedImage2);
    tick();

    fixture.detectChanges();
    // Expect the converted image to be added to the images array
    expect(component.images).toContain(convertedImage1);
    expect(component.isConversionProcessing).toBe(false);
    expect(component.isConverted).toBe(true);
  }));

  it('should handle image download correctly', () => {
    // Add images for download
    const testImages: ImageFile[] = [
      { name: 'test1.jpg', src: 'path/to/test1.jpg' } as ImageFile,
      { name: 'test2.jpg', src: 'path/to/test2.jpg' } as ImageFile,
    ];
    component.images = [...testImages];

    // Mock the download link
    spyOn(document, 'createElement').and.returnValue({
      click: () => {},
    } as HTMLAnchorElement);

    // Trigger the image download process
    component.downloadImages();

    // Expect the download link to have been created for each image
    expect(document.createElement).toHaveBeenCalledTimes(testImages.length);
  });
});
