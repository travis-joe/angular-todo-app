import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component';
import {TodoDataService} from './todo-data.service';
import {SessionService} from './session.service';
import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import { TodosComponent } from './todos/todos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListHeaderComponent,
    TodoListComponent, TodoListItemComponent,
    TodoListFooterComponent,
    TodosComponent,
    PageNotFoundComponent,
    SignInComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule],
  providers: [TodoDataService, SessionService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
