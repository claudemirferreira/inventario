import { NewUserComponent } from './new-user/new-user.component';
import { BasePaginatedResponse } from './../../base/base-paginated.response';
import { MatDialog } from '@angular/material/dialog';
import { RemoveComponent } from './../../base/dialog/remove/remove.component';
import { BaseComponent } from './../../base/base.component';
import { Paginator } from './../../model/paginator.model';
import { UserFilter } from './../../filters/user-filter';
import { CustomEvents } from './../../constants/custom.events';
import { EventService } from './../../services/event.service';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../model/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BaseComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private paginatorModel: Paginator;
  private listSub: Subscription;

  public users: User[];
  public userResponse: BasePaginatedResponse<User>;
  public usuarioSelecionado: User;
  public filter: UserFilter;
  public dataSource = new MatTableDataSource<User>();
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
    public dialog: MatDialog,
    private eventService: EventService,

  ) {
    super();
  }

  ngOnInit(): void {
    this.users = new Array<User>();
    this.paginatorModel = new Paginator();
    this.userResponse = new BasePaginatedResponse();

    this.paginator._intl.itemsPerPageLabel = 'Itens por página.';
    this.getList();
  }

  ngOnDestroy() {
    this.eventService.removeListener(CustomEvents.REMOVE_OBJECT_CONFIRM);
  }

  getList(filter?) {
    if (filter) {
      this.setPaginator(null, this.filter.page, this.filter.limit);
    } else {
      this.filter = new UserFilter();
    }

    this.users = new Array<User>();
    this.loading = true;
    this.listSub = this.userService.findAll(filter).subscribe((response) => {
      if (response.results) {
        this.userResponse = response;
        this.users = this.userResponse.results;
        this.dataSource.data = this.users;

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
    if (!page) {
      this.filter.page = 0;
    }

    if (!limit) {
      this.filter.limit = 10;
    }

    if (page) {
      this.paginatorModel.pageSize = limit;
      this.paginatorModel.pageNumber = page;
      this.paginatorModel.totalResult = this.userResponse.count;
      this.paginatorModel.totalPages = Math.ceil(this.userResponse.count / limit);
      this.paginatorModel.next = this.userResponse.next;
      this.paginatorModel.previus = this.userResponse.previous;
    }
  }

  openRemoveDialog(user: User): void {
    const dialogRef = this.dialog.open(RemoveComponent, {
      width: '250px',
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remover(result);
      }
    });
  }

  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '500px',
      data: { user: user, update: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createOrUpdate(result);
      }
    });
  }

  openNewUserDialog(): void {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '500px',
      data: { update: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.createOrUpdate(result);
      }
    });
  }

  remover(user: User) {
    this.userService.delete(user.codigo).subscribe((response) => {
      this.getList();
      this.toastr.success('Usuário removido com sucesso.');
    }, err => {
      this.openSnackBar('Error: Entre em contato com o suporte', 'OK');
      console.log(err);
    });
  }

  clearFilter() { 
    this.filter = new UserFilter();
  }

  createOrUpdate(user: User) {
    this.userService.createOrUpdate(user).subscribe((response) => {
      this.getList();
      if(user.codigo) {
        this.toastr.success('Usuário atualiado com sucesso.');
      } else {
        this.toastr.success('Usuário cadastrado com sucesso.');
      }
    }, err => {
      this.openSnackBar(err.error.message, 'OK');
      console.log(err);
    });
  }

  pageChanged($evt) {
    this.filter.limit = $evt.pageSize;
    this.filter.page = $evt.pageIndex;
    this.getList(this.filter);
  }

  usersFiltering() {
    this.getList(this.filter);
  }

}
