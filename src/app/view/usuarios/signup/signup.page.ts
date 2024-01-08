import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formCadastrar : FormGroup;


  constructor(private router: Router, private alertService: AlertService, private authService : AuthService, private formBuilder: FormBuilder) {
      this.formCadastrar = new FormGroup({
        email: new FormControl(''),
        senha: new FormControl(''),
        confSenha: new FormControl('')
      });
     }


     ngOnInit() {
      this.formCadastrar = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confSenha: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    get errorControl(){
      return this.formCadastrar.controls;
    }

    submitForm() : boolean{
      if(!this.formCadastrar.valid){
        this.alertService.presentAlert("Erro", "Erro ao Preencher os Campos!");
        return false;
      }else{
        this.cadastrar();
        return true;
      }
    }
    private cadastrar(){
      this.authService.signUpWithEmailPassword(this.formCadastrar.value['email'],
      this.formCadastrar.value['senha']).then((res) => {
        this.alertService.presentAlert("Sucesso", " Cadastro realizado com Sucesso!");
        this.router.navigate(["/signin"]);
      })
      .catch((error) => {
        this.alertService.presentAlert("Erro", "Erro ao realizar Cadastro!");
        console.log(error.message)
      })
    }

}
