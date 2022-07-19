import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  routesLink='post/create';
  status=true;
  productForm:any;
  snackbarmsg:any;
  msgforupdate:string='';
  msg_color:any;
 
  constructor(
     private formbuilder :FormBuilder,
     private service:ApiserviceService,
     private DialogRef:MatDialogRef<DialogComponent>,
     @Inject(MAT_DIALOG_DATA) public editData :any
     ) { }

  ngOnInit(): void {

    this.service.RefreshNeeded.subscribe((res)=>{
      this.service.getAllData();
    })

    this.productForm =new FormGroup({
      'name' :new FormControl('',Validators.required),
      'cost' :new FormControl('',Validators.required),
     'description':new FormControl('',Validators.required)
    })

     if(this.editData){
       this.status=false;
       this.productForm.controls['name'].patchValue(this.editData.name);
       this.productForm.controls['cost'].patchValue(this.editData.cost);
       this.productForm.controls['description'].patchValue(this.editData.description);
       this.service.getAllData();
     }
     
  }

  //add Product Method

  addProduct(){
      if(!this.editData){
        if(this.productForm.valid){
          this.service.createData(this.productForm.value).subscribe({
            next:(res)=>{
              this.productForm.reset();
              this.snackbarmsg='Product Add successfully';
              this.msg_color='success';
              this.DialogRef.close('save');
              this.service.ShowNotification(this.snackbarmsg,this.msg_color);
            },
            error:() =>{
              alert("Error");
            }
          })
        }
      }else{
        this.updateproduct();
  }

  //update Method
}
updateproduct(){
  this.msgforupdate='Only Cost Update *'
  console.log(this.status); 
  this.service.updateData(this.productForm.value,this.editData.id).subscribe((res)=>{
    this.snackbarmsg='Product update successfully';
    this.msg_color='success';
    this.DialogRef.close('update');
    this.service.ShowNotification(this.snackbarmsg,this.msg_color);
    this.productForm.reset();
    
  })
}

}