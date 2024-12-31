import { Component} from '@angular/core';

@Component({
  selector: 'app-social-media-content',
  templateUrl: './social-media-content.component.html',
  styleUrls: ['./social-media-content.component.scss']
})
export class SocialMediaContentComponent {
  ngOnInit(){
   const cards = document.querySelectorAll('.social-media-card');
   const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Add class when the element is in view
      } else {
        entry.target.classList.remove('visible'); // Optional: Remove class when out of view
      }
    });
  });
  cards.forEach(card => observer.observe(card));
  }

}
