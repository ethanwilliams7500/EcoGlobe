document.addEventListener('DOMContentLoaded', function() {
    // 添加动画类
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-page .animate-enter');
        
        elements.forEach((el, index) => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(elementPosition < screenPosition) {
                setTimeout(() => {
                    el.classList.add('animate-enter-active');
                }, index * 100);
            }
        });
    }

    // 初始化设置
    document.querySelectorAll('.about-page [class*="-enter"]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });

    // 页面加载时触发一次
    animateOnScroll();
    
    // 滚动时触发
    window.addEventListener('scroll', animateOnScroll);
});