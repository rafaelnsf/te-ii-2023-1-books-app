import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { LivroInterface } from '../../types/livro.interface';

@Component({
  selector: 'app-livro-cadastro',
  templateUrl: './livro-cadastro.component.html',
})
export class LivroCadastroComponent implements OnInit {
  livroForm: FormGroup = this.formBuilder.group({
    id: 0,
    nome: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(200)],
    ],
    autor: [
      '',
      [Validators.minLength(3), Validators.maxLength(150), Validators.required],
    ],
    preco: 0,
    publicacao: '2000-01-01',
  });

  edicao: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private livroService: LivroService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.edicao = !!id;
    console.log(id);
    if (id) {
      this.livroService.getLivro(id).subscribe(
        (livro) => {
          console.log(livro);
          this.livroForm.patchValue(livro);
        },
        (erro) => {
          console.log('Erro: ', erro);
        }
      );
    }
  }

  onSubmit() {
    console.log(this.livroForm.valid);
    console.log(this.livroForm.value);

    const livro: LivroInterface = this.livroForm.value;

    if (livro.id) {
      this.livroService.update(livro).subscribe(() => this.redirect());
    } else {
      this.livroService.save(livro).subscribe(() => this.redirect());
    }
  }

  redirect() {
    this.router.navigate(['livros', 'lista']);
  }
}
