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

  if (getCookie('loading') !== 'done') {
    const elem = document.querySelector(".loading__0__wrapper");
    const text = document.querySelector(".load__percent");
    let height = 110;
    let percent = -1;

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
      width = 110;
      percent = -1;
      elem.style.height = height + "px";
      text.innerHTML = percent + "%";
    }
    progressBar()

    setTimeout(()=> {
        document.querySelector('.preloader').style.transform = 'translateY(-100%)'
    }, 3500)
    setTimeout(()=> {
        document.querySelector('.preloader').style.display = 'none'
    }, 4000)
  } else {
    document.querySelector('.preloader').style.display = 'none'
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
document.addEventListener("DOMContentLoaded", () => {  
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
            }, 100)
            
        } else if (document.querySelector('.nav__menu').textContent === 'Закрыть') {
            document.querySelector('.modal__menu').style.transform = 'translateY(-100%)'
            setTimeout(()=> {
                document.querySelector('.modal__menu').style.display = 'none'
                document.querySelector('body').style.overflowY = 'visible'
                document.querySelector('.nav__menu').textContent = 'Меню'
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

// PHONE MASK
maskPhone('.form__input')

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

if ((document.documentElement.clientWidth > 768) && (document.documentElement.clientWidth <= 1080)) {   
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
        draggable: false
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
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Доктор 1: ФИО'
        document.querySelector('.doctor__spec').textContent = 'Доктор 1: Специальность'
        document.querySelector('.doctor__photo img').src = 'img/doctor__hasanov.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text">Доктор 1: Описание</div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
})
document.querySelector('.doctor__item.two').addEventListener('click', ()=> {
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Доктор 2: ФИО'
        document.querySelector('.doctor__spec').textContent = 'Доктор 2: Специальность'
        document.querySelector('.doctor__photo img').src = 'img/doctor__hasanov.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text">Доктор 2: Описание</div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
})
document.querySelector('.doctor__item.three').addEventListener('click', ()=> {
    document.querySelector('.doctor__info').style.opacity = 0
    setTimeout(()=> {
        document.querySelector('.doctor__fio').textContent = 'Доктор 3: ФИО'
        document.querySelector('.doctor__spec').textContent = 'Доктор 3: Специальность'
        document.querySelector('.doctor__photo img').src = 'img/doctor__hasanov.png'
        document.querySelector('.doctor__profile').innerHTML = ''
        document.querySelector('.doctor__profile').insertAdjacentHTML('afterBegin', '<div class="doctor__text">Доктор 3: Описание</div>')
    }, 500)
    setTimeout(()=> {
        document.querySelector('.doctor__info').style.opacity = 1
    }, 600)
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