import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NGX_SPINNER_SERVICE } from 'src/app/components/ngx-spinner.service';
import { LOADING } from 'src/app/components/utils';
import { AccountService } from 'src/app/controllers/account.service';
import { EntrepotService } from 'src/app/controllers/entrepot.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  V_showPassword: boolean = false;
  signForm: FormGroup;
  loginForm: FormGroup;
  onLoad: boolean = false;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private spinner :NGX_SPINNER_SERVICE
  ) {
    this.initForm();
  }

  ngOnInit(): void {}

  F_toLog() {
    this.onLoad = true;
    this.accountService.F_login(this.loginForm.value).then((res: any) => {
      this.onLoad = false;
      console.log(res);
      if (res.statut == 200) {
        this.router.navigate(['dashboard']);
      } else {
        this.toastr.error(
          'Email, téléphone ou mot de passe incorrecte(s)',
          'Erreur',
          {
            timeOut: 5000,
            progressAnimation: 'increasing',
          }
        );
      }
    });
  }
  checkUserExistance() {
    this.onLoad = true;
    if (this.signForm.valid) {
      let data = {
        email: this.signForm.controls['email'].value,
        telephone: this.signForm.controls['telephone'].value,
      };
      this.accountService.F_checkUserExistance(data).then((res) => {
        this.onLoad = false;
        console.log(res)
        if (res.statut == 200) {
          this.F_toSign();
        } else {
          this.toastr.error('Ce utilisateur existe déja.', 'Erreur', {
            timeOut: 5000,
            progressAnimation: 'increasing',
          });
        }
      });
    } else {
      this.onLoad = false;
      this.toastr.error(
        'Veuillez correctement renseigner les champs.',
        'Erreur',
        {
          timeOut: 5000,
          progressAnimation: 'increasing',
        }
      );
    }
  }
  F_toSign() {
    this.onLoad = true;
    if (this.signForm.valid) {
      this.accountService.F_signIn(this.signForm.value).then((res) => {
        this.onLoad = false;
        if (res.statut == 200) {
          this.toastr.success('Inscription effectuée.', 'Succès', {
            timeOut: 5000,
            progressAnimation: 'increasing',
          });
          this.signForm.reset();
        } else {
          this.toastr.error('Une erreur est survenue.', 'Erreur', {
            timeOut: 5000,
            progressAnimation: 'increasing',
          });
        }
      });
    } else {
      this.onLoad = false;
      this.toastr.error(
        'Veuillez correctement renseigner les champs.',
        'Erreur',
        {
          timeOut: 5000,
          progressAnimation: 'increasing',
        }
      );
    }
  }

  F_toggleShowPassword() {
    this.V_showPassword = !this.V_showPassword;
  }

  initForm() {
    this.signForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
