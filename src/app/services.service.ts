import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ObserversModule } from '@angular/cdk/observers';
import { UserModel } from './Model/UserModel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {



  constructor(private httpClient: HttpClient) { }


postForm(data:any){
  return this.httpClient.post<any>("http://localhost:3000/registration_list/",data);
}
getForm(){
  return this.httpClient.get<any>("http://localhost:3000/registration_list/");
}
getAllUser():Observable<UserModel[]>{
  return this.httpClient.get<UserModel[]>("http://localhost:3000/registration_list/")

}


edit(id:string):Observable<UserModel>{
  return this.httpClient.get<UserModel>(`http://localhost:3000/registration_list/${id}`);
}
delete(id:string){
  return this.httpClient.delete(`http://localhost:3000/registration_list/${id}`);
}
update(id:string, list:UserModel){
  return this.httpClient.put(`http://localhost:3000/registration_list/${id}`,list);
}

}

