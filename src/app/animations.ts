import { animate, animateChild, group, keyframes, query, style, transition, trigger } from "@angular/animations";
import { delay } from "rxjs";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomesPage => ResumePasge', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ left: '0%' }))
        ]),
      ]),
    ]),
    transition('ResusmePage => HomsePage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('500ms ease-out', style({ right: '100%' }))
          ]),
          query(':enter', [
            animate('500ms ease-out', style({ right: '0%' }))
          ]),
        ]),
      ]),
    transition('* => *', [
        query(':enter', [style({ opacity: 0})], {
          optional: true,
        }),
        query(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.2s', style({ opacity: 0})),
          ],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.5s', style({ opacity: 1})),
          ],
          { optional: true }
        ),
      ]),
    transition('ProjesctsPage <=> ConstactPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ right: '0%' }))
        ]),
      ]),
    ]),
  ]);