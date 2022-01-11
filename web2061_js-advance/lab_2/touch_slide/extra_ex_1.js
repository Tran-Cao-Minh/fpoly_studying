// SCROLL SLIDE BY TOUCH
const slider = document.querySelector('.slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img');
  slideImage.addEventListener('dragstart', (e) =>
    e.preventDefault()
  );

  // touch events - mobile, tablet
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);

  // mouse events - desktop, pc
  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mouseleave', touchEnd);
  slide.addEventListener('mousemove', touchMove);
});

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;

    animationID = requestAnimationFrame(function animation() {
      setSliderPosition();
      if (isDragging) {
        requestAnimationFrame(animation);
      }
    });
    slider.classList.add('grabbing');
  }
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < (slides.length - 1)) {
    currentIndex++;

  } else if (movedBy > 100 && currentIndex > 0) {
    currentIndex--;
  }

  setPositionByIndex();
  slider.classList.remove('grabbing');
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate =
      prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') ?
    event.pageX :
    event.touches[0].clientX;
}

function setSliderPosition() {
  slider.style.transform =
    `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;

  setSliderPosition();
  setIndexDotChoosen();
}
// END SCROLL SLIDE BY TOUCH

// SCROLL SLIDE BY BUTTON 
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

nextBtn.addEventListener('click', () => {
  if (currentIndex < (slides.length - 1)) {
    currentIndex++;

  } else {
    currentIndex = 0;
  }
  setPositionByIndex();
})

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;

  } else {
    currentIndex = slides.length - 1;
  }
  setPositionByIndex();
})
// END SCROLL SLIDE BY BUTTON

// IMAGE INDEX DOT DISPLAY 
const indexDotContainer = document.querySelector('.index-dot-group');

slides.forEach(() => {
  const indexDotItem = document.createElement('li');
  indexDotItem.classList.add('index-dot-item');

  indexDotContainer.appendChild(indexDotItem);
});

const indexDotList = Array.from(document.querySelectorAll('.index-dot-item'));
indexDotList[0].classList.add('choosen');

indexDotList.forEach((indexDot, index) => {
  indexDot.addEventListener('click', () => {
    currentIndex = index;

    setPositionByIndex();
  })
});

function setIndexDotChoosen() {
  indexDotList.forEach(indexDot => {
    indexDot.classList.remove('choosen');
  });

  indexDotList[currentIndex].classList.add('choosen');
}
// END IMAGE INDEX DOT DISPLAY 

// AUTO NEXT SLIDE 
setInterval(() => {
  nextBtn.click();
}, 7000)
// END AUTO NEXT SLIDE 

