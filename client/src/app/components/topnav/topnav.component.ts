import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  user: any;

  constructor(private authService : AuthService,
              public http: HttpClient) { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
  }

  getLogin(){
    this.user = this.authService.getProfile();
    return this.authService.loggedIn();
    
  }

}
