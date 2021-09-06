import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any;
  files1: TreeNode[] = [];

  constructor(private authService : AuthService,
        private router: Router,
        public http: HttpClient) { }

  ngOnInit(): void {

  }

  onDoors(){
    this.router.navigate(['/manage']);
  }
  onTree(){
    this.router.navigate(['/tree']);
  }

}