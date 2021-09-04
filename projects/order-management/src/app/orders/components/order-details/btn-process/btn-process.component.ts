import { Component, Input, OnInit } from "@angular/core";
import { Process } from "projects/order-management/src/app/processes/interfaces/process";
import { ProcessDataService } from "projects/order-management/src/app/processes/services/process-data.service";
import { OrderDataService } from "../../../services/order-data.service";

@Component({
  selector: "app-btn-process",
  templateUrl: "./btn-process.component.html",
  styleUrls: ["./btn-process.component.scss"],
})
export class BtnProcessComponent implements OnInit {
  @Input() processModel: Process;

  constructor(
    private orderService: OrderDataService,
    private processDataService: ProcessDataService
  ) {}

  ngOnInit() {}

  changeStatus(): void {
    this.orderService.updateProcess(this.processModel).subscribe(() => {
      location.reload();
    });
  }
}
