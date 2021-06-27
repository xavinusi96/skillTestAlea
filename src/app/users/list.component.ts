import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;
    pag = [];

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => {
                this.users = users['data'];
                for(var i = 0; i < users['total']; i++) this.pag.push(i+1);
                console.log(this.users);
            });
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }

    changePage(numPag: any) {
        this.accountService.changePage(numPag)
            .pipe(first())
            .subscribe(users => {
                this.users = users['data'];
                for(var i = 0; i < users['total']; i++) this.pag.push(i+1);
                console.log(this.users);
            });

    }
}