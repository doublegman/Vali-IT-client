import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginComponent } from './components/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {JwtModule} from '@auth0/angular-jwt';
import {FormsModule} from '@angular/forms';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import {FileUploadModule} from 'ng2-file-upload';
import { BottomComponent } from './components/bottom/bottom.component';
import { HomeComponent } from './components/home/home.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { ThemesComponent } from './components/themes/themes.component';
import { ThemeManagementComponent } from './components/theme-management/theme-management.component';
import { NewThemeComponent } from './components/new-theme/new-theme.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteComponent } from './components/note/note.component';
import { NoteManagementComponent } from './components/note-management/note-management.component';
import { NewNoteComponent } from './components/new-note/new-note.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'user', component: UserComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/new', component: NewCategoryComponent },
  { path: 'categories/:id', component: CategoryManagementComponent },
  { path: 'categories/:category_id/themes', component: ThemesComponent },
  { path: 'categories/:category_id/themes/new', component: NewThemeComponent },
  { path: 'categories/:category_id/themes/:theme_id', component: ThemeManagementComponent },
  { path: 'categories/:category_id/themes/:theme_id/notes', component: NotesComponent },
  { path: 'categories/:category_id/themes/:theme_id/notes/new', component: NewNoteComponent },
  { path: 'categories/:category_id/themes/:theme_id/notes/:note_id', component: NoteComponent },
  { path: 'categories/:category_id/themes/:theme_id/notes/:note_id/manage', component: NoteManagementComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterFormComponent,
    LoginComponent,
    TopMenuComponent,
    SidebarComponent,
    CategoriesComponent,
    CategoryManagementComponent,
    BottomComponent,
    HomeComponent,
    NewCategoryComponent,
    ThemesComponent,
    ThemeManagementComponent,
    NewThemeComponent,
    NotesComponent,
    NoteComponent,
    NoteManagementComponent,
    NewNoteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    ),
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/auth/*']
      }
    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
