import { NewUserComponent } from './new-user/new-user.component';
import { BasePaginatedResponse } from './../../base/base-paginated.response';
import { MatDialog } from '@angular/material/dialog';
import { RemoveComponent } from './../../base/dialog/remove/remove.component';
import { BaseComponent } from './../../base/base..component';
import { Paginator } from './../../model/paginator.model';
import { UserFilter } from './../../filters/user-filter';
import { CustomEvents } from './../../constants/custom.events';
import { EventService } from './../../services/event.service';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../model/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BaseComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private eventService: EventService;
  public users: User[];
  public usuarioSelecionado: User;
  private filter: UserFilter;
  private paginatorModel: Paginator;
  private listSub: Subscription;

  public loading: boolean;
  public noResults: boolean;


  displayedColumns: string[] = [
    'codigo',
    'nome',
    'username',
    'acao',
  ];

  constructor(
    private userService: UserService, 
    public dialog: MatDialog
  ) { 
    super();
  }

  ngOnInit(): void {
    this.users = new Array<User>();
    this.paginatorModel = new Paginator();
    this.getList();
  }

  ngOnDestroy() {
    this.eventService.removeListener(CustomEvents.REMOVE_OBJECT_CONFIRM);
  }

  getList(filter?) {
    if (filter) {
      this.filter.page = 1;
      this.setPaginator();
    } else {
      this.filter = new UserFilter();
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
      this.paginatorModel.pageSize = limit;
      this.paginatorModel.pageNumber = page;
      this.paginatorModel.totalResult = response.count;
      this.paginatorModel.totalPages = Math.ceil(response.count / limit);
    } else {
      this.paginatorModel.totalResult = 0;
      this.paginatorModel.totalPages = 0;
      this.paginatorModel.pageNumber = 1;
    }
  }

  openRemoveDialog(user: User): void {
    const dialogRef = this.dialog.open(RemoveComponent, {
      width: '250px',
      data: {user: user}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.remover(result);
      }
    });
  }

  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '500px',
      data: {user: user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)

      if(result) {
        this.update(result);
      }
    });
  }
 
  remover(user: User) {
    this.userService.delete(user.codigo).subscribe((response) =>  {
      this.getList();
      this.toastr.success('Usuário removido com sucesso.');
    }, err => {
      this.openSnackBar( 'Error: Entre em contato com o suporte', 'OK');
      console.log(err);
    });
  }

  clearFilter() { }
  
  update(user: User) {
    this.userService.update(user).subscribe((response) =>  {
      this.getList();
      this.toastr.success('Usuário atualiado com sucesso.');
    }, err => {
      this.openSnackBar( 'Error: Entre em contato com o suporte', 'OK');
      console.log(err);
    });
  }

}
