import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent {
  reportUrl: string = 'http://localhost:4200/report'; //URL to load the report

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //report URL (fetching it from the backend)
    this.reportUrl = 'http://localhost:4200/report';
    //this.reportUrl = 'http://localhost:8080/api/generate-report';

    console.log(this.reportUrl);
  }
}
