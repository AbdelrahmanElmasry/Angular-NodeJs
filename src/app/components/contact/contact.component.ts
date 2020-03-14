import { Component, ViewChild,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SendMailService } from 'src/app/send-mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('contactForm') formValues;
  submitted = false;
  name : string;
  to : string;
  message : string;
  model : any;
  constructor(private toastr: ToastrService,private sendMailService: SendMailService) {}

  ngOnInit(): void {
  }
  showSuccess() {
    this.toastr.success('Message Sent!', 'Alert');
  }
  showError(msg) {
    this.toastr.error(msg, 'Error');
  }
  submitForm(){
    
    console.log(this.formValues);
    this.model = {
      name : this.name,
      to : this.to,
      message : this.message
    }
    if(!this.submitted){
      this.submitted = true;
      this.sendMailService.sendMessage(this.model).subscribe(data =>{
        this.showSuccess()
        this.formValues.resetForm();
        this.submitted = false;
        console.log(data)
      }, (error: any) => {
        this.showError("Message not sent");
        console.log('Error', error);
        this.submitted = false;
      });
    }else{
      this.showError("form already submitted");
    }
    
    

  }

}
