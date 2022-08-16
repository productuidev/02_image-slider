// Instance 생성
export default class ImageSlider {
  // Private Field (일부 변수만 private으로 사용)
  #currentPostion = 0; // 현재 슬라이드 위치
  #slideNumber = 0; // 슬라이드 개수
  #slideWidth = 0; // 슬라이드 너비

  // Public Field
  sliderWrapEl;
  sliderListEl;
  nextBtnEl;
  previousBtnEl;

  // 초기화해줄 element들을 constructor에 넣어서
  // class에서 instance를 생성할 때 실행시키도록 함
  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    // 이벤트 발생 시키기
    this.addEvent();
  }

  assignElement() {
    // slider-wrap을 먼저 탐색 후 sliderList, nextBtn, previousBtn을 탐색
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
  }

  // 초기화 : 슬라이드 개수
  initSliderNumber() {
    this.#slideNumber = this.sliderListEl.querySelectorAll('li').length;
  }

  // 초기화 : 슬라이드 너비 (초기값은 CSS에서 width:1000px이므로 clientWidth)
  initSlideWidth() {
    this.#slideWidth = this.sliderListEl.clientWidth;
  }

  // 초기화 : 슬라이더 리스트 너비
  // 슬라이드 리스트의 개수에 따라서 width를 설정해주는 로직으로 너비값 변경 시 다음 슬라이드로 교체
  // width에 static으로 8000px로 지정한 것은 100%으로 변경
  // 슬라이드 개수 * 슬라이더 너비
  initSliderListWidth() {
    this.sliderListEl.style.width = `${this.#slideNumber * this.#slideWidth}px`;
  }

  // 버튼 이벤트 : 클릭 시 오른쪽으로 이동 실행
  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
  }

  // 좌우 이동 : 너비값에 따른 이동 생각하기
  // sliderListEl가 left:-1000px이고 width가 7000px이면 다음 슬라이드가 보여진다고 할때
  // 슬라이드너비가 0이면 위치값이 0
  // 1이 되면 -1000 옮겨지고, 2이면 -2000 ... 8이면 -8000 옮겨져야 보여지게 됨
  // 현재 위치값에 슬라이더 너비를 곱한 후 마이너스를 주면 해당 슬라이드로 넘어감

  // 오른쪽 : 현재 위치값에서 +1
  moveToRight() {
    this.#currentPostion += 1;
    // 조건 : 경계값 처리 (마지막 슬라이드에서 다음으로 이동하면 첫번째로)
    if (this.#currentPostion === this.#slideNumber) {
      this.#currentPostion = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPostion
    }px`;
  }

  // 왼쪽 : 현재 위치값에서 -1
  moveToLeft() {
    this.#currentPostion -= 1;
    // 조건 : 경계값 처리 (첫번째 슬라이드에서 이전으로 이동하면 마지막으로)
    if (this.#currentPostion === -1) {
      this.#currentPostion = this.#slideNumber - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPostion
    }px`;
  }
}
