import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatIconRegistry } from '@angular/material/icon';
import { ConvertModule } from './modules/convert/convert.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ConvertModule],
  providers: [MatIconRegistry],
  bootstrap: [AppComponent],
})
export class AppModule {}
