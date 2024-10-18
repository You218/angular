import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ParentComponent } from './insights/parent.component';
import { ChildComponent } from './insights/child/child.component';
@NgModule({
  declarations: [
    ParentComponent,
    ChildComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ProgressBarModule,
    ToastModule,
  ],
  exports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    ProgressBarModule,
    ToastModule,
  ],
})
export class SharedModule { }
