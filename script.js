function startSlideshow(slideshowId) {
    const slideshow = document.getElementById(slideshowId);
    const images = slideshow.getElementsByTagName('img');
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    setInterval(showNextImage, 2500);
}

window.onload = function () {
    startSlideshow('slideshow1');
    startSlideshow('slideshow2');
};