import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { OrderPipe } from './order.pipe';
import { HomePageComponent } from './home-page/home-page.component';
import { MoviesDetailComponent } from './movie-detail/movie-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor} from './jwt.interceptor';
import { RegisterComponent } from './register/register.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    OrderPipe,
    HomePageComponent,
    MoviesDetailComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    MovieSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomePageComponent
      },
      {
        path: "movies",
        component: MovieListComponent
      },
      {
        path: "movies/:movieId",
        component: MoviesDetailComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "search",
        component: MovieSearchComponent
      }
    ])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
