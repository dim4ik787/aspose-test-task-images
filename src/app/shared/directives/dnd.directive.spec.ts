import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DndDirective } from './dnd.directive';

function createMockEvent(eventName: string): any {
  return {
    preventDefault: jasmine.createSpy('preventDefault'),
    stopPropagation: jasmine.createSpy('stopPropagation'),
    dataTransfer: {
      files: undefined,
    },
    type: eventName,
  };
}

@Component({
  template: `
    <div aspDnd (fileDropped)="onFileDropped($event)"></div>
  `,
})
class TestComponent {
  files: FileList | undefined;

  onFileDropped(files: FileList) {
    this.files = files;
  }
}

describe('DndDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let divElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DndDirective, TestComponent],
      // Add the following line to enable auto-detection of changes in the test component.
      // This will trigger change detection automatically after each simulated event.
      // If you don't use ComponentFixtureAutoDetect, you'll need to manually call fixture.detectChanges() after each event.
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    divElement = fixture.debugElement.query(By.directive(DndDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new DndDirective();
    expect(directive).toBeTruthy();
  });

  it('should trigger dragover event', () => {
    const dragoverEvent = createMockEvent('dragover');
    divElement.triggerEventHandler('dragover', dragoverEvent);

    expect(dragoverEvent.preventDefault).toHaveBeenCalled();
    expect(dragoverEvent.stopPropagation).toHaveBeenCalled();
    expect(testComponent.files).toBeUndefined();
  });

  it('should trigger dragleave event', () => {
    const dragleaveEvent = createMockEvent('dragleave');
    divElement.triggerEventHandler('dragleave', dragleaveEvent);

    expect(dragleaveEvent.preventDefault).toHaveBeenCalled();
    expect(dragleaveEvent.stopPropagation).toHaveBeenCalled();
    expect(testComponent.files).toBeUndefined();
  });
});
