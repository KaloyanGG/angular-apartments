import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sameValueGroupValidator } from './validators';
import { ShortenPipe } from './shorten.pipe';



@NgModule({
  declarations: [
    ShortenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShortenPipe
  ]
})
export class SharedModule { }
