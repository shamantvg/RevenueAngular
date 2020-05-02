import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private FieldsList: FieldsService, private router: Router, private routerActive: ActivatedRoute) { }

  error: string = null;
  resetStatus: boolean = false;
  adminToken: string = null;
  adminId: string = null;
  AdminName: string = null;

  ResetPassword(form: NgForm) {
    this.resetStatus = false;
    this.error = null;

    //let adminId = $("#adminId").val();
    let pass = $("#pswd").val();
    let confir_pass = $("#confir_pass").val();
    if ((pass === '') || (confir_pass === '')) {
      this.error = "Both Passwords are mandatory.";
    } else if (pass !== confir_pass) {
      this.error = "Sorry!!! Confirm password entry is mismatching.";
    }
    else {
      this.resetStatus = true;
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
  ngOnInit() {
    this.routerActive.paramMap
      .subscribe(params => {
        let adminUniq = params.get('adminUniq');
        console.log("adminUniq---->"+adminUniq);
        // let adminDetails = this.FieldsList.getAdminDetails(adminUniq);
        // this.AdminName = adminDetails.name;
        // this.adminId = adminDetails.AdminId;
        // this.adminToken = adminDetails.AdminUniq;

        if (adminUniq === "SG00123") {
          this.AdminName = 'Shamant';
          this.adminId = 'SG00681675';
          this.adminToken = 'SG00123';
        }

      });

  }

}
