import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : any = ''
  password : any = ''
  invalidLogin = false
  constructor(private router: Router, private loginService: AuthenticateService) { }
  

  ngOnInit() {
  }
  checkLogin(username,password) {
    this.username = username
    this.password = password
    console.log(username + password);
    (this.loginService.authenticate(this.username, this.password).subscribe(
      data => {
        if(data == "true"){
          this.router.navigate(['/mainpage'])
          this.invalidLogin = false
        }else{
            this.loginService.logOut();
          
        }

      }
    )
    );

  }

}
