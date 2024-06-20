import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formPipe'
})
export class FormPipePipe implements PipeTransform {

  transform(firstName:String,lastname:String): String {
    return firstName+" "+lastname;
  }

}
