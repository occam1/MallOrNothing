import { HttpClient, HttpHeaders } from '@angular/common/Http';
import { Injectable, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService implements OnInit{
 user: User;
postData: string ;
stuff: any ;
headers={
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
}

  constructor(private http: HttpClient) { 
   
  }

  ngOnInit(){

  }
  public authenticateUser(userId: string, password: string)
  {
    const headers = new HttpHeaders()
            .set("Content-Type", "application/JSON");
            console.log('In Authenticate Service');
     console.log(headers);
     this.postData = '{"userId":"' + userId + '","password":"' + password + '"}';

     console.log(this.postData);
     
     return  this.http.post<string>('http://localhost:4200/api/user/authenticate/',
                  this.postData,this.headers);
  }
  public authenticateUser1(userId: string, password: string)
  {
    const headers = new HttpHeaders()
            .set("Content-Type", "application/JSON");
     console.log('In Authenticate Service');
     console.log(headers);
     this.postData = '{"userId":"' + userId + '","password":"' + password + '"}';

     console.log(this.postData);
     
     return  this.http.post<string>('http://localhost:4200/api/user/authenticate/',
                  this.postData,this.headers)
                  .toPromise().then(data=>{console.log(data);
                    console.log(data["token"]);
                  localStorage.removeItem('JWT');
                  localStorage.setItem('JWT',data["token"]);
                   });
  }
}
