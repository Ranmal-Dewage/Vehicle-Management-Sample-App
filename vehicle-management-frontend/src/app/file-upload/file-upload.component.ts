import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  private fileUrl: string = "http://localhost:3000/file-upload";

  constructor(private http: HttpClient, private notifierService: NotifierService) { }

  ngOnInit(): void {
  }

  uploadFile(event: any, form: any): void {

    const file: File = event.target[0].files[0];

    if (file) {

      const formData = new FormData();
      formData.append("userFile", file);

      this.http.post(this.fileUrl, formData)
        .subscribe(
          (response) => {

            console.log(response);
            form.resetForm()
            this.notifierService.notify("success", "File Uploaded Sucessfully for Processing");

          },
          (error: HttpErrorResponse) => {

            console.log(error);
            form.resetForm()
            this.notifierService.notify("error", error.error.message);

          }
        )
    }

  }
  

}
