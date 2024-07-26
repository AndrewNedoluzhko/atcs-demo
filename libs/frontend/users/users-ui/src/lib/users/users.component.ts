import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IUser } from '@mtfs/shared/domain';
import { UsersService } from '@mtfs/frontend/users-service';

@Component({
  selector: 'mtfs-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {

  users!:IUser[];
  displayedColumn: string[]= ['firstname', 'lastname', 'email', 'phoneNumber', 'role', 'createdAt'];
  dataSource = new MatTableDataSource<IUser>(this.users);
  
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatTable, {static: false}) table!: MatTable<IUser>;

  constructor(
    private usersService: UsersService,
    private router: Router
  ){}
  ngOnInit(){    
    this.fetchUsers();
  }

  fetchUsers(){
    this.usersService.getAll()
      .subscribe((data: IUser[])=> {
        this.users= data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort = this.sort;
      })    
  }
}
