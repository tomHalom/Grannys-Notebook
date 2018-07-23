import { trigger, state, style, transition,
    animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({
            opacity: 1,
            transform: 'translateX(0)'
          })),
          transition('void => *', [
            style({
              opacity: 0,
              transform: 'translateX(-100px) rotate(10deg)'
            }),
            animate(300)
          ]),
          transition('* => void', [
            animate(300, style({
              transform: 'translateX(100px) rotate(-10deg)',
              opacity: 0
            }))
          ]),
    ])
];

