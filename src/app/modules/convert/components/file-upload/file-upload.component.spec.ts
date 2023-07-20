import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { ImageFile } from 'src/app/models/preview.interface';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadComponent]
    });
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hasError to true and update text when error input is provided', () => {
    const errorMessage = 'Sample error message';
    component.error = errorMessage;
    expect(component.hasError).toBe(true);
    expect(component.text).toBe(errorMessage);
  });

  it('should set hasError to false when error input is not provided', () => {
    component.error = undefined;
    expect(component.hasError).toBe(false);
  });
});
