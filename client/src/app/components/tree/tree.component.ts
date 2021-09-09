import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  progress: Boolean = true;
  user: any;
  files1: TreeNode[] = [];

  constructor(private authService : AuthService,
             private router: Router,
             public http: HttpClient) { }

  ngOnInit(): void {
    this.authService.getTree().subscribe((data:any) => {
      this.files1 = data.root;
      this.progress = false;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  expandAll(){
    this.files1.forEach( node => {
        this.expandRecursive(node, true);
    } );
  }

  collapseAll(){
      this.files1.forEach( node => {
          this.expandRecursive(node, false);
      } );
  }

    private expandRecursive(node:TreeNode, isExpand:boolean){
      node.expanded = isExpand;
      if (node.children){
          node.children.forEach( childNode => {
              this.expandRecursive(childNode, isExpand);
          });
      }
    }

}
