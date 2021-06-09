import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameListComponent } from './game-list/game-list.component';
import { OrderPipe } from './order.pipe';
import { HomePageComponent } from './home-page/home-page.component';
import { GamesDetailComponent } from './games-detail/games-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor} from './jwt.interceptor';
import { RegisterComponent } from './register/register.component';
import { GameSearchComponent } from './game-search/game-search.component';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    OrderPipe,
    HomePageComponent,
    GamesDetailComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    GameSearchComponent
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
        path: "games",
        component: GameListComponent
      },
      {
        path: "games/:gameId",
        component: GamesDetailComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "search",
        component: GameSearchComponent
      }
    ])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
