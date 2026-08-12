const images = [
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1786431523179-cc488037bcf7?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=1200&auto=format&fit=crop'
];

const track = document.querySelector('#track');
const dotsContainer = document.querySelector('#dots-container');
const counter = document.querySelector('#slide-counter');
const sliderContainer = document.querySelector('#slider-container');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

let currentIndex = 1;
let isAnimating = false;
let autoPlayInterval;

// 1. Tạo DOM
function initSlider() {
    const sliderImages = [images[images.length - 1], ...images, images[0]];
    
    sliderImages.forEach(src => {
        const div = document.createElement('div');
        div.className = 'w-full h-full flex-shrink-0';
        div.innerHTML = `<img src="${src}" class="w-full h-full object-cover" alt="Slide">`;
        track.appendChild(div);
    });

    images.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`;
        dot.addEventListener('click', () => goToSlide(idx + 1));
        dotsContainer.appendChild(dot);
    });

    track.style.transform = `translateX(-100%)`;
    startAutoPlay();
}

// 2. Logic tịnh tiến
function updateSlider(animate = true) {
    if (animate) {
        track.style.transition = 'transform 0.4s ease-in-out';
    } else {
        track.style.transition = 'none';
    }
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    let realIndex = currentIndex;
    if (currentIndex === 0) realIndex = images.length;
    if (currentIndex === images.length + 1) realIndex = 1;
    
    counter.textContent = `${realIndex} / ${images.length}`;
    
    Array.from(dotsContainer.children).forEach((dot, idx) => {
        if (idx === realIndex - 1) {
            dot.className = 'w-3 h-3 rounded-full transition-all duration-300 bg-white scale-125';
        } else {
            dot.className = 'w-3 h-3 rounded-full transition-all duration-300 bg-white/50 hover:bg-white/80';
        }
    });
}

function goToSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = index;
    updateSlider(true);
    resetAutoPlay();
}

// 3. Xử lý Trick Infinite Loop khi Transition kết thúc
track.addEventListener('transitionend', () => {
    isAnimating = false;
    if (currentIndex === 0) {
        currentIndex = images.length;
        updateSlider(false);
    } else if (currentIndex === images.length + 1) {
        currentIndex = 1;
        updateSlider(false);
    }
});

// 4. Các nút điều khiển
nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

// 5. Điều khiển bằng phím
const handleSliderKeydown = (e) => {
    if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
};

sliderContainer.addEventListener('focus', () => {
    document.addEventListener('keydown', handleSliderKeydown);
});
sliderContainer.addEventListener('blur', () => {
    document.removeEventListener('keydown', handleSliderKeydown);
});

// 6. Auto-play
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 3000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
sliderContainer.addEventListener('mouseleave', startAutoPlay);

// Khởi chạy
initSlider();