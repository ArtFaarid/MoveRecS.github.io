const carousel = document.querySelector('.carousel-inner');
const slides = document.querySelectorAll('.slides li');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const videoPlayer = document.querySelector('.video-player');
const videoIframe = document.querySelector('#video-iframe');
const closePlayerButton = document.querySelector('.close-player');


let currentIndex = 0;
let activeSlide = null;
let resetTimeout = null;

const videoUrls = {
  0: '<IFRAME SRC="https://www.2embed.cc/embed/tt16253418" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=100% HEIGHT=450 allowfullscreen></IFRAME>',
  1: '<iframe src="https://uqload.cc/embed-1712157984.html" width=100% height=450 frameborder="0" scrolling="no" allowfullscreen></iframe>',
  2: '<iframe class="metaframe rptss" src="https://player.repelis24.yt/embeds/763215" width=100% height=450 frameborder="0" scrolling="no" allowfullscreen=""></iframe>',
  3: '<iframe class="metaframe rptss" src="https://player.repelis24.yt/embeds/636706" width=100% height=450 frameborder="0" scrolling="no" allowfullscreen=""></iframe>',
  4: '<IFRAME SRC="https://www.youtube.com/embed/c1sadHWybW8?si=UaIXK3VwRVlE-lAv" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=100% HEIGHT=450 allowfullscreen></IFRAME>',
  5: '<IFRAME class="metaframe rptss" src="https://player.repelis24.yt/embeds/1139829" width=100% height=450 frameborder="0" scrolling="no" allowfullscreen=""></IFRAME>',
  6: '<IFRAME SRC="https://player.repelis24.yt/embeds/1019420" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=640 HEIGHT=360 allowfullscreen></IFRAME>',
  7: '<iframe class="metaframe rptss" src="https://player.repelis24.yt/embeds/1011985" width=100% height=450 frameborder="0" scrolling="no" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>',
};

function showSlide(n) {
  currentIndex = (currentIndex + n + slides.length) % slides.length;
  carousel.style.transform = `translateX(-${currentIndex * (240 + 20)}px)`;

  // Quitar la clase 'active' de todos los elementos <li>
  slides.forEach(slide => slide.classList.remove('active'));

  // Ocultar la información de la película
  slides.forEach(slide => slide.querySelector('.movie-info').style.display = 'none');
}
  
prevButton.addEventListener('click', (event) => {
  event.preventDefault(); // Evita el desplazamiento predeterminado
  resetActiveSlide(); // Restablecer el slide activo
  showSlide(-1); // Pasar -1 para mostrar el slide anterior
  clearTimeout(resetTimeout); // Limpiar el temporizador anterior
});
  
nextButton.addEventListener('click', (event) => {
  event.preventDefault(); // Evita el desplazamiento predeterminado
  resetActiveSlide(); // Restablecer el slide activo
  showSlide(1); // Pasar 1 para mostrar el siguiente slide
  clearTimeout(resetTimeout); // Limpiar el temporizador anterior
}); 
  
showSlide(currentIndex);

function handleImageClick(event) {
    const clickedElement = event.target;

    // Verificar si el evento se activó en la imagen
    if (clickedElement.tagName.toLowerCase() === 'img') {
        const clickedImage = clickedElement;
        const clickedSlide = clickedImage.closest('li');

        // Reiniciar todos los elementos <li>
        slides.forEach(slide => {
            resetImageSize(slide); // Reiniciar el tamaño de la imagen
            slide.querySelector('.movie-info').style.display = 'none';
        });

        // Activar el elemento <li> correspondiente a la imagen clickeada
        clickedSlide.classList.add('active');
        setTimeout(() => {
            clickedImage.style.width = '390px';
            clickedImage.style.height = '600px';
            clickedImage.style.filter = 'saturate(100%)';
            clickedSlide.querySelector('.movie-info').style.display = 'block';
        }, 10); // Retraso de 10 milisegundos para permitir la animación

        activeSlide = clickedSlide; // Almacenar la referencia al slide activo

        clearTimeout(resetTimeout); // Limpiar el temporizador anterior
        resetTimeout = setTimeout(resetActiveSlide, 5000); // Establecer un nuevo temporizador de 5 segundos
    }
}

function handleImageLeave(event) {
    const hoveredElement = event.target;

    // Verificar si el evento se activó fuera de la imagen
    if (hoveredElement.tagName.toLowerCase() !== 'img' && activeSlide !== null) {
        // Ocultar la información y resetear la imagen
        activeSlide.querySelector('.movie-info').style.display = 'none';
        resetImageSize(activeSlide); // Resetear el tamaño de la imagen con animación
        activeSlide = null; // Restablecer la referencia al slide activo
    }
}

slides.forEach(slide => {
    const img = slide.querySelector('img');
    img.addEventListener('click', handleImageClick);
});

document.addEventListener('mouseleave', handleImageLeave);

function resetImageSize(clickedSlide) {
    const clickedImage = clickedSlide.querySelector('img');
    clickedSlide.classList.remove('active');
    setTimeout(() => {
        clickedImage.style.width = '240px';
        clickedImage.style.height = '370px';
        clickedImage.style.filter = 'saturate(10%)';
    }, 10); // Retraso de 10 milisegundos para permitir la animación
}

function resetActiveSlide() {
    if (activeSlide !== null) {
        activeSlide.querySelector('.movie-info').style.display = 'none';
        resetImageSize(activeSlide);
        activeSlide = null;
    }
}
slides.forEach(slide => {
  const img = slide.querySelector('img');
  const playButton = slide.querySelector('.play-button');

  img.addEventListener('click', handleImageClick);
  playButton.addEventListener('click', openVideoPlayer);
});

function openVideoPlayer(event) {
  event.stopPropagation(); // Evitar que se active el evento de clic en la imagen
  const clickedSlide = event.currentTarget.closest('li');
  const slideIndex = parseInt(clickedSlide.getAttribute('data-index'));
  const videoSrc = videoUrls[slideIndex];

  videoIframe.srcdoc = videoSrc;
  videoPlayer.style.display = 'flex';
}

closePlayerButton.addEventListener('click', () => {
  const iframe = videoPlayer.querySelector('iframe');
  if (iframe) {
    videoPlayer.removeChild(iframe);
  }
  videoPlayer.style.display = 'none';
});