
import * as Swal from "sweetalert2";
import { NGX_SPINNER_SERVICE } from "./ngx-spinner.service";

// import { NGX_SPINNER_SERVICE } from './ngx-spinner.service';

export async function ALERT(_icon: "success" | "error" | "warning" | "info" | "question",_title,_text){
   return await Swal.default.fire({
        icon: _icon,
        title: _title,
        text: _text,
        showConfirmButton: true,
        confirmButtonText: "J'ai compris",
        confirmButtonColor:'var(--ion-color-primary)',
        heightAuto:false,
        didDestroy: () => {
            return new Promise((resolve) => {
               
                resolve(null);
            });
        }
      })
}
export async function ALERT_QUESTION(_title,_text){
    return await Swal.default.fire({
         title: _title,
         text: _text,
         showCloseButton: true,
         showDenyButton:true,
         denyButtonText:"Non",
         denyButtonColor:'var(--ion-color-primary-shade)',
         showConfirmButton: true,
         confirmButtonText: "Oui",
         confirmButtonColor:'var(--ion-color-primary)',
         reverseButtons: true,
         heightAuto:false,
         allowOutsideClick: false,
        allowEscapeKey: false,
         didDestroy: () => {
             return new Promise((resolve) => {
                
                 resolve(null);
             });
         }
       })
 }
export async function LOADING(NgxSpinnerService: NGX_SPINNER_SERVICE, _Message: string = "Chargement", _Spinner: string = "") {

    NgxSpinnerService.message(_Message);

    return NgxSpinnerService;
}