import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FieldsService } from './fields.service';

@Injectable({
  providedIn: 'root'
})
//@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private FieldsList: FieldsService, private router: Router){

  }
  canActivate() : boolean{
    if(this.FieldsList.loggedIn()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
