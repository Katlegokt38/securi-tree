import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private authService : AuthService,
              private router: Router,
              public http: HttpClient) { }

  ngOnInit(): void {
    this.user = this.authService.getProfile();
    
  }

  

}
