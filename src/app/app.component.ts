import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'microsoft-login';
  apiResponse:any;
  displayName:string |undefined
  constructor(private msalService: MsalService,private _httpClient:HttpClient) { }
  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res =>{
        if(res != null && res.account != null){
          this.msalService.instance.setActiveAccount(res.account)
        }
      }
    )
  }

  isLoggedIn() :boolean{

    return this.msalService.instance.getActiveAccount()!= null
  }
  login(){

     this.msalService.loginRedirect();
    // this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
    //    this.msalService.instance.setActiveAccount(response.account)
    // });
  }

  logout() {
    this.msalService.logout();
  }
  callProfile(){
    this._httpClient.get("https://graph.microsoft.com/v1.0/me").subscribe(resp =>{
      this.apiResponse=resp;
      console.log(resp)
    })
  }
  callEmails () {
    this._httpClient.get("https://graph.microsoft.com/v1.0/me/messages").subscribe( resp  => {
      this.apiResponse=resp
    })
  }

  sayHello () {
    this._httpClient.get("http://localhost:8080/hello").subscribe( resp  => {
      this.apiResponse=resp
    })
  }
  getImg () {
    this._httpClient.get("https://graph.microsoft.com/v1.0/me/photo/$value").subscribe( resp  => {
      this.apiResponse=resp
    })
  }
}
