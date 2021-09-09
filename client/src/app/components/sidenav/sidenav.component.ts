import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MegaMenuItem, MenuItem, MessageService, SelectItem} from 'primeng/api';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  providers: [MessageService]
})
export class SidenavComponent implements OnInit {
  @Output() show: EventEmitter<any> = new EventEmitter();

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private router: Router,
              public http: HttpClient) { }

  ngOnInit(): void {
    this.show.emit(!this.authService.loggedIn());
  }

  getLogin(){
    return this.authService.loggedIn();
  }
  
  onLogoutClick(){
    this.authService.logout();
    window.location.reload();
    this.router.navigate(['/login']);
    this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    return false;
  }
}
