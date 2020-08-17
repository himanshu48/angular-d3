import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-d3';
  constructor(private router:Router){}
  url:string

  onSelect(){
    this.router.navigateByUrl(this.url);
  }
}
