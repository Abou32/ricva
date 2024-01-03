import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { ALERT_QUESTION, LOADING } from 'src/app/components/utils';
import { EntrepotService } from 'src/app/controllers/entrepot.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGX_SPINNER_SERVICE } from 'src/app/components/ngx-spinner.service';
import { AccountService } from 'src/app/controllers/account.service';
@Component({
  selector: 'app-entrepot',
  templateUrl: './entrepot.component.html',
  styleUrls: ['./entrepot.component.scss'],
})
export class EntrepotComponent implements OnInit, OnDestroy {
  @ViewChild('myModal') myModal:  ElementRef<HTMLDivElement>;
  V_Entrepot: any[] = [];
  V_Details: any[] = [];
  dtoptions:DataTables.Settings = {}
  dtTrigger:Subject<any> = new Subject<any>();
  inter:any
  saveForm:FormGroup
  staticForm:FormGroup
  V_User:any
  constructor(private accountService:AccountService,private spinner:NGX_SPINNER_SERVICE,private formBuilder:FormBuilder,private router:Router,private toastr:ToastrService,private entrepotService: EntrepotService) {
    this.initForm()
  }

  ngOnInit(): void {
    this.dtoptions = {
      paging: true,
        pagingType: 'simple_numbers',
        lengthChange:false,
    }
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
    this.F_getEntrepot(this.V_User.id);
  }
  F_selectedData(data){
  this.inter = data
  this.loadForm(data)
  }

  F_deleteEntrepot(id) {
    ALERT_QUESTION(
      'Voulez vous supprimer?',
      'Vous vous apprêtez à supprimer cet entrepot.'
    ).then((res) => {
      if(res.isConfirmed)
      {
        this.entrepotService.F_deleteEntrepot(id).then(res=>{
          if (res.statut == 200)
          {
            this.F_getEntrepot(this.V_User.id);
            this.toastr.success('Suppression effectuée.','Succès', {
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
        })
      }
      console.log(res);
    });
  }

  F_updateEntrepot() {
    LOADING(this.spinner,'Chargement').then(load=>{
   
    if(this.saveForm.valid)
    {
      ALERT_QUESTION(
        'Voulez vous mettre à jour?',
        'Vous vous apprêtez à mettre à jour cet entrepot.'
      ).then((res) => {
        if(res.isConfirmed)
        {
          load.present()
          this.entrepotService.F_updateEntrepot(this.inter.id,this.saveForm.value).then(res=>{
            load.dismiss()
            if (res.statut == 200)
            {
              this.F_getEntrepot(this.V_User.id);
              this.toastr.success('Modification effectuée.','Succès', {
                timeOut: 5000,
                progressAnimation:'increasing'
              });
              this.closeModal()
            }else{
              this.toastr.error( 'Une erreur est survenue.','Erreur',{
                timeOut: 5000,
                progressAnimation:'increasing'
              });
            }
          })
        }
      });
    }else{
      this.toastr.error( 'Veuillez correctement renseigner les champs.','Erreur',{
        timeOut: 5000,
        progressAnimation:'increasing'
      });
    }
  })
  
   
  }
 
  F_getEntrepot(id:string) {
    LOADING(this.spinner,'Chargement').then(load=>{
      load.present()
      this.entrepotService.F_getEntrepot(id).then((res) => {
        load.dismiss()
        this.V_Entrepot = res;
        this.initializeDataTable()
        console.log(res);
      });
    })
   
  }

  filtrerTableau() {
    // var inputElement = document.getElementById('customFilterInput');
    // var inputValue = '';

    // // Vérifie que l'élément récupéré est bien un input
    // if (inputElement instanceof HTMLInputElement) {
    //   inputValue = inputElement.value.toLowerCase();
    // }
    // // Appliquer le filtre au DataTable
    // var table = $('#dtBasicExample').DataTable();
    // table.search(inputValue).draw();

    const inputElement = document.getElementById('customFilterInput') as HTMLInputElement;
    const inputValue = inputElement ? inputElement.value.toLowerCase() : '';
  
    const table = $('#dtBasicExample').DataTable();
    table.search(inputValue).draw();
  }
  initForm()
  {
    this.saveForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      superficie: [0, Validators.required],
      longitude: [0, Validators.required],
      latitude: [0, Validators.required],
      placer: ['', Validators.required],
      userId:[0, Validators.required]
    })
    this.staticForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      superficie: [0, Validators.required],
      longitude: [0, Validators.required],
      latitude: [0, Validators.required],
      placer: ['', Validators.required],
      userId:[0, Validators.required]
    })
  }
  F_ShowDetail(data)
  {
    this.staticForm.controls['libelle'].setValue(data.libelle)
    this.staticForm.controls['superficie'].setValue(data.superficie)
    this.staticForm.controls['longitude'].setValue(data.longitude)
    this.staticForm.controls['latitude'].setValue(data.latitude)
    this.staticForm.controls['placer'].setValue(data.placer)

    this.staticForm.get('libelle')?.disable();
    this.staticForm.get('superficie')?.disable();
    this.staticForm.get('longitude')?.disable();
    this.staticForm.get('latitude')?.disable();
    this.staticForm.get('placer')?.disable();

  }
  loadForm(data){
    this.saveForm.controls['libelle'].setValue(data.libelle)
    this.saveForm.controls['superficie'].setValue(data.superficie)
    this.saveForm.controls['longitude'].setValue(data.longitude)
    this.saveForm.controls['latitude'].setValue(data.latitude)
    this.saveForm.controls['placer'].setValue(data.placer)
  }
  closeModal() {
    const modal: any = this.myModal.nativeElement;
    if (modal) {
      const modalDismiss = modal.querySelector('[data-bs-dismiss="modal"]');
      if (modalDismiss) {
        modalDismiss.click(); // Simule un clic sur le bouton pour fermer la modal
      }
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
initializeDataTable()
{
  $(document).ready(function () {

    $('#dtBasicExample').DataTable({
      searching: true,
      drawCallback: function () {
        $('.paginate_button').addClass('btn btn-primary mx-1');
      },
    });
    $('.dataTables_filter').hide();

    $('.paginate_button').addClass('btn btn-primary mx-1');
    $('.dataTables_length').addClass('bs-select');
  });
}
}
