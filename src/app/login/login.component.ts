import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private FieldsList: FieldsService, private router: Router) { }

  error: string = null;

  adminLogin(form: NgForm) {


    this.error = null;

    let adminId = $("#adminId").val();
    let pswd = $("#pswd").val();
    //alert(b_date);
    //alert(reg_name);
    if ((adminId !== "") && (pswd !== "")) {
      //console.log(form.value);

      //console.log(Assignform.value);
      this.FieldsList.EmployeeAuth(form.value).subscribe((result) => {

        //console.log(result);

        if (result.loginAccess === "1" || result.loginAccess === 1) {
          localStorage.setItem('token', result.token);
          this.router.navigateByUrl('/home-page');
        } else {
          this.error = "Login access has been disabled.";
        }

      }, err => {
        //console.log(JSON.stringify(err));
        this.error = "Invalid User Id or Password.";
      });
    }
    else {
      this.error = "Invalid request.";
    }
  }


  ngOnInit(): any {
    this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    const userDetails = localStorage.getItem('token');
    if (userDetails) {
      this.FieldsList.CheckSessionToken().subscribe((result) => {
        this.router.navigateByUrl('/home-page');
        return true;
      }, err => {
        this.router.navigateByUrl('/login');
        return false;
      });
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
