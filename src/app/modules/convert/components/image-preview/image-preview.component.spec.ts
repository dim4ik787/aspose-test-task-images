import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagePreviewComponent } from './image-preview.component';
import { ImageFile } from 'src/app/models/preview.interface';

describe('ImagePreviewComponent', () => {
  let component: ImagePreviewComponent;
  let fixture: ComponentFixture<ImagePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagePreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewComponent);
    component = fixture.componentInstance;

    // Provide a valid ImageFile object as input to the component
    const image: ImageFile = {
      name: 'test.jpg',
      src: 'data:image/jpeg;base64,ABCD...', // Base64 representation of the image data.
      file: new File(['test content'], 'test.jpg', { type: 'image/jpeg' }),
    };
    component.image = image;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set imageWidth correctly when width input is provided', () => {
    const width = 200;
    component.width = width;
    expect(component.imageWidth).toBe(`${width}px`);
  });

  it('should emit delete event when deleteHandle is called', () => {
    spyOn(component.delete, 'emit');
    component.deleteHandle();
    expect(component.delete.emit).toHaveBeenCalled();
  });

  it('should initiate image download when downloadHandle is called', () => {
    const downloadLinkSpy = spyOn(document, 'createElement').and.callThrough();
    const clickSpy = spyOn<any>(window.HTMLAnchorElement.prototype, 'click');

    component.downloadHandle();

    expect(downloadLinkSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
  });
});
