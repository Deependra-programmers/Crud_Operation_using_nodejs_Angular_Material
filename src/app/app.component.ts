import { Component,ViewChild,OnInit, Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiserviceService } from './apiservice.service';
import {MatSortModule} from '@angular/material/sort';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud_operation';
  snackbarmsg:any;
  msg_color:any;
  displayedColumns: string[] = ['productID',  'productname', 'productcost', 'productdescription','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog :MatDialog,
    private service:ApiserviceService,
    ){}

  ngOnInit():void{
      //getting Data At runTime
      this.Alldata();
  }

  //Open Dialog For Add Product    

  openDialog() {
    this.dialog.open(DialogComponent,{
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.Alldata();
      }
    })
  } 

    //Open Dialog for Update Pass the Row in the UpdateDialogBox

  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
         this.Alldata();
      }
    })
    
  }

  // Delete Data in the Table

   deleteData(id:any){
   this.service.DeleteData(id).subscribe((res)=>{
      console.log(res,"deleteid==>");
      this.snackbarmsg='Product Delete successfully';
      this.msg_color='error';
      this.service.ShowNotification(this.snackbarmsg,this.msg_color);
      this.Alldata();
   })
  }

  //Getting Data From Database And Display data In Table

  Alldata(){
      this.service.getAllData().subscribe((res)=>{
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator =this.paginator;
        this.dataSource.sort=this.sort;
      })
  }
  
  // Filter for DialogBox

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
