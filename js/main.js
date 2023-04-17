// Preloader functions
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
  
function setCookie(name, value, options = {}) {
  
    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
}
   
function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
}

function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		console.log(template);
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}
  
function changeCounterClinic() {
  const firstItem = document.querySelector(".about__item__title.first__item");
  let valueFirst = 0;

  function div(val, by){
      return (val - val % by) / by;
  }
  
  function progressBarFirst() {
    resetProgressBarFirst();
  
    idFirst = setInterval(frameFirst, 24);
  
    function frameFirst() {
      if (valueFirst > 11400) {
        clearInterval(idFirst);
      } else {
        valueFirst += 100;
        firstItem.innerHTML = (div(valueFirst, 1000) > 1? div(valueFirst, 1000) : '')  + ' ' + valueFirst % 1000;
      }
    }
  }
  function resetProgressBarFirst() {
    valueFirst = 0;
    firstItem.innerHTML = valueFirst;
  }
  progressBarFirst()

  const secondItem = document.querySelector(".about__item__title.second__item");
  let valueSecond = 0;
  
  function progressBarSecond() {
    resetProgressBarSecond();
  
    idSecond = setInterval(frameSecond, 27);
  
    function frameSecond() {
      if (valueSecond > 109900) {
        clearInterval(idSecond);
      } else {
        valueSecond += 1000;
        secondItem.innerHTML = (div(valueSecond, 1000) > 1? div(valueSecond, 1000) : '')  + ' ' + '000';
      }
    }
  }
  function resetProgressBarSecond() {
    valueSecond = 0;
    secondItem.innerHTML = valueSecond;
  }
  progressBarSecond()

  const thirdItem = document.querySelector(".about__item__title.third__item");
  let valueThird = 0;
  
  function progressBarThird() {
    resetProgressBarThird();
  
    idThird = setInterval(frameThird, 140);
  
    function frameThird() {
      if (valueThird > 16) {
        clearInterval(idThird);
      } else {
        valueThird += 1;
        thirdItem.innerHTML = valueThird  + ' лет';
      }
    }
  }
  function resetProgressBarThird() {
    valueThird = 0;
    thirdItem.innerHTML = valueThird;
  }
  progressBarThird()
}

var block_show = false;
 
function scrollTracking(){
	if (block_show) {
		return false;
	}
 
	var wt = $(window).scrollTop();
	var wh = $(window).height();
	var et = $('.about__info').offset().top;
	var eh = $('.about__info').outerHeight();
	var dh = $(document).height();   
 
	if (wt + wh >= et || wh + wt == dh || eh + et < wh){
		block_show = true;
		
		setTimeout(() => {
            changeCounterClinic()
        }, 1000)
	}
}
 
$(window).scroll(function(){
	scrollTracking();
});
	
$(document).ready(function(){ 
	scrollTracking();
});

document.addEventListener("DOMContentLoaded", () => {
  // header animations 
  if (getCookie('loading') !== 'done') {
    document.querySelector('.overlay').style.display = 'none'
    document.querySelector('body').style.overflowX = 'hidden'
    const elem = document.querySelector(".loading__0__wrapper");
    const text = document.querySelector(".load__percent");
    let height = 108.9;
    let percent = 0;
  
    document.querySelector('.preloader').style.display = 'flex'
    
    function progressBar() {
      resetProgressBar();
    
      id = setInterval(frame, 30);
    
      function frame() {
        if (height < 0) {
          clearInterval(id);
        } else {
          height -= 1.1;
          percent++;
          elem.style.height = height + "px";
          text.innerHTML = percent + "%";
        }
      }
    }
    function resetProgressBar() {
      width = 108.9;
      percent = 0;
      elem.style.height = height + "px";
      text.innerHTML = percent + "%";
    }
    progressBar()
  
    setTimeout(()=> {
        document.querySelector('.preloader').style.transform = 'translateY(-100%)'
    }, 3500)
    setTimeout(()=> {
        document.querySelector('.preloader').style.display = 'none'
        document.querySelector('body').style.overflowX = 'auto'
    }, 4000)
    setTimeout(()=> {
      document.querySelector('.header').style.display = 'flex'
    }, 5000)
    setTimeout(()=> {
      document.querySelector('.header').style.opacity = '1'
    }, 5100)
    setTimeout(()=> {
      document.querySelector('.top__slider-wrapper').style.opacity = '1'
    }, 5500)
    setTimeout(()=> {
      document.querySelector('.header__man').style.opacity = '1'
    }, 6000)
    setTimeout(()=> {
      document.querySelector('.ceo__info').style.opacity = '1'
    }, 6500)
    setTimeout(()=> {
      document.querySelector('.main').style.opacity = '1'
      document.querySelector('.eclipse').style.opacity = '1'
    }, 7000)
    setTimeout(()=> {
      document.querySelector('.left__line__overlay').style.width = '0%'
      document.querySelector('.rigth__line__active__wrapper').style.width = '100%'
    }, 7500)
  } else {
    document.querySelector('.preloader').style.display = 'none'
    document.querySelector('body').style.overflowX = 'auto'
  
    setTimeout(()=> {
      document.querySelector('.overlay').style.opacity = '0'
    }, 1000)
    setTimeout(()=> {
      document.querySelector('.overlay').style.display = 'none'
      document.querySelector('.header').style.display = 'flex'
    }, 1500)
    setTimeout(()=> {
      document.querySelector('.header').style.display = 'flex'
    }, 1500)
    setTimeout(()=> {
      document.querySelector('.header').style.opacity = '1'
    }, 1600)
    setTimeout(()=> {
      document.querySelector('.top__slider-wrapper').style.opacity = '1'
    }, 2000)
    setTimeout(()=> {
      document.querySelector('.header__man').style.opacity = '1'
    }, 2500)
    setTimeout(()=> {
      document.querySelector('.ceo__info').style.opacity = '1'
    }, 3000)
    setTimeout(()=> {
      document.querySelector('.main').style.opacity = '1'
      document.querySelector('.eclipse').style.opacity = '1'
    }, 3500)
    setTimeout(()=> {
      document.querySelector('.left__line__overlay').style.width = '0%'
      document.querySelector('.rigth__line__active__wrapper').style.width = '100%'
    }, 4000)
  
  }
  
// elements animation

if (document.documentElement.clientWidth > 240) {

const observerProcess = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.porcess__overlay');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.width = '0%'
      }, 500)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
      square.style.width = '100%'
  });
});
observerProcess.observe(document.querySelector('.process'));

const observerAdvantages = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.adv__overlay');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.width = '0%'
      }, 500)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
      square.style.width = '100%'
  });
});
observerAdvantages.observe(document.querySelector('.advantages'));

const observerRating = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.rating__overlay');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.width = '0%'
      }, 500)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
      square.style.width = '100%'
  });
});
observerRating.observe(document.querySelector('.rating'));

const observerAboutH2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.about .h2__title');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.opacity = '1'
          square.style.transform = 'translateY(0px)'
      }, 100)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
    square.style.opacity = '0'
    square.style.transform = 'translateY(100px)'
  });
});
observerAboutH2.observe(document.querySelector('.about'));

const observerAboutDescription = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.about .block__description');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.opacity = '1'
          square.style.transform = 'translateY(0px)'
      }, 100)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
    square.style.opacity = '0'
    square.style.transform = 'translateY(100px)'
  });
});
observerAboutDescription.observe(document.querySelector('.about'));

const observerAboutInfo = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.about__info');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.opacity = '1'
          square.style.transform = 'translateY(0px)'
      }, 100)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
    square.style.opacity = '0'
    square.style.transform = 'translateY(100px)'
  });
});
observerAboutInfo.observe(document.querySelector('.about'));

const observerDoctorsH2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.doctors .h2__title');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.opacity = '1'
          square.style.transform = 'translateY(0px)'
      }, 100)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
    square.style.opacity = '0'
    square.style.transform = 'translateY(100px)'
  });
});
observerDoctorsH2.observe(document.querySelector('.doctors'));

const observerDoctorsDescription = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.doctors .block__description');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.opacity = '1'
          square.style.transform = 'translateY(0px)'
      }, 100)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
    square.style.opacity = '0'
    square.style.transform = 'translateY(100px)'
  });
});
observerDoctorsDescription.observe(document.querySelector('.doctors'));

const observerDoctrosGallery = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.doctors__gallery');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.opacity = '1'
          square.style.transform = 'translateY(0px)'
      }, 100)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
    square.style.opacity = '0'
    square.style.transform = 'translateY(100px)'
  });
});
observerDoctrosGallery.observe(document.querySelector('.doctors'));

const observerDoctrosMobile = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.doctors__mobile');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.opacity = '1'
          square.style.transform = 'translateY(0px)'
      }, 100)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
    square.style.opacity = '0'
    square.style.transform = 'translateY(100px)'
  });
});
observerDoctrosMobile.observe(document.querySelector('.doctors'));

const observerRatingH2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.rating .h2__title');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.opacity = '1'
          square.style.transform = 'translateY(0px)'
      }, 100)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
    square.style.opacity = '0'
    square.style.transform = 'translateY(100px)'
  });
});
observerRatingH2.observe(document.querySelector('.rating'));

const observerRatingWrapper = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.rating__wrapper');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.opacity = '1'
          square.style.transform = 'translateY(0px)'
      }, 100)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
    square.style.opacity = '0'
    square.style.transform = 'translateY(100px)'
  });
});

observerRatingWrapper.observe(document.querySelector('.rating'));
const observerContactsH2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.contacts .h2__title');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.opacity = '1'
          square.style.transform = 'translateY(0px)'
      }, 100)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
    square.style.opacity = '0'
    square.style.transform = 'translateY(100px)'
  });
});
observerContactsH2.observe(document.querySelector('.contacts'));

const observerContactsWrapper = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.contacts__wrapper');
    if (entry.isIntersecting) {
      setTimeout(() => {
          square.style.opacity = '1'
          square.style.transform = 'translateY(0px)'
      }, 100)
	  return; // если класс добавлен, продолжать уже не надо
    }
    // перемещение завершено, теперь надо удалить класс
    square.style.opacity = '0'
    square.style.transform = 'translateY(100px)'
  });
});
observerContactsWrapper.observe(document.querySelector('.contacts'));

}
  
// GSAP functions
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false
});

const tlGen = gsap.timeline({});



// Document functions
document.querySelector('.process .playvideo__btn').addEventListener('click', ()=> {
    document.querySelector('.process .playvideo__btn').style.display = 'none'
    document.querySelector('.process .video__wrapper img').style.display = 'none'
    document.querySelector('.process #process').play()
})

document.querySelector('.implant .playvideo__btn').addEventListener('click', ()=> {
    document.querySelector('.implant .playvideo__btn').style.display = 'none'
    document.querySelector('.implant .video__wrapper img').style.display = 'none'
    document.querySelector('.implant #implant').play()
})

if (document.documentElement.clientWidth > 768) {
    document.querySelector('.hidden__nav').addEventListener('click', ()=> {
        document.querySelector('body').style.overflowY = 'hidden'
        document.querySelector('.modal__menu').style.display = 'flex'
        setTimeout(()=> {
            document.querySelector('.modal__menu').style.transform = 'translateY(0)'
        }, 100)
    })

    document.querySelector('.modal__menu__close').addEventListener('click', ()=> {
        document.querySelector('.modal__menu').style.transform = 'translateY(-100%)'
        setTimeout(()=> {
            document.querySelector('.modal__menu').style.display = 'none'
            document.querySelector('body').style.overflowY = 'visible'
        }, 500)
    })
    
    document.querySelectorAll('.modal__nav__link').forEach((link)=> {
        link.addEventListener('click', ()=> {
            document.querySelector('.modal__menu').style.transform = 'translateY(-100%)'
            setTimeout(()=> {
                document.querySelector('.modal__menu').style.display = 'none'
                document.querySelector('body').style.overflowY = 'visible'
            }, 500)
        })
    })
}

if (document.documentElement.clientWidth <= 768) {
    document.querySelector('.hidden__nav').addEventListener('click', (e)=> {
        e.preventDefault()
        if (document.querySelector('.nav__menu').textContent === 'Меню') {
            document.querySelector('body').style.overflowY = 'hidden'
            document.querySelector('.modal__menu').style.display = 'flex'
            setTimeout(()=> {
                document.querySelector('.modal__menu').style.transform = 'translateY(0)'
                document.querySelector('.nav__menu').textContent = 'Закрыть'
                document.querySelector('.line.first').style.top = '31%'
                document.querySelector('.line.first').style.transform = 'rotate(45deg)'
                document.querySelector('.line.second').style.top = '31%'
                document.querySelector('.line.second').style.transform = 'rotate(-45deg)'
            }, 100)
            
        } else if (document.querySelector('.nav__menu').textContent === 'Закрыть') {
            document.querySelector('.modal__menu').style.transform = 'translateY(-100%)'
            setTimeout(()=> {
                document.querySelector('.modal__menu').style.display = 'none'
                document.querySelector('body').style.overflowY = 'visible'
                document.querySelector('.nav__menu').textContent = 'Меню'
                document.querySelector('.line.first').style.top = '50%%'
                document.querySelector('.line.first').style.transform = 'rotate(0deg)'
                document.querySelector('.line.second').style.top = '50%'
                document.querySelector('.line.second').style.transform = 'rotate(0deg)'
            }, 500)
            
        }
    })

    document.querySelectorAll('.modal__nav__link').forEach((link)=> {
        link.addEventListener('click', ()=> {
            document.querySelector('.modal__menu').style.transform = 'translateY(-100%)'
            setTimeout(()=> {
                document.querySelector('.modal__menu').style.display = 'none'
                document.querySelector('body').style.overflowY = 'visible'
                document.querySelector('.nav__menu').textContent = 'Меню'
            }, 500)
        })
    })
}

// TwentyTwenty plugin
$("#container1").twentytwenty();
$("#container2").twentytwenty();
$("#container3").twentytwenty();
$("#container4").twentytwenty();
$("#container5").twentytwenty();

// PHONE MASK
maskPhone('input[type="tel"]')

// Smooth scroll when link clicked
const $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 800);
    return false;
});

// SLICK SLIDER

$('.top__slider__container').slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    appendDots: '.top__slider__dots'
  });

if (document.documentElement.clientWidth > 768) {
    $('.gallery__container').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '.gallery .arrow__prev.slider__arrow',
        nextArrow: '.gallery .arrow__next.slider__arrow',
        draggable: false
    });
}

if (document.documentElement.clientWidth > 1080) {
    
    $('.rating__content').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        infinite: true,
        autoplay: false,
        appendDots: '.pagination__list',
        prevArrow: '.rating .arrow__prev.slider__arrow',
        nextArrow: '.rating .arrow__next.slider__arrow',
      });
}

if ((document.documentElement.clientWidth >= 768) && (document.documentElement.clientWidth <= 1080)) {   
    $('.rating__content').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        infinite: true,
        autoplay: false,
        appendDots: '.pagination__list',
        prevArrow: '.rating .arrow__prev.slider__arrow',
        nextArrow: '.rating .arrow__next.slider__arrow',
      });
}

if (document.documentElement.clientWidth < 768) {
    $('.gallery__container').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '.gallery .arrow__prev.slider__arrow',
        nextArrow: '.gallery .arrow__next.slider__arrow',
        draggable: false,
        swipe: false
    });
    
    $('.rating__content').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: true,
        autoplay: false,
        appendDots: '.pagination__list',
        prevArrow: '.rating .arrow__prev.slider__arrow',
        nextArrow: '.rating .arrow__next.slider__arrow',
    });

    $('.doctors__mob__wrapper').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '.doctors .arrow__prev.slider__arrow',
        nextArrow: '.doctors .arrow__next.slider__arrow',
        draggable: true
    });  

      
}


// Doctors list functions 

document.querySelector('.doctor__item.one').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.one').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Ануфриев Сергей Владимирович'
        document.querySelector('.doctor__spec').textContent = 'врач стоматолог-ортопед'
        document.querySelector('.doctor__photo img').src = 'img/doc__1.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text">С детства я восхищался врачами-стоматологами и повзрослев, осознал, как важна эта профессия. больше я Погружаясь в эту сферу медицины, я стал понимать, как люди боятся именно стоматологов. И вот, я решил искоренить эту проблему, даря пациентам заботу и надежду на прекрасный результат.</div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '7.14%'
})
document.querySelector('.doctor__item.two').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.two').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Аскаров Альберт Рашидович'
        document.querySelector('.doctor__spec').textContent = 'врач стоматолог-ортопед'
        document.querySelector('.doctor__photo img').src = 'img/doc__2.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text"></div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '14.28%'
})
document.querySelector('.doctor__item.four').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.four').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Галиаскаров Наиль Дамирович'
        document.querySelector('.doctor__spec').textContent = 'врач стоматолог-хирург-имплантолог'
        document.querySelector('.doctor__photo img').src = 'img/doc__4.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text"></div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '28.56%'
})
document.querySelector('.doctor__item.five').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.five').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Ганиев Рустам Вячеславович'
        document.querySelector('.doctor__spec').textContent = 'врач стоматолог-ортопед'
        document.querySelector('.doctor__photo img').src = 'img/doc__5.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text">Почему выбор пал на профессию стоматолога? Все просто, я люблю дарить людям улыбки!</div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '35.7%'
})
document.querySelector('.doctor__item.six').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.six').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Дианов Андрей Юрьевич'
        document.querySelector('.doctor__spec').textContent = 'заведующий филиалом на Менделеева, 170 врач стоматолог-ортопед'
        document.querySelector('.doctor__photo img').src = 'img/doc__6.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text">Я с первого класса знал с какой профессией свяжу свою жизнь.... Врач стоматолог - мечта моего детства, и она сбылась</div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '42.84%'
})
document.querySelector('.doctor__item.seven').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.seven').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Дианов Дмитрий Юрьевич'
        document.querySelector('.doctor__spec').textContent = 'врач стоматолог-хирург-имплантолог'
        document.querySelector('.doctor__photo img').src = 'img/doc__7.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text">У каждого из нас свой жизненный путь! Мой отец врач - стоматолог привил мне с самого детства уважение к этой благородной профессии и любовь к своим пациентам. </div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '49.98%'
})
document.querySelector('.doctor__item.eight').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.eight').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Каримова Ирина Алексеевна'
        document.querySelector('.doctor__spec').textContent = 'врач стоматолог-ортопед'
        document.querySelector('.doctor__photo img').src = 'img/doc__8.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text"></div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '57.12%'
})
document.querySelector('.doctor__item.nine').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.nine').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Кутушев Марат Раисович'
        document.querySelector('.doctor__spec').textContent = 'врач стоматолог-ортопед'
        document.querySelector('.doctor__photo img').src = 'img/doc__9.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text">Помню, в 3 классе на уроке природоведение проходили строение человека! Уже тогда я понял, чем хочу заниматься.</div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '64.26%'
})
document.querySelector('.doctor__item.ten').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.ten').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Мамоян Усо Карямович'
        document.querySelector('.doctor__spec').textContent = 'заведующий филиалом Айская, 20 врач стоматолог-хирург-имплантолог'
        document.querySelector('.doctor__photo img').src = 'img/doc__10.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text"></div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '71.4%'
})
document.querySelector('.doctor__item.eleven').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.eleven').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Орипов Назир Абдугафарович'
        document.querySelector('.doctor__spec').textContent = 'врач стоматолог-ортопед'
        document.querySelector('.doctor__photo img').src = 'img/doc__11.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text"></div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '78.54%'
})
document.querySelector('.doctor__item.twelve').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.twelve').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Хамматшин Данис Нафисович'
        document.querySelector('.doctor__spec').textContent = 'врач стоматолог-хирург-имплантолог'
        document.querySelector('.doctor__photo img').src = 'img/doc__12.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text"></div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '85.68%'
})
document.querySelector('.doctor__item.thirteen').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.thirteen').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Хасанов Динислам Миргалиевич'
        document.querySelector('.doctor__spec').textContent = 'врач стоматолог-хирург-имплантолог'
        document.querySelector('.doctor__photo img').src = 'img/doc__13.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text">Моя профессия — мой образ жизни. Считаю, что в медицине нет мелочей, и очень важен индивидуальный подход. Я убеждён — относиться к людям надо так, как хочешь, чтобы относились к тебе.</div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '92.82%'
})
document.querySelector('.doctor__item.fourteen').addEventListener('click', ()=> {
    document.querySelectorAll('.doctor__item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector('.doctor__item.fourteen').classList.add('active')
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Шарипов Ирек Фаритович'
        document.querySelector('.doctor__spec').textContent = 'врач стоматолог-ортопед'
        document.querySelector('.doctor__photo img').src = 'img/doc__14.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text"></div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
    document.querySelector('.overline').style.width = '100%'
})

// Modal video functions
document.querySelectorAll('.faq__item').forEach((item)=> {
    item.addEventListener('click', () => {
        document.querySelector('.video__modal').style.display = 'flex'
        setTimeout(()=> {
            document.querySelector('.video__modal').style.opacity = 1
        }, 500)
    })
})

document.querySelectorAll('.rating__item').forEach((item)=> {
    item.addEventListener('click', () => {
        document.querySelector('.video__modal').style.display = 'flex'
        setTimeout(()=> {
            document.querySelector('.video__modal').style.opacity = 1
        }, 500)
    })
})

document.querySelector('.modal__close__btn').addEventListener('click', ()=> {
    document.querySelector('.video__modal').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.video__modal').style.display = 'none'
    }, 500)
})

setCookie('loading', 'done')

});