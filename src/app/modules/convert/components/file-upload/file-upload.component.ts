import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ImageFile } from 'src/app/models/preview.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'asp-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  /**
   * The text to display as the default drop zone message.
   */
  text = 'drop files here';

  /**
   * Indicates whether there is an error with the file upload.
   */
  hasError = false;

  /**
   * The allowed format for uploaded files.
   */
  @Input() format!: string;

  /**
   * Sets the error message and updates the hasError flag based on the input value.
   * @param value - The error message, if any.
   */
  @Input() set error(value: string | undefined) {
    if (value) {
      this.text = value;
      this.hasError = true;
    } else {
      this.hasError = false;
    }
  }

  /**
   * Event emitted when image files are uploaded successfully.
   */
  @Output() imageUpload = new EventEmitter<ImageFile[]>();

  /**
   * Event handler for file drop action.
   * @param $event - The FileList object representing the dropped files.
   */
  onFileDropped($event: FileList): void {
    this.prepareFilesList($event);
  }

  /**
   * Event handler for file browsing.
   * @param event - The input event containing the selected files.
   */
  fileBrowseHandler(event: Event): void {
    if (!event.target) return;
    this.prepareFilesList((event.target as HTMLInputElement).files);
  }

  /**
   * Converts the Files list to an array of ImageFile objects and emits the result.
   * @param files - The Files List to be processed.
   */
  prepareFilesList(files: FileList | null) {
    if (!files) return;

    if (!this.isFilesCorrect(files)) {
      this.displayError(
        'the selected type differs from the type to be loaded'
      );
      return;
    }

    const images: ImageFile[] = [];

    const maxLength = Math.min(files.length, environment.uploadMaxLength);

    for (let i = 0; i < maxLength; i++) {
      const reader = new FileReader();

      const file = files[i];

      reader.onload = (e: any) => {
        const preview: ImageFile = {
          name: file.name,
          src: e.target.result,
          file,
        };

        images.push(preview);

        if (images.length === files.length) this.imageUpload.emit(images);
      };

      reader.readAsDataURL(file);
    }
  }

  /**
   * Checks if the file types match the specified format.
   * @param files - The Files List to be checked.
   * @returns True if all files have the correct format, otherwise false.
   */
  private isFilesCorrect(files: FileList): boolean {
    for (let i = 0; i < files.length; i++) {
      const fileType = files[i].type.split('/')[1];
      if (fileType !== this.format) return false;
    }

    return true;
  }

  /**
   * Sets the error message to be displayed.
   * @param errText - The text to display.
   */
  private displayError(errText: string): void {
    this.error = errText;
  }
}
