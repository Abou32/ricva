import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './controllers/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ricva';

  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit(): void {
    // let userInfo = localStorage.setItem('userInfo',null)
    this.accountService.O_UserSession.subscribe((res) => {
      if (res == null) {
        this.router.navigate['login'];
      }
    });
  }
}
