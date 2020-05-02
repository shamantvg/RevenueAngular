import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as $ from "jquery";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { FieldsService } from '../fields.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from '../excel.service';
//import { DataTablesModule } from 'angular-datatables';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularMaterialModule } from '../angular-material.module';
import swal from 'sweetalert';
import * as XLSX from 'xlsx';
import { BnNgIdleService } from 'bn-ng-idle';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { interval, Subscription } from 'rxjs';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');



Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
HC_exporting(Highcharts);

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {



  constructor(private FieldsList: FieldsService, private router: Router, private excelService: ExcelService
    , private http: HttpClient, private modalService: BsModalService, private bnIdle: BnNgIdleService) {



  }

  

 

  public options: any = {
    chart: {
      type: 'bar',
      height: 500
    },
    title: {
      text: 'Revenue Analytics'
    },
    credits: {
      enabled: false
    },
    series: [
    ],
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total consumption'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    }
  }

  
 togglrMy(classname,event : Event) {
  
  //alert("in"+classname);
  //$(this).parents("tr").next().slideToggle();
  $("."+classname).slideToggle();
  this.sign =  $("#"+classname).text();
  console.log("html--->"+this.sign);
  if(this.sign === "+"){
    //alert("if");
    $("#"+classname).html("-");
  }else{
    //alert("else");
    $("#"+classname).html("+");
  } 
  
  // also tried this...
  // $(this).parents("table").nextAll(".details").slideToggle();
  return false;
}

toggleL2(classname,) {
  
  //alert("in"+classname);
  //$(this).parents("tr").next().slideToggle();
  $("."+classname).slideToggle();
  this.sign =  $("#"+classname).text();
  console.log("html--->"+this.sign);
  if(this.sign === "+"){
    //alert("if");
    $("#"+classname).html("-");
  }else{
    //alert("else");
    $("#"+classname).html("+");
  } 
  
  // also tried this...
  // $(this).parents("table").nextAll(".details").slideToggle();
  return false;
}


  modalRef: BsModalRef;
  error = null;
  AssetSel = null;
  addSalesTemplate_tag = true;
  grid_tag = true;
  editAssetForm_tag = null;
  assignAssetForm_tag = null;
  selectedRowIndex: number = -1;
  exportData = [];
  exportEmpAssetData = [];
  employeeList = [];
  SearilaNUm_selected = "";
  sign : any ;
  current_assiged_emp = null;
  customer_dept = "";
  type_sel = "";
  OEM = "";
  model = "";
  procure_date = "";
  warranty_start_date = "";
  warranty_end_date = "";
  amc_startdate = "";
  amc_endate = "";
  os_image = "";
  is_customer_compliant = "";
  dataString = null;
  import_error = null;
  import_errorMsg = "";
  cond_vall = true;

  graphVal = null;

  title = '';

  closeResult: string;


  subscription: Subscription;
  ngOnInit(): void {
    
    //this.graphData();
    this.setSessionTimeout();
    this.GetGrid();
    this.GetEmployeeList();
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    
  }
  

  applyFilter(event: Event) {
    console.log("event");
    const filterValue = (event.target as HTMLInputElement).value;
  }

  GetGrid(): any {

    this.grid_tag = true;

    //console.log("ngOnInit");
    // this.FieldsList.getAllAsset().subscribe((result) => {
    //   //console.log("result--->" + JSON.stringify(result));
    //   this.dataSource = new MatTableDataSource(result);
    //   this.grid_tag = true;
    //   // this.dataSource.paginator = this.paginator;
    //   // this.dataSource.sort = this.sort;


    //   //   setTimeout(() => this.dataSource.paginator = this.paginator);
    //   // setTimeout(() => this.dataSource.sort = this.sort);
    // });

    //let result = this.FieldsList.getEmps();
    //console.log("result--->" + JSON.stringify(result));
    //this.dataSource = new MatTableDataSource(result);



  }

  setSessionTimeout(): any {
    this.bnIdle.startWatching(900).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        //console.log('session expired');
        this.removeLocalStorage();
      }
    });
  }

  graphData(): any {

    this.FieldsList.getRevenueData().subscribe((result) => {

      //console.log(result);
      this.graphVal = true;
      this.options.xAxis = result.xRes;
      this.options.series = result.contentRes;
      Highcharts.chart('stackBar', this.options);
      

    }, err => {
      this.graphVal = true;
      Highcharts.chart('stackBar', this.options);
      
    });
    
  }

  removeLocalStorage(): any {
    localStorage.removeItem('token');
    //console.log('token removed');
    this.bnIdle.stopTimer();
    swal("You have been inactive for 15minute(s).You will be logged off automatically")
      .then((value) => {
        //swal(`The returned value is: ${value}`);
        this.router.navigateByUrl('/login');
      });
  }

  GetEmployeeList(): any {

    //console.log("GetEmployeeList");
    // this.FieldsList.GetEmployeeList().subscribe((result) => {
    //   this.employeeList = result;
    // }, err => {
    //   if (err instanceof HttpErrorResponse) {
    //     if (err.status === 401) {
    //       this.router.navigateByUrl('/login');
    //     }
    //     if (err.status === 500) {
    //       this.router.navigateByUrl('/login');
    //     }
    //   }
    // });
  }

  GetUniqEmployee(): any {
    // this.FieldsList.GetUniqEmployee(this.selectedRowIndex).subscribe((result) => {
    //   if (result[0].firstname) {
    //     this.current_assiged_emp = result[0].firstname + " " + result[0].lastname;
    //   } else {

    //     this.current_assiged_emp = "IT Dept";
    //   }

    // });
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'xlsx') {
      return true;
    }
    else {
      return false;
    }
  }




  logout() {
    localStorage.removeItem('token');
    this.bnIdle.stopTimer();
    this.router.navigateByUrl('/login');
  }
  reload_home() {
  }

  getApiResponse() {
    // return this.http.get<any>(url, {})
    //   .toPromise().then(res => {
    //     return res;
    //   });
    let res = [{
      name: 'John',
      data: [5, 3, 4, 7, 2]
    }, {
      name: 'Jane',
      data: [2, 2, 3, 2, 1]
    }, {
      name: 'Joe',
      data: [3, 4, 4, 2, 5]
    }];
    return res;
  }

  getXaxis() {
    // return this.http.get<any>(url, {})
    //   .toPromise().then(res => {
    //     return res;
    //   });
    let res = {
      categories: ['January', 'Febuary', 'March', 'April', 'May']
    };
    return res;
  }

  AddSalesFunc(Addform: NgForm) {
    console.log(Addform.value);
    console.log(Addform.value.SBU);
    swal("Success", "Thanks for uploading "+Addform.value.SBU +" forecast details", "success");
    Addform.resetForm();
    // this.FieldsList.addAssetFunc(Addform.value).subscribe((result) => {
    //   //console.log("assign success");
    //   swal("Success", "New Asset Details added successfully!!!", "success");
    //   this.GetGrid();
    //   this.reload_home();
    // }, err => {
    //   swal("Error", "Error while adding asset !!!", "error");
    //   //console.log(err);
    // });
  }

  onChangeFiscal(deviceValue) {
    console.log(deviceValue);
}

  SBUList = [
  {
    name: 'SBU D-EMEA ',
    id: '2'
  }
  ,
  {
    name: 'SBU D-IND ',
    id: '3'
  }
  ,
  {
    name: 'SBU D-APAC',
    id: '4'
  }
  ,
  {
    name: 'SBU D-APJ',
    id: '5'
  }
  ,
  {
    name: 'SBU D-BA',
    id: '6'
  }
  ];



  IBGList = [
  {
    name: 'IEUR',
    id: '1'
  }
  ,
  {
    name: 'DEL CC IND',
    id: '2'
  }
  ,
  {
    name: 'IBG APJ',
    id: '3'
  }
  ,
  {
    name: 'IBG TME2',
    id: '4'
  }
  ];

  IBUList = [{
    name: 'ICEU',
    id: '1'
  },
  {
    name: 'CC IND ',
    id: '2'
  }
  ,
  {
    name: 'INA',
    id: '3'
  }
  ,
  {
    name: 'TME11',
    id: '4'
  }
  ];

  CustomerList = [{
    name: 'AMAT',
    id: '1'
  },
  {
    name: 'DELL INDIA',
    id: '2'
  }
  ,
  {
    name: 'Telstra',
    id: '3'
  }
  ,
  {
    name: 'Optus',
    id: '4'
  }
  ];

  FiscalList = [{
    name: '2020',
    id: '1'
  },
  {
    name: '2021',
    id: '2'
  }
  ,
  {
    name: '2022',
    id: '3'
  }
  ,
  {
    name: '2023',
    id: '4'
  }
  ];


  OpportunityCategoryList = [{
  name: 'IT Revenue Forecast',
  id: '1'
},
{
  name: 'PFR Revenue Forecast',
  id: '2'
}
,
{
  name: 'BPS Revenue Forecast',
  id: '3'
}
];

account = [
  {
    "name": "Customer Account1",
    "accountId" : "1",
    "en_ml_0": "500",
    "en_ml_1": "400",
    "en_ml_2": "",
    "en_ml_3": "",
    "en_ml_4": "",
    "en_ml_5": "",
    "en_ml_6": "",
    "en_ml_7": "",
    "en_ml_8": "",
    "en_ml_9": "",
    "en_ms_0": "500",
    "en_ms_1": "400",
    "en_ms_2": "",
    "en_ms_3": "",
    "en_ms_4": "",
    "en_ms_5": "",
    "en_ms_6": "",
    "en_ms_7": "",
    "en_ms_8": "",
    "en_ms_9": "",
    "en_pl_0": "500",
    "en_pl_1": "400",
    "en_pl_2": "",
    "en_pl_3": "",
    "en_pl_4": "",
    "en_pl_5": "",
    "en_pl_6": "",
    "en_pl_7": "",
    "en_pl_8": "",
    "en_pl_9": "",
    "en_ps_0": "500",
    "en_ps_1": "350",
    "en_ps_2": "",
    "en_ps_3": "",
    "en_ps_4": "",
    "en_ps_5": "",
    "en_ps_6": "",
    "en_ps_7": "",
    "en_ps_8": "",
    "en_ps_9": "",
    "nn_ml_0": "500",
    "nn_ml_1": "400",
    "nn_ml_2": "",
    "nn_ml_3": "",
    "nn_ml_4": "",
    "nn_ml_5": "",
    "nn_ml_6": "",
    "nn_ml_7": "",
    "nn_ml_8": "",
    "nn_ml_9": "",
    "nn_ms_0": "500",
    "nn_ms_1": "300",
    "nn_ms_2": "",
    "nn_ms_3": "",
    "nn_ms_4": "",
    "nn_ms_5": "",
    "nn_ms_6": "",
    "nn_ms_7": "",
    "nn_ms_8": "",
    "nn_ms_9": "",
    "nn_pl_0": "500",
    "nn_pl_1": "450",
    "nn_pl_2": "",
    "nn_pl_3": "",
    "nn_pl_4": "",
    "nn_pl_5": "",
    "nn_pl_6": "",
    "nn_pl_7": "",
    "nn_pl_8": "",
    "nn_pl_9": "",
    "nn_ps_0": "500",
    "nn_ps_1": "300",
    "nn_ps_2": "",
    "nn_ps_3": "",
    "nn_ps_4": "",
    "nn_ps_5": "",
    "nn_ps_6": "",
    "nn_ps_7": "",
    "nn_ps_8": "",
    "nn_ps_9": ""
  },
  {
    "name": "Customer Account2",
    "accountId" : "2",
    "en_ml_0": "500",
    "en_ml_1": "400",
    "en_ml_2": "",
    "en_ml_3": "",
    "en_ml_4": "",
    "en_ml_5": "",
    "en_ml_6": "",
    "en_ml_7": "",
    "en_ml_8": "",
    "en_ml_9": "",
    "en_ms_0": "500",
    "en_ms_1": "300",
    "en_ms_2": "",
    "en_ms_3": "",
    "en_ms_4": "",
    "en_ms_5": "",
    "en_ms_6": "",
    "en_ms_7": "",
    "en_ms_8": "",
    "en_ms_9": "",
    "en_pl_0": "500",
    "en_pl_1": "300",
    "en_pl_2": "",
    "en_pl_3": "",
    "en_pl_4": "",
    "en_pl_5": "",
    "en_pl_6": "",
    "en_pl_7": "",
    "en_pl_8": "",
    "en_pl_9": "",
    "en_ps_0": "500",
    "en_ps_1": "300",
    "en_ps_2": "",
    "en_ps_3": "",
    "en_ps_4": "",
    "en_ps_5": "",
    "en_ps_6": "",
    "en_ps_7": "",
    "en_ps_8": "",
    "en_ps_9": "",
    "nn_ml_0": "500",
    "nn_ml_1": "400",
    "nn_ml_2": "",
    "nn_ml_3": "",
    "nn_ml_4": "",
    "nn_ml_5": "",
    "nn_ml_6": "",
    "nn_ml_7": "",
    "nn_ml_8": "",
    "nn_ml_9": "",
    "nn_ms_0": "500",
    "nn_ms_1": "400",
    "nn_ms_2": "",
    "nn_ms_3": "",
    "nn_ms_4": "",
    "nn_ms_5": "",
    "nn_ms_6": "",
    "nn_ms_7": "",
    "nn_ms_8": "",
    "nn_ms_9": "",
    "nn_pl_0": "500",
    "nn_pl_1": "400",
    "nn_pl_2": "",
    "nn_pl_3": "",
    "nn_pl_4": "",
    "nn_pl_5": "",
    "nn_pl_6": "",
    "nn_pl_7": "",
    "nn_pl_8": "",
    "nn_pl_9": "",
    "nn_ps_0": "500",
    "nn_ps_1": "400",
    "nn_ps_2": "",
    "nn_ps_3": "",
    "nn_ps_4": "",
    "nn_ps_5": "",
    "nn_ps_6": "",
    "nn_ps_7": "",
    "nn_ps_8": "",
    "nn_ps_9": ""
  }
]
;

}


