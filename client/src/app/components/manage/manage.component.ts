import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem, MessageService, SelectItem} from 'primeng/api';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  providers: [MessageService]
})
export class ManageComponent implements OnInit {
  state: any[] = [];
  doorName: any[] = [];
  displayEditDialog : Boolean = false;

  constructor(private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    public http: HttpClient) { 
      this.state = [
        {name: 'LOCKED', code: 'closed'},
        {name: 'UNLOCKED', code: 'open'}
     ];
  }

  UpdateForm = new FormGroup({
    door: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.authService.getDoors().subscribe((door:any) => {
      this.doorName = door.data;
    },
    err => {
      console.log(err);
      return false;
    });
  }

show(){
  this.displayEditDialog = true;
}

display(display:boolean, yes:boolean){
  if(!this.UpdateForm.valid) {
    this.messageService.add({severity:'error', summary:'Error', detail:'Please ensure that the input fields are valid.'});
  }
  else{
    this.displayEditDialog = display;
    if(yes){
      this.update();
    }
  }
}

  update(){
    const door = {
      id : this.UpdateForm.value.door._id,
      state : this.UpdateForm.value.state.code
    }
    this.authService.updateDoor(door).subscribe((data:any) => {
      if(data.success){
        this.UpdateForm.reset();
        this.messageService.add({severity:'success', summary:'Success', detail:data.msg});
      }
      else{
        this.messageService.add({severity:'error', summary:'Error', detail:data.msg});
      }
    });
  }

}
