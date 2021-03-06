import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";


import { AuthService } from './auth/auth.service';
import * as schema from './schema/equipment.json';
/*
The @Component annotation helps provide metadata to Angular
that tells Angular the class is a component among other data 
as seen in the object passed as a parameter
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/*
extends means:
The new class is a child. It gets benefits coming with inheritance. 
It has all properties, methods as its parent. It can override some of 
these and implement new, but the parent stuff is already included.

implements means:
The new class can be treated as the same "shape", while it is not a child. 
It could be passed to any method where the Person is required, 
regardless of having different parent than Person

In the code below:
The implements keyword treats the OnInit class as an interface, 
that means AppComponent has to implement all the methods defined in OnInit, 
no matter if they have an implementation or not in OnInit. 
Also there are no calls to super methods in AppComponent

           STRING INTERPOLATION
In computer programming, string interpolation is the process of evaluating a 
string literal containing one or more placeholders, yielding a result in which 
the placeholders are replaced with their corresponding values.
*/
export class AppComponent implements OnInit {
/*
Variables declared within a method are "local variables"
Variables declared within the class not within any methods are "member variables"(global variables).
Variables declared within the class not within any methods and defined as static are "class variables"
*/

  private userSubscription: Subscription;
  public user: any;
  
/*
Whenever the html template is accessing something from the from the component it checks the
member/global variables by default.

You can only declare member/global variables directly in the class e.g 'userSubscription' and 'user'
Assigning values can be done only inside a method, like a constructor, for example.
*/
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.registerSvgIcons()
  }

  public ngOnInit() {

    // init this.user on startup
    this.authService.me().subscribe(data => {
      this.user = data.user;
    });

    // update this.user after login/register/logout
    this.userSubscription = this.authService.$userSource.subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.signOut();
    this.navigate('');
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

  ngOnDestroy() { 
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  registerSvgIcons() {
    [
      'close',
      'add',
      'add-blue',
      'airplane-front-view',
      'air-station',
      'balloon',
      'boat',
      'cargo-ship',
      'car',
      'catamaran',
      'clone',
      'convertible',
      'delete',
      'drone',
      'fighter-plane',
      'fire-truck',
      'horseback-riding',
      'motorcycle',
      'railcar',
      'railroad-train',
      'rocket-boot',
      'sailing-boat',
      'segway',
      'shuttle',
      'space-shuttle',
      'steam-engine',
      'suv',
      'tour-bus',
      'tow-truck',
      'transportation',
      'trolleybus',
      'water-transportation',
    ].forEach((icon) => {
      this.matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`))
    });
  }

}
