import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID,NgZone } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  /**
   * Variable used to display the create account.
   * @type {boolean}
   */
  showScroll :boolean =false;
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        window.addEventListener('scroll', this.scrollEvent);
      });
    }
  }

  scrollEvent = (event: Event): void => {
    this.ngZone.run(() => {
      const scrollTop = (event.target as Document).documentElement?.scrollTop || 
      (event.target as HTMLElement).scrollTop || 
      document.documentElement.scrollTop || 
      document.body.scrollTop;
      this.showScroll = scrollTop >= 400 ? true : false;
    });
  };

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollEvent);
    }
  }
}
