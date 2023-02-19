import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger, AnimationEvent } from '@angular/animations';

interface Item {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({ transform: 'scale(0.5' }),
        animate('300ms', style({ transform: 'scale(1)' }))
      ]),
      transition('visible => void', [
        style({ transform: 'scale(1)' }),
        animate('150ms', style({ transform: 'scale(0.5)' }))
      ]),
    ]),
    trigger('animation2', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('50ms', style({ opacity: 0.8 }))
      ])
    ])
  ]
})
export class GalleryComponent implements OnInit {



  constructor() { }

  
  showCount = true;
  galleryData: Item[] = [
    {
      imageSrc: '../../../assets/img/pexels-naim-benjelloun-2291344.jpg',
      imageAlt: '1'
    },
    {
      imageSrc: '../../../assets/img/pexels-elevate-1267320.jpg',
      imageAlt: '2'
    },
    {
      imageSrc: '../../../assets/img/pexels-valeria-boltneva-1833333.jpg',
      imageAlt: '3'
    },
    {
      imageSrc: '../../../assets/img/christine-isakzhanova-0IgN3TbE4rM-unsplash.jpg',
      imageAlt: '4'
    },
    {
      imageSrc: '../../../assets/img/pexels-pablo-macedo-845797.jpg',
      imageAlt: '5'
    },
    {
      imageSrc: '../../../assets/img/pexels-fu-zhichao-587739.jpg',
      imageAlt: '6'
    },
    {
      imageSrc: '../../../assets/img/pexels-anna-shvets-5953496.jpg',
      imageAlt: '7'
    },
    {
      imageSrc: '../../../assets/img/pexels-rodeo-6040717.jpg',
      imageAlt: '8'
    },
  ]

  previewImage = false;
  showMask = false;
  currentLightboxImage: Item = this.galleryData[0];
  currentIndex = 0;
  controls = true;
  totalImageCount = 0;

  ngOnInit(): void {
    this.totalImageCount = this.galleryData.length
  }

  onPreviewImage(index: number) {
    //show image
    this.showMask = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.galleryData[index]
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.showMask = false;
    }
  }

  onClosePreview() {
    this.previewImage = false;

  }

  prev() {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex > this.galleryData.length - 1) {
      this.currentIndex = 0;
    }
    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }

  next() {
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.galleryData.length - 1
    }
    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }

}
