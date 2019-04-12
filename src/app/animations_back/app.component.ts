// import { Component, OnInit ,Input} from '@angular/core';
// import { OverlayContainer } from '@angular/material';
// import{ trigger,state,transition,style,animate ,keyframes} from '@angular/animations';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   animations:[
//     trigger('square',[
//       state('green', style({'background-color':'green','height':'100px','transform':'translateY(100%)'})),
//       state('red', style({'background-color':'red','height':'100px','transform':'translateY(-100%)'})),
//       transition('green =>red',animate('.8s cubic-bezier(0.39, 0.575, 0.565, 1)')),
//       transition('red =>green',animate(5000, keyframes([
//         style({transform: 'translateY(100%)'}),
//         style({transform: 'translateY(98%)'}),
//         style({transform: 'translateY(95%)'}),
//         style({transform: 'translateY(90%)'}),
//         style({transform: 'translateY(80%)'}),
//         style({transform: 'translateY(60%)'}),
//         style({transform: 'translateY(30%)'}),
//         style({transform: 'translateY(0%)'}),
//         style({transform: 'translateY(-10%)'}),
//         style({transform: 'translateY(-5%)'}),
//         style({transform: 'translateY(-2%)'}),
//         style({transform: 'translateY(0)'}),
//         style({transform: 'translateY(10%)'}),
//         style({transform: 'translateY(15%)'}),
//         style({transform: 'translateY(-15%)'}),
//         style({transform: 'translateY(-40%)'}),
//         style({transform: 'translateY(-80%)'}),
//         style({transform: 'translateY(-90%)'}),
//         style({transform: 'translateY(-100%)'}),

//       ]))),
//        ])
//   ]
// })
// export class AppComponent {
//   darkTheme = false;

//   currentState:string='red';

//   constructor(private oc: OverlayContainer){

//   }

//   changeState() {
//     this.currentState = this.currentState === 'green' ? 'red' : 'green';
//   }


//   OnInit(){

//   }

//   switchTheme(dark) {
//     this.darkTheme= dark;
//     this.oc.themeClass =dark? 'myapp-dark-theme':null;
//   }
// }
