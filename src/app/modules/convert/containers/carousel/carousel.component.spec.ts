import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import { ImageFile } from 'src/app/models/preview.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  const images: ImageFile[] = [
    {
      name: 'image1.jpg',
      src: 'path/to/image1.jpg',
      file: new File(['test content'], 'image1.jpg', { type: 'image/jpeg' }),
    },
    {
      name: 'image2.jpg',
      src: 'path/to/image2.jpg',
      file: new File(['test content'], 'image2.jpg', { type: 'image/jpeg' }),
    },
    {
      name: 'image3.jpg',
      src: 'path/to/image3.jpg',
      file: new File(['test content'], 'image3.jpg', { type: 'image/jpeg' }),
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the delete event when deleteImage is called', () => {
    spyOn(component.delete, 'emit');
    const indexToDelete = 1;

    component.deleteImage(indexToDelete);

    expect(component.delete.emit).toHaveBeenCalledWith(indexToDelete);
  });

  it('should identify images by their source URL', () => {
    const image1 = {
      name: 'image1.jpg',
      src: 'path/to/image1.jpg',
    } as ImageFile;
    const image2 = {
      name: 'image2.jpg',
      src: 'path/to/image2.jpg',
    } as ImageFile;
    const image3 = {
      name: 'image3.jpg',
      src: 'path/to/image3.jpg',
    } as ImageFile;

    const identifier1 = component.identify(0, image1);
    const identifier2 = component.identify(1, image2);
    const identifier3 = component.identify(2, image3);

    expect(identifier1).toBe('path/to/image1.jpg');
    expect(identifier2).toBe('path/to/image2.jpg');
    expect(identifier3).toBe('path/to/image3.jpg');
  });
});
