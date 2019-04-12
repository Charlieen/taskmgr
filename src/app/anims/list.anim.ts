import{ trigger,state,transition,style,animate ,stagger ,group,query} from '@angular/animations';

/*
enter:   'void => *'
leave: '* => void'
*/
export const listAnimation = trigger('listAnim',[
  transition('* => *', [

    query(':enter', style({opacity:0}),{ optional: true }),
    query(':enter', stagger(100,[
      animate('1s', style({opactiy:1 }))
    ]),{ optional: true }),
    query(':leave', style({opacity:1}),{ optional: true }),
    query(':leave', stagger(100,[
      animate('1s', style({opactiy:0 }))
    ]),{ optional: true }),
  ])
]);
