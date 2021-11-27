import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            BrowserAnimationsModule,
            ToastrModule.forRoot()
  ],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
