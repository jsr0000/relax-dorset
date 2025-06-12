function startSlideshow(slideshowId) {
    const slideshow = document.getElementById(slideshowId);
    const images = slideshow.getElementsByTagName('img');
    let currentIndex = 0;

    // Set the first image as active
    images[currentIndex].classList.add('active');

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
    startSlideshow('slideshow3');
};