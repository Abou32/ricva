import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/controllers/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  V_User: any;
  constructor(private router: Router, private accountService: AccountService) {}

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

  F_logOut() {
    let userInfo = localStorage.setItem('userInfo', null);
    this.accountService.O_UserSession.next(userInfo);
  }
}
