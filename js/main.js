// 增强的页面切换效果
function handlePageTransition() {
    const pageContainer = document.querySelector('.page-container');
    if (pageContainer) {
        // 初始加载动画
        pageContainer.classList.add('active');
        
        // 预加载下一页资源
        document.querySelectorAll('a[href*=".html"]').forEach(link => {
            if (!link.href.includes('#')) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = link.href;
                document.head.appendChild(prefetchLink);
            }
        });

        // 处理链接点击
        document.body.addEventListener('click', function(e) {
            if (e.target.closest('a') && !e.target.closest('a').classList.contains('no-transition')) {
                const link = e.target.closest('a');
                if (link.href && link.href.includes('.html') && !link.href.includes('#')) {
                    e.preventDefault();
                    
                    // 添加加载指示器
                    const loader = document.createElement('div');
                    loader.className = 'page-loader';
                    document.body.appendChild(loader);
                    
                    // 触发退出动画
                    pageContainer.classList.add('fade-out');
                    
                    // 预加载下一页内容
                    fetch(link.href)
                        .then(response => response.text())
                        .then(() => {
                            setTimeout(() => {
                                window.location.href = link.href;
                            }, 500);
                        })
                        .catch(() => {
                            setTimeout(() => {
                                window.location.href = link.href;
                            }, 500);
                        });
                }
            }
        });
    }
}

// 数字动画效果
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 特色卡片交互
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // 点击卡片时切换翻转状态
        card.addEventListener('click', function(e) {
            // 防止点击链接时触发翻转
            if (!e.target.closest('a')) {
                this.classList.toggle('flipped');
            }
        });

        // 触摸设备优化
        card.addEventListener('touchstart', function() {
            this.classList.add('touched');
        });

        card.addEventListener('touchend', function() {
            this.classList.remove('touched');
        });
    });
}

// 初始化统计卡片动画
function initStatsAnimation() {
    const statCards = document.querySelectorAll('.stat-card h3');
    if (statCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.textContent.replace(/,/g, ''));
                    const baseValue = Math.floor(endValue * 0.9);
                    
                    // 包装数字以便应用动画
                    target.innerHTML = `<span class="counter">${baseValue.toLocaleString()}</span>`;
                    
                    // 初始动画
                    animateValue(target.querySelector('.counter'), 0, baseValue, 1500);
                    
                    // 持续波动效果
                    setTimeout(() => {
                        let currentValue = baseValue;
                        
                        const updateValue = () => {
                            // 更平滑的波动算法
                            const changeFactor = 0.05 + Math.random() * 0.1;
                            const direction = Math.random() > 0.5 ? 1 : -1;
                            const change = Math.floor(endValue * changeFactor);
                            
                            currentValue = Math.max(0, Math.min(
                                endValue, 
                                currentValue + (change * direction)
                            ));
                            
                    // 增强数字滚动效果
                    const counter = target.querySelector('.counter');
                    counter.style.transition = 'transform 0.5s ease-out';
                    counter.style.transform = 'translateY(0)';
                    setTimeout(() => {
                        counter.style.transform = 'translateY(-5px)';
                        setTimeout(() => {
                            counter.style.transform = 'translateY(0)';
                        }, 250);
                    }, 10);
                    
                            // 更新数字并应用动画
                            counter.textContent = currentValue.toLocaleString();
                            counter.style.animation = 'none';
                            void counter.offsetWidth; // 触发重绘
                            counter.style.animation = 'count-up 0.5s ease-out';
                            
                            // 添加脉冲效果
                            target.classList.add('pulse');
                            setTimeout(() => {
                                target.classList.remove('pulse');
                            }, 300);
                        };
                        
                        // 每2-4秒更新一次
                        setInterval(updateValue, 2000 + Math.random() * 2000);
                        updateValue();
                    }, 1500);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statCards.forEach(card => observer.observe(card));
    }
}

// 优化后的事件委托处理
document.addEventListener('DOMContentLoaded', function() {
    // 处理社交媒体按钮点击
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.dataset.platform;
            alert(`即将跳转到${platform}页面`);
        });
    });

    // 处理视频按钮点击
    document.getElementById('watch-video-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('即将播放宣传视频');
    });

    // 处理订阅表单提交
    document.getElementById('newsletter-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert(`感谢订阅！我们将发送确认邮件至${email}`);
        } else {
            alert('请输入有效的邮箱地址');
        }
    });

    // 初始化页面切换效果
    handlePageTransition();
    // 初始化统计卡片动画
    initStatsAnimation();
    // 初始化特色卡片交互
    initFeatureCards();
    
    // 事件委托处理所有按钮点击
    document.body.addEventListener('click', function(e) {
        // 按钮点击处理 - 排除tab按钮
        if (e.target.closest('.btn') && !e.target.closest('.tab-btn')) {
            const btn = e.target.closest('.btn');
            // 如果是表单提交按钮或链接按钮，不阻止默认行为
            if (btn.type !== 'submit' && btn.tagName !== 'A') {
                e.preventDefault();
                console.log('按钮被点击:', btn.textContent.trim());
                // 在这里添加按钮点击的具体逻辑
            }
        }
        
        // 移动菜单按钮
        if (e.target.closest('.mobile-menu-btn')) {
            const btn = e.target.closest('.mobile-menu-btn');
            const nav = document.querySelector('.main-nav');
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        }
    });

    // 处理登录表单提交
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (!username || !password) {
                e.preventDefault();
                alert('请输入用户名和密码');
                return;
            }
            
            console.log('登录尝试:', username);
            // 表单验证通过，允许默认提交行为
            // 实际应用中这里可以添加AJAX登录逻辑
        });
    }

    // 处理导航栏登录状态
    const navLoginLink = document.querySelector('.main-nav a[href="login.html"]');
    if (navLoginLink) {
        // 检查是否已登录（实际应用中这里应该检查真实的登录状态）
        const isLoggedIn = false; // 默认未登录
        
        if (isLoggedIn) {
            navLoginLink.textContent = 'Logout';
            navLoginLink.href = 'logout.html';
        } else {
            navLoginLink.textContent = 'Log on';
            navLoginLink.href = 'login.html';
        }
    }

    // 图片懒加载
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});
