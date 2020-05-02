import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private FieldsList: FieldsService, private router: Router) { }

  error: string = null;
  resetLink : boolean = false;
  adminToken : string = null;

  forgotPass(form: NgForm) {
    this.error = null;

    let adminId = $("#adminId").val();
    if (adminId === "SG00681675") {
      //console.log(form.value);
      this.adminToken = 'SG_tkn_001';
      this.resetLink = true;
    }
    else {
      this.error = "Sorry!!! Admin Id not yet registred.";
    }


    //this.FieldsList.regerateRoport(form.value).subscribe(data => {
    //console.log(data);
    //this.router.navigateByUrl('/studentlogin');
    //form.reset();
    //}, err => {
    // console.log(err);
    //});

    //var generate_res = this.FieldsList.regerateRoport(form.value);
    //console.log("Renerate reporting is working.");
    //console.log("Returun value--->"+generate_res);
    //var obj_generate = JSON.parse(generate_res);
    //this.generate_response = obj_generate;
    //this.ReportLink = obj_generate.Message;

    /*this.error = null;
    console.log(form.value);
    this.auth.loginadmin(form.value).subscribe(data => {
      console.log('Response of login', data);
      if (data && data.description === 'Login successfull') {
        localStorage.setItem('userDetails' , JSON.stringify(data));
        this.router.navigateByUrl('/adminhomepage');
      }
      form.reset();
    }, err => {
      console.log(err);
      this.error = err.error.message;

    });*/

  }

  ngOnInit(): void {
  }

}
