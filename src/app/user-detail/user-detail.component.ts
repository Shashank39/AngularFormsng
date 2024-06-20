import { Component, OnInit} from '@angular/core';
import { RegistrationService } from '../services.service';
import { UserModel } from '../Model/UserModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {


  constructor( private api:RegistrationService, private router:Router) {
    this.ClickedRow = function(index){
      this.HighlightRow = index;
  }
  }
  public ListUser!: UserModel[];
  list!:UserModel;
  HighlightRow : Number;
  ClickedRow:any;
  ngOnInit(): void {
    this.api.getAllUser().subscribe(data=>this.ListUser=data)
  }
  delete(id:string){
    alert("This record will get deleted");
    this.api.delete(id).subscribe(data=>{
      this.ListUser=this.ListUser.filter(x=>x.id!==id)
    })
  }

  edit(id:string){

    this.api.edit(id).subscribe(data=> {

      this.router.navigate(['/list-user'],  {state: {data: data }});

    });

  }







}
