import { Component ,Input} from '@angular/core';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbAlertConfig]
})
export class AppComponent {
  title = 'card-email';
  @Input() public alerts: Array<string> = [];
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  constructor(private http:HttpClient,private toastr: ToastrService) {
    
  }
  ngOnInit(){
    this.http.get('https://api.github.com/users?per_page=10').subscribe(data=>{
      console.log(data);
    })
  }
}
