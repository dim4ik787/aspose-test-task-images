import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageFile } from 'src/app/models/preview.interface';

@Component({
  selector: 'asp-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePreviewComponent {
  /**
   * The width of the image container.
   */
  imageWidth!: string;

  /**
   * Indicates whether the overlay elements are hidden or visible on mouseover.
   */
  hideElement = true;

  /**
   * The ImageFile object representing the image to be displayed.
   */
  @Input() image!: ImageFile;

  /**
   * Set the width of the image container.
   * @param value - The width of the image container as a number or string.
   */
  @Input() set width(value: number | string) {
    this.imageWidth = value + 'px';
  }

  /**
   * Event emitted when the delete button is clicked.
   */
  @Output() delete = new EventEmitter();

  /**
   * Event handler for the delete button click.
   * Emits the delete event.
   */
  deleteHandle(): void {
    this.delete.emit();
  };

  /**
   * Event handler for the download button click.
   * Initiates the image download by creating a temporary download link.
   */
  downloadHandle(): void {
    const downloadLink = document.createElement('a');

    downloadLink.href = this.image.src;
    downloadLink.download = this.image.name;
    downloadLink.click();
  }
}
