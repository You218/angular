import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navList = ["home","dashboard","contact","about","logout", "insights"];

  constructor(private router: Router, private auth : AuthService) {}

  navigateTo(route: string) {
    if(route== "logout"){
      this.auth.loggedOut();
      this.router.navigate([""]);

    }else{
    this.router.navigate([route]);
    }
  }
}
