const tabsContainer = document.querySelector('#tabs-container');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

let currentTabIndex = 0;

// Xử lý chuyển Tab
function switchTab(index) {
    tabBtns.forEach(btn => {
        btn.classList.remove('active', 'text-blue-600', 'border-blue-600', 'bg-blue-50');
        btn.classList.add('text-gray-500', 'border-transparent');
    });
    tabContents.forEach(content => {
        content.classList.remove('block');
        content.classList.add('hidden');
    });

    const selectedBtn = tabBtns[index];
    selectedBtn.classList.add('active', 'text-blue-600', 'border-blue-600', 'bg-blue-50');
    selectedBtn.classList.remove('text-gray-500', 'border-transparent');
    
    const targetId = selectedBtn.dataset.target;
    const targetContent = document.querySelector(`#${targetId}`);
    
    targetContent.classList.remove('hidden');
    targetContent.classList.add('block');
    
    currentTabIndex = index;
}

// Click Event
tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => switchTab(index));
});

// Keyboard Event Control
const handleKeydown = (e) => {
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentTabIndex + 1) % tabBtns.length;
        switchTab(nextIndex);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (currentTabIndex - 1 + tabBtns.length) % tabBtns.length;
        switchTab(prevIndex);
    }
};

tabsContainer.addEventListener('focus', () => {
    document.addEventListener('keydown', handleKeydown);
});

tabsContainer.addEventListener('blur', () => {
    document.removeEventListener('keydown', handleKeydown);
});