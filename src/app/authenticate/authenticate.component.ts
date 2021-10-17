import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateService } from '../authenticate.service';
import {User} from '../User';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  userForm: FormGroup;
  postData: object; 
  myResults: any;
  constructor(private fb: FormBuilder, private auth: AuthenticateService) { }

  ngOnInit(): void {
    this.initializeForm();
    
  }
  initializeForm(): void
  {
    this.userForm = this.fb.group({
      userId: 'test1',
      password: 'password1'
    })
  }
  onSubmit(){
    
    localStorage.removeItem('JWT');
    console.log('Authenticate');
    
    console.log('userForm');
    console.log(this.userForm);
    
    this.postData = this.userForm.value;
    console.log('postdata');
    console.log(this.postData);
    console.log(this.myResults);
    //this.myResults = this.auth.authenticateUser(this.userForm.value["userId"] , this.userForm.value["password"]);
    this.myResults = this.auth.authenticateUser(this.userForm.value["userId"] , this.userForm.value["password"]);
    this.myResults.subscribe(data=>{console.log(data);
      console.log(data["token"]);
    localStorage.removeItem('JWT');
    localStorage.setItem('JWT',data["token"]);
     });
    console.log("myResults");
    console.log(this.myResults);
  }

}
