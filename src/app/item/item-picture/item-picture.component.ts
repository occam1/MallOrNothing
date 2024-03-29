import { HttpClient, HttpHeaders } from '@angular/common/Http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item-picture',
  templateUrl: './item-picture.component.html',
  styleUrls: ['./item-picture.component.css']
})
export class ItemPictureComponent implements OnInit {
 selectedFile : File = null;  
itemPictureForm: FormGroup;


  constructor(private http: HttpClient,private fb: FormBuilder) { }

  onFileChange(event)
  {
    this.selectedFile = <File>event.target.files[0];
  
  }
  ngOnInit()
  { 
    this.initializeForm();
  }
  initializeForm(): void
  {
    this.itemPictureForm = this.fb.group({
      itemId: 0,
      caption1: '',
      caption2: '',
      altText:  ''
    })
  }
  
  onFileUpload(){
    console.log('uploading');
    console.log(this.selectedFile.name)
    const fd = new FormData();
    fd.append('itemId', this.itemPictureForm.value["itemId"]);
    fd.append('altText', this.itemPictureForm.value["altText"]);
    fd.append('caption1', this.itemPictureForm.value["caption1"]);
    fd.append('caption2', this.itemPictureForm.value["caption2"]);
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:4200/api/Item/InsertItemIdPicture/', fd)
   .subscribe(data=>{console.log(data)},
   error => console.log(error));
   console.log('uploaded');
  }
}
