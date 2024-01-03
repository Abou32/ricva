import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NGX_SPINNER_SERVICE } from 'src/app/components/ngx-spinner.service';
import { LOADING } from 'src/app/components/utils';
import { AccountService } from 'src/app/controllers/account.service';
import { EntrepotService } from 'src/app/controllers/entrepot.service';

@Component({
  selector: 'app-entrepot-new',
  templateUrl: './entrepot-new.component.html',
  styleUrls: ['./entrepot-new.component.scss']
})
export class EntrepotNewComponent implements OnInit {
saveForm:FormGroup
V_User:any
  constructor(private accountService:AccountService,private spinner:NGX_SPINNER_SERVICE,private router:Router,private toastr:ToastrService,private formBuilder:FormBuilder,private entrepotService: EntrepotService) {
    this.initForm()
   }

  ngOnInit(): void {
    this.accountService.O_UserSession.subscribe((res) => {
      if(res != null)
      {
        this.V_User = res;

      }else{
        let data =  localStorage.getItem('userInfo')
        this.V_User = JSON.parse(data)
        console.log(this.V_User)

      }
    });
  }

  F_saveEntrepot()
  {
    this.saveForm.controls['userId'].setValue(this.V_User.id)

     LOADING(this.spinner,'Chargement').then(load=>{
    if(this.saveForm.valid)
    {
      load.present()
      this.entrepotService.F_saveEntrepot(this.saveForm.value).then((res) => {
        console.log(res)
        load.dismiss()
        if (res.statut == 200)
        {
          this.toastr.success('Enregistrement effectué.','Succès', {
            timeOut: 5000,
            progressAnimation:'increasing'
          });
          this.router.navigate(['dashboard/entrepot'])
        }else{
          this.toastr.error( 'Une erreur est survenue.','Erreur',{
            timeOut: 5000,
            progressAnimation:'increasing'
          });
        }
        console.log(res);
      });
    }else{
      this.toastr.error( 'Veuillez correctement renseigner les champs.','Erreur',{
        timeOut: 5000,
        progressAnimation:'increasing'
      });
    }
  })

   
  }

  initForm()
  {
    this.saveForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      superficie: [0, Validators.required],
      longitude: [0, Validators.required],
      latitude: [0, Validators.required],
      placer: ['', Validators.required],
      userId:['', Validators.required]
    })
  }
}
