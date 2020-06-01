import { Paginator } from './../../model/paginator.model';
import { UserFilter } from './../../filters/user-filter';
import { CustomEvents } from './../../constants/custom.events';
import { EventService } from './../../services/event.service';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private eventService: EventService;
  public users: User[];
  private filter: UserFilter;
  private paginator: Paginator;
  private loading: boolean;
  private listSub: Subscription;
  private noResults: boolean;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.users = new Array<User>();
    this.paginator = new Paginator();
    this.getList();
  }

  ngOnDestroy() {
    this.eventService.removeListener(CustomEvents.REMOVE_OBJECT_CONFIRM);
  }

  getList(filter?) {
    if (filter) {
      this.filter.page = 1;
      this.setPaginator();
    }

    this.users = new Array<User>();
    this.loading = true;
    this.listSub = this.userService.findAll(filter).subscribe((response) => {
      if (response.results.length > 0) {
        this.users = response.results;
        this.noResults = false;
        this.setPaginator(response, this.filter.page);
      } else {
        this.setPaginator();
        this.noResults = true;
      }
    }, (error) => {
      this.noResults = true;
      console.log(error);
      this.loading = false;
    }, () => {
      this.loading = false;
    });

  }

  setPaginator(response?: any, page?: number, limit?: number): void {
    if (response && !page) {
      page = 1;
      this.filter.page = 1;
    }

    if (!limit) {
      limit = 10;
      this.filter.limit = 10;
    }

    if (page) {
      this.paginator.pageSize = limit;
      this.paginator.pageNumber = page;
      this.paginator.totalResult = response.count;
      this.paginator.totalPages = Math.ceil(response.count / limit);
    } else {
      this.paginator.totalResult = 0;
      this.paginator.totalPages = 0;
      this.paginator.pageNumber = 1;
    }
  }

  clearFilter() { }

  newUser(user: User) { }

  removeUser(user: User) { }

  editUser(user: User) { }

}
