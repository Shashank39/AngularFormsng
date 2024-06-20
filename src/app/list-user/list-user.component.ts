
import { RegistrationService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidate } from '../custom/password-validator';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../Model/UserModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {

  myId:any;
  public ListUser: UserModel[];
  list: UserModel;
  constructor(
    private fb: FormBuilder,
    private api: RegistrationService,
    private router: Router,

  ) {
    this.ClickedRow = function (index) {
      this.HighlightRow = index;
    };

    this.registrationForm.patchValue(
      this.router?.getCurrentNavigation()?.extras?.state?.data || {}
    );

  }
  HighlightRow: Number;
  ClickedRow: any;

  validPattern = '^[a-zA-Z_0-9]*';
  registrationForm = this.fb.group({
    id: uuidv4(),

    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    userName: ['', Validators.required],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validPattern),
        Validators.minLength(8),
      ],
    ],
    confirmPassword: ['', Validators.required],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
  },
  { validator: passwordValidate }
  );

  ngOnInit(): void {
    this.api.getAllUser().subscribe((data) => (this.ListUser = data));
    this.display();
  }
   display(){
    let formValue = JSON.parse(localStorage.getItem('formdata'))

  }


  addUser() {
    if (this.registrationForm.valid) {
      this.api.postForm(this.registrationForm.value).subscribe({
        next: () => {
          window.location.reload();
          alert('User added Successfully'); 
         
          
          
        },
      });
    
    }
    localStorage.setItem("formdata",JSON.stringify(this.registrationForm.value));
    this.update();
  
  }
  

  edit(id: string) {
    this.api
      .edit(id)
      .subscribe((data) => this.registrationForm.patchValue(data));
  }
  delete(id: string) {
  let response=confirm('Do you want to delete this record?');
  if(response==true){

    this.api.delete(id).subscribe((data) => {
      this.ListUser = this.ListUser.filter((x) => x.id !== id);
    });
  }}

  update() {
    this.api
      .update(
        this.registrationForm.controls.id.value,
        this.registrationForm.value
      )
      .subscribe((data: any) => {
        let y = this.ListUser.filter(
          (x) => x.id == this.registrationForm.controls.id.value
        )[0];
        let place = this.ListUser.indexOf(y);
        this.ListUser[place] = data;
      });
    
  }
  reset() {
    this.registrationForm.reset();
    this.registrationForm.controls.id.setValue(1);
  }





}
