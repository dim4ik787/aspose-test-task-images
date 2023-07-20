import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ImageFile } from 'src/app/models/preview.interface';

/**
 * Represents the Carousel Component for displaying a list of images in a carousel.
 */
@Component({
  selector: 'asp-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  /**
   * The list of ImageFile objects representing the images to be displayed in the carousel.
   */
  @Input({ required: true }) images!: ImageFile[];

  /**
   * Event emitted when an image is deleted from the carousel.
   */
  @Output() delete = new EventEmitter();

  /**
   * Reference to the carousel element in the template.
   */
  @ViewChild('carousel') carousel!: ElementRef<HTMLElement>;

  /**
   * The width of each slide in the carousel.
   */
  slideWidth = 150;

  /**
   * The padding between slides in the carousel.
   */
  private imagePadding = 10;

  /**
   * Scrolls to the next slide in the carousel.
   */
  scrollNext() {
    this.carousel.nativeElement.scrollBy({
      left: this.slideWidth + this.imagePadding,
      behavior: 'smooth',
    });
  }

  /**
   * Scrolls to the previous slide in the carousel.
   */
  scrollPrevious() {
    this.carousel.nativeElement.scrollBy({
      left: -(this.slideWidth + this.imagePadding),
      behavior: 'smooth',
    });
  }

  /**
   * TrackBy function for ngFor to identify images by their source URL.
   * @param _index - The index of the item in the array (not used in this implementation).
   * @param item - The ImageFile object representing the image.
   * @returns The source URL of the image as the identifier.
   */
  identify(_index: number, item: ImageFile) {
    return item.src;
  }

  /**
   * Emits the delete event when an image is deleted from the carousel.
   * @param index - The index of the image to be deleted.
   */
  deleteImage(index: number): void {
    this.delete.emit(index);
  }
}
