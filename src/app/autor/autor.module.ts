import { HttpClientModule } from '@angular/common/http';
import { AutorService } from './services/autor.service';
import { IonicModule } from '@ionic/angular';
import { AutorListPageComponent } from './components/autor-list-page/autor-list-page.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoRoutingModule } from './autor-routing.module';
@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, AutoRoutingModule],
  declarations: [AutorListPageComponent],
  providers: [AutorService],
})
export class AutorModule {}
