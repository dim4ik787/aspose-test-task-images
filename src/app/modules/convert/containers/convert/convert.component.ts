import { Component } from '@angular/core';
import { ImageFile } from 'src/app/models/preview.interface';
import { ConversionService } from 'src/app/services/conversion';
import { environment } from 'src/environments/environment';

/**
 * Represents the Convert Component for converting images from one format to another.
 */
@Component({
  selector: 'asp-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css'],
})
export class ConvertComponent {
  /**
   * The starting format selected for image conversion.
   */
  startFormat = 'jpeg';

  /**
   * The target format selected for image conversion.
   */
  endFormat = 'gif';

  /**
   * The array of ImageFile objects representing the images to be converted.
   */
  images: ImageFile[] = [];

  /**
   * Error message to display in case of conversion error.
   */
  errorMessage: string | undefined;

  /**
   * Indicates whether the conversion process is ongoing.
   */
  isConversionProcessing = false;

  /**
   * Indicates whether the conversion has been completed.
   */
  isConverted = false;

  /**
   * Progress value for the conversion process.
   */
  progress = 0;

  /**
   * Buffer value for the conversion process.
   */
  bufferValue = 0;

  /**
   * Checks if the upload section should be displayed.
   * @returns True if there are no images, conversion is not processing, and conversion is not completed; otherwise, false.
   */
  get displayUpload(): boolean {
    return !this.images.length && !this.isConversionProcessing && !this.isConverted;
  }

  /**
   * Checks if the progress bar section should be displayed.
   * @returns True if conversion is processing and conversion is not completed; otherwise, false.
   */
  get displayProgress(): boolean {
    return this.isConversionProcessing && !this.isConverted;
  }

  /**
   * Checks if the carousel section should be displayed.
   * @returns True if there are images or conversion is processing; otherwise, false.
   */
  get displayCarousel(): boolean {
    return !!this.images.length || this.isConversionProcessing;
  }

  constructor(private conversion: ConversionService) {}

  /**
   * Event handler for image upload.
   * @param images - The array of ImageFile objects representing the uploaded images.
   */
  uploadHandler(images: ImageFile[]) {
    this.images = images;
  }

  /**
   * Event handler for image deletion from the carousel.
   * @param index - The index of the image to be deleted.
   */
  deleteHandler(index: number) {
    this.images.splice(index, 1);
  }

  /**
   * Initiates the image conversion process.
   */
  convertHandler() {
    const oneImagePercents = 100 / this.images.length;
    const initialImagesCount =
      environment.threadsCount * oneImagePercents < 100
        ? environment.threadsCount * oneImagePercents
        : 100;

    this.bufferValue = initialImagesCount;
    this.isConversionProcessing = true;

    this.conversion
      .convertImages({
        startFormat: this.startFormat,
        endFormat: this.endFormat,
        images: this.images,
      })
      .subscribe({
        next: (image: ImageFile) => {
          this.images.push(image);
          this.progress += oneImagePercents;
          this.bufferValue =
            this.bufferValue + oneImagePercents > 100
              ? 100
              : this.bufferValue + oneImagePercents;

          if (this.progress > 99) {
            this.isConversionProcessing = false;
            this.isConverted = true;
          }
        },
        error: (error: Error) => {
          this.errorMessage = error.message;
          this.images = [];
          this.isConversionProcessing = false;
        },
      });
    this.images = [];
  }

  /**
   * Initiates the image download process for the converted images.
   */
  downloadImages() {
    for (const image of this.images) {
      const downloadLink = document.createElement('a');

      downloadLink.href = image.src;
      downloadLink.download = image.name;
      downloadLink.click();
    }
  }
}
