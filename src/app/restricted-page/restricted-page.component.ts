import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-restricted-page',
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.scss']
})
export class RestrictedPageComponent implements OnInit {

  constructor(private _msalService: MsalService) { }

  ngOnInit(): void {
  }
  getName(): string | undefined{
    return this._msalService.instance.getActiveAccount()?.name
  }
} 
