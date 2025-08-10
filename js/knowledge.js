// Knowledge Page Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Knowledge.js loaded successfully');
    
    // Tab切换功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    console.log('Found tab buttons:', tabBtns.length);
    console.log('Found tab panes:', tabPanes.length);

    tabBtns.forEach((btn, index) => {
        console.log(`Tab button ${index}:`, btn.textContent, 'data-tab:', btn.getAttribute('data-tab'));
        btn.addEventListener('click', function() {
            console.log('Tab button clicked:', this.textContent);
            const tabId = this.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);

            // 检查目标面板是否存在
            if (!targetPane) {
                console.error(`Tab pane with id "${tabId}" not found`);
                return;
            }

            console.log('Switching to tab:', tabId);

            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // 添加当前活动状态
            this.classList.add('active');
            targetPane.classList.add('active');
            
            console.log('Tab switch completed');
        });
    });

    // 确保默认tab正确显示
    const defaultTab = document.querySelector('.tab-btn.active');
    const defaultPane = document.querySelector('.tab-pane.active');
    
    console.log('Default tab:', defaultTab?.textContent);
    console.log('Default pane:', defaultPane?.id);
    
    if (defaultTab && defaultPane) {
        // 确保默认tab和pane都有active类
        defaultTab.classList.add('active');
        defaultPane.classList.add('active');
        console.log('Default tab and pane set up correctly');
    }

    // PDF下载功能
    const downloadPdfBtn = document.getElementById('downloadPdf');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // 添加确认对话框
            const confirmed = confirm('即将下载环境知识指南PDF文件，大小约2MB。是否继续？');
            if (!confirmed) return;

            // 创建下载链接
            const link = document.createElement('a');
            link.href = 'environment-guide.pdf';
            link.download = 'EcoGlobe-环境知识指南.pdf';
            link.target = '_blank';

            // 添加错误处理
            link.onerror = function() {
                alert('抱歉，PDF文件暂时不可用。请稍后再试或联系管理员。');
                console.error('PDF下载失败: 文件未找到');
            };

            // 模拟点击下载
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // 添加下载跟踪
            console.log('PDF下载已触发');
        });
    }

    // 添加feature-card的动画效果
    const featureCards = document.querySelectorAll('.feature-card');

    const animateCards = () => {
        featureCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (cardPosition < screenPosition) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };

    // Set initial state for feature cards
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Trigger on load and scroll
    window.addEventListener('load', animateCards);
    window.addEventListener('scroll', animateCards);
});
