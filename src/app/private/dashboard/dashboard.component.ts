import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ALERT_QUESTION } from 'src/app/components/utils';
import { AccountService } from 'src/app/controllers/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isOpenModal
 navBar!: ElementRef;

  constructor(private router:Router,private accountService:AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
    
  }
    // ALERT_QUESTION('Voulez vous enregistrer?','').then((res=>{
    //   console.log(res)
    // }))
  
  ngAfterViewInit(){
    const navBar = this.navBar.nativeElement.querySelectorAll('.side')
    const navLink = this.navBar.nativeElement.querySelectorAll('.nav-link')
    for (const navItem of navBar)
      navItem.addEventListener('click', this.F_changeNavMenuStyle.bind(this))

    for (const navItem of navLink)
      navItem.addEventListener('click', this.F_changeNavItemStyle.bind(this))
  }

 
  F_changeNavMenuStyle(event: any){
    const navBarItem = this.navBar.nativeElement.querySelectorAll('.nav-menu')
    this.F_onChangStyle(event, 'active', navBarItem)
  }
  F_changeNavItemStyle(event: any){
    const navBarItem = this.navBar.nativeElement.querySelectorAll('.nav-link')
    this.F_onChangStyle(event, 'nav-active', navBarItem)
  }
  F_onChangStyle(event: any, style:string, htmlDocumentObject: any) {
    this.removeStyle(style, htmlDocumentObject)
    event.srcElement.classList.toggle(style)
    this.isOpenModal = false
  }
  removeStyle(style: string, htmlDocumentObject: any) {
    for (const navItem of htmlDocumentObject)
      navItem.classList.contains(style) && navItem.classList.remove(style)
  }
}
