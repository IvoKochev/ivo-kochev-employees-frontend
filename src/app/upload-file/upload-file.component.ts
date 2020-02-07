import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UploadFileService} from './upload-file.service';
import {ResponseModel} from './response.model';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  constructor(private httpClient: HttpClient, private uploadFileService: UploadFileService) {
  }

  selectedFiles: FileList;
  currentFileUpload: File;
  responseObject: ResponseModel;
  errorMessage: string;

  upload() {
    this.responseObject = null;
    this.errorMessage = null;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadFileService.pushFileToStorage(this.currentFileUpload).subscribe(response => {
      // @ts-ignore
      if (response.body) {
        // @ts-ignore
        this.responseObject = JSON.parse(response.body);
      }
    }, error => {
      this.errorMessage = JSON.parse(error.error).message;
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
