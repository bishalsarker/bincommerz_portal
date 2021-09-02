import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Tag } from "../../interfaces/tag";
import { TagListService } from "../../services/tag-list.service";
import { TagsDataService } from "../../services/tags-data.service";

@Component({
  selector: "app-tags-list",
  templateUrl: "./tags-list.component.html",
  styleUrls: ["./tags-list.component.scss"],
})
export class TagsListComponent implements OnInit {
  tableData = new BehaviorSubject<Tag[]>([]);

  constructor(
    public tagListService: TagListService,
    public tagsDataService: TagsDataService
  ) {}

  ngOnInit() {}
}
