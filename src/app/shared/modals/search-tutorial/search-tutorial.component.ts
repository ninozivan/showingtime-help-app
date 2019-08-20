import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-search-tutorial',
  templateUrl: './search-tutorial.component.html',
  styleUrls: ['./search-tutorial.component.scss']
})
export class SearchTutorialComponent implements OnInit {
  // @ViewChild('refslider', { static: false }) swiperInstance: IonSlides;
  @ViewChild('refslider', { static: true }) private swiperInstance: ElementRef<IonSlides>;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 40,
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      }
    }
  };

  buttonStates = {
    prev: false,
    next: true,
    close: false
  };

  totalNumOfSlides = null;

  constructor(private modalCtrl: ModalController) {}

  public slideChanged(event) {
    if (event && event.target && event.target.swiper) {
      if (event.target.swiper.isBeginning) {
        this.buttonStates.prev = false;
        this.buttonStates.next = true;
        this.buttonStates.close = false;
      } else if (event.target.swiper.isEnd) {
        this.buttonStates.prev = true;
        this.buttonStates.next = false;
        this.buttonStates.close = true;
      } else {
        this.buttonStates.prev = true;
        this.buttonStates.next = true;
        this.buttonStates.close = false;
      }
    }
  }

  public goNext(elReference) {
    if (elReference && elReference.el && elReference.el.swiper) {
      elReference.el.swiper.slideNext();
    }
  }
  public goPrev(elReference) {
    if (elReference && elReference.el && elReference.el.swiper) {
      elReference.el.swiper.slidePrev();
    }
  }

  public closeModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  ngOnInit() {
  }
}
