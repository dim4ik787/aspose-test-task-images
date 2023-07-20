import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BytesPipe } from './pipes/bytes.pipe';
import { DndDirective } from './directives/dnd.directive';



@NgModule({
  declarations: [BytesPipe, DndDirective],
  imports: [
    CommonModule
  ],
  exports: [BytesPipe, DndDirective],
})
export class SharedModule { }
