import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import Contato from 'src/app/model/entities/Contato';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public nome :string;
  public telefone : number;
  public imagem : any;
  public user: any;

  constructor(private alert: AlertService,
    private router : Router,
    private firebase: FirebaseService,
    private auth: AuthService)  {
      this.user = this.auth.getUserLogged();
    }

  ngOnInit() {
  }

  public uploadFile(imagem : any) {
    this.imagem = imagem.files;
  }

  cadastrar(){
    if(this.nome && this.telefone){
      let novo : Contato = new Contato(this.nome, this.telefone);
      novo.uid = this.user.uid;
      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo);
      } else {
        this.firebase.create(novo);
      }
      this.alert.presentAlert("Sucesso", "Contato Salvo!");
      this.router.navigate(["/home"]);
    }else{
     this.alert.presentAlert("Erro", "Campos Obrigatórios!");
    }
  }

}
