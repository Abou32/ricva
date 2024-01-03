import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class NGX_SPINNER_SERVICE {

    private V_Message = "Chargement";
    // private V_Spinner = "line-spin-clockwise-fade";

    O_NgxSpinnerText: BehaviorSubject<string> = new BehaviorSubject("");

    constructor(
        private _ngxSpinnerService: NgxSpinnerService
    ) { }

    message(Message: string) {
        this.V_Message = Message;
        this.O_NgxSpinnerText.next(Message);
    }

    present() {
        this.message(this.V_Message);
        return this._ngxSpinnerService.show("MAIN-SPINNER", {
            template: '<app-custom-spinner></app-custom-spinner>',
            bdColor: "white",
            color:"#d18559",
            size: "medium",
            fullScreen: true,
            zIndex: 1000000
        });
    }

    dismiss() {
        this.O_NgxSpinnerText.next("Chargement");
        return this._ngxSpinnerService.hide("MAIN-SPINNER");
    }
}

