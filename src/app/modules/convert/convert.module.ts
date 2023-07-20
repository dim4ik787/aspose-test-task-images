import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CarouselComponent } from './containers/carousel/carousel.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { ConvertComponent } from './containers/convert/convert.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FileUploadComponent, ImagePreviewComponent, CarouselComponent, ConvertComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    HttpClientModule,
    MatProgressBarModule,
    SharedModule
  ],
  exports: [ConvertComponent]
})
export class ConvertModule {}
