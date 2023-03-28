import { AutorInterface } from './../../types/autor.interface';
import { Subscription } from 'rxjs';
import { AutorService } from './../../services/autor.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-autor-list-page',
  templateUrl: './autor-list-page.component.html',
})
export class AutorListPageComponent implements OnInit {
  autores: AutorInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private autorService: AutorService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  listar() {
    this.subscriptions.add(
      this.autorService.getAutores().subscribe((autores) => {
        this.autores = autores;
      })
    );
  }

  async remove(autor: AutorInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o autor ${autor.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.autorService.remove(autor).subscribe(() => {
                this.listar();
              })
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
    // this.alertController
    // .create({
    //header: 'Confirmação de exclusão',
    //})
    //.then((alert) => alert.present());
  }
}
