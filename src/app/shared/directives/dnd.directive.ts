import {
  Directive,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

/**
 * Directive for handling Drag-and-Drop (DnD) events on an HTML element.
 *
 * This directive allows an element to respond to dragover, dragleave, and drop events
 * for enabling Drag-and-Drop functionality.
 *
 * Usage:
 * - Add this directive to the HTML element where you want to enable Drag-and-Drop behavior.
 * - Use the (fileDropped) event to handle dropped files.
 * - When a file is being dragged over the element, it will have the "fileover" CSS class applied.
 * - When the file is outside the element after being dragged, the "fileover" CSS class will be removed.
 *
 * Example:
 * ```html
 * <div aspDnd (fileDropped)="onFileDropped($event)"></div>
 * ```
 */
@Directive({
  selector: '[aspDnd]'
})
export class DndDirective {
  /**
   * Flag to track whether a file is being dragged over the element.
   * It controls the presence of the "fileover" CSS class on the element.
   */
  @HostBinding('class.fileover') fileOver: boolean | undefined;

  /**
   * Event emitter for when files are dropped onto the element.
   * Emits a FileList object containing the dropped files.
   */
  @Output() fileDropped = new EventEmitter<FileList>();

  /**
   * Dragover event listener.
   * Prevents the default browser behavior and stops the event propagation.
   * Sets the fileOver flag to true to apply the "fileover" CSS class to the element.
   *
   * @param evt - The DragEvent object.
   */
  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  /**
   * Dragleave event listener.
   * Prevents the default browser behavior and stops the event propagation.
   * Sets the fileOver flag to false to remove the "fileover" CSS class from the element.
   *
   * @param evt - The DragEvent object.
   */
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  /**
   * Drop event listener.
   * Prevents the default browser behavior and stops the event propagation.
   * Sets the fileOver flag to false to remove the "fileover" CSS class from the element.
   * Emits the dropped files as a FileList object using the fileDropped event emitter.
   *
   * @param evt - The DragEvent object.
   */
  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let files = evt.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
