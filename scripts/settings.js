document.addEventListener('DOMContentLoaded', function() {
    // وظيفة لتحويل الألوان الفيروزية إلى اللون الأسود وجعل الموقع كله أبيض وأسود
    function changeToBlack() {
        console.log('تطبيق وضع الأبيض والأسود');
        
        // فحص ما إذا كانت الصفحة الحالية هي الصفحة الرئيسية أم صفحة فرعية
        const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html') || window.location.pathname === '/index.html';
        const isSubPage = !isHomePage;
        
        // توحيد مظهر الناف بار في جميع الصفحات ما عدا الصفحة الرئيسية
        if (isSubPage) {
            console.log('توحيد مظهر الناف بار في الصفحة الفرعية');
            
            // تحديد عناصر الناف بار
            const navElements = document.querySelectorAll('nav, .navbar, .nav-menu, .menu-item, .dropdown-menu, header nav, .nav-container, .navigation, .top-bar');
            navElements.forEach(element => {
                if(element) {
                    // تطبيق الخلفية الداكنة
                    element.style.setProperty('background-color', '#2A2A2A', 'important');
                    element.style.setProperty('color', 'white', 'important');
                    
                    // تطبيق لون النص الأبيض على جميع العناصر الفرعية
                    const allChildElements = element.querySelectorAll('*');
                    allChildElements.forEach(child => {
                        child.style.setProperty('color', 'white', 'important');
                        
                        // معالجة العناصر ذات الأنماط المضمنة
                        if (child.hasAttribute('style')) {
                            const currentStyle = child.getAttribute('style');
                            if (!currentStyle.includes('color: white !important')) {
                                child.setAttribute('style', currentStyle + '; color: white !important;');
                            }
                        }
                        
                        // معالجة العناصر ذات data-original-font-size
                        if (child.hasAttribute('data-original-font-size')) {
                            child.style.setProperty('color', 'white', 'important');
                        }
                    });
                    
                    // تطبيق لون النص الأبيض على الروابط بشكل خاص
                    const links = element.querySelectorAll('a');
                    links.forEach(link => {
                        link.style.setProperty('color', 'white', 'important');
                        
                        if (link.hasAttribute('style')) {
                            const linkStyle = link.getAttribute('style');
                            if (!linkStyle.includes('color: white !important')) {
                                link.setAttribute('style', linkStyle + '; color: white !important;');
                            }
                        }
                    });
                }
            });
        } else {
            console.log('الصفحة الرئيسية: الاحتفاظ بالتصميم الأصلي');
            // الصفحة الرئيسية - لا نقوم بتطبيق التوحيد على الناف بار
        }
        
        // نصوص الفوتر بيضاء في جميع الحالات
        const footerElements = document.querySelectorAll('.footer, .main-footer, .footer-top, .footer-bottom, .footer-column, .footer-links, .footer-menu, .footer-info, .footer-copyright');
        footerElements.forEach(element => {
            if(element) {
                // تطبيق الخلفية الداكنة
                element.style.setProperty('background-color', '#2A2A2A', 'important');
                
                // تطبيق لون النص الأبيض على جميع العناصر الفرعية
                const allChildElements = element.querySelectorAll('*');
                allChildElements.forEach(child => {
                    child.style.setProperty('color', 'white', 'important');
                });
                
                // تطبيق لون النص الأبيض على الروابط
                const links = element.querySelectorAll('a');
                links.forEach(link => {
                    link.style.setProperty('color', 'white', 'important');
                });
            }
        });
        
        // إضافة ملف CSS للتباين الداكن
        const darkCssPath = window.location.pathname.includes('/pages/') ? '../styles/dark-mode.css' : 'styles/dark-mode.css';
        
        // إزالة أي إصدار سابق للستايل
        const oldStyle = document.getElementById('dark-mode-css');
        if (oldStyle) {
            oldStyle.remove();
        }
        
        // إضافة الستايل الجديد
        const darkCssLink = document.createElement('link');
        darkCssLink.id = 'dark-mode-css';
        darkCssLink.rel = 'stylesheet';
        darkCssLink.type = 'text/css';
        darkCssLink.href = darkCssPath;
        document.head.appendChild(darkCssLink);
        
        // تطبيق CSS مباشر للمناطق الحرجة التي تحتاج تغيير فوري
        const directStyles = document.createElement('style');
        directStyles.id = 'direct-dark-styles';
        directStyles.textContent = `
            /* نص أسود للعناصر الرئيسية */
            .dark-mode p, .dark-mode h1, .dark-mode h2, .dark-mode h3, .dark-mode h4, .dark-mode h5, .dark-mode h6,
            .dark-mode span:not(.footer span):not(.footer-bottom span), 
            .dark-mode a:not(.footer a):not(.footer-bottom a) {
                color: #2A2A2A !important;
            }
            
            /* الخدمات والاشتراك - محدث */
            .dark-mode .services-section, 
            .dark-mode .services-section *, 
            .dark-mode .services-section .container,
            .dark-mode .services-section .services-header,
            .dark-mode .services-section .section-title,
            .dark-mode .services-section .sub-header,
            .dark-mode .services-section .services-content,
            .dark-mode .services-section .service-card,
            .dark-mode .services-section .service-title,
            .dark-mode .services-section .card-desc,
            .dark-mode .services-section h2,
            .dark-mode .services-section h3,
            .dark-mode .services-section p,
            .dark-mode .services-section a,
            .dark-mode .services-section .community-programs-section,
            .dark-mode .subscribe-section, 
            .dark-mode .subscribe-section * {
                color: #2A2A2A !important;
            }
            
            /* فوتر الموقع */
            .dark-mode .footer-bottom, .dark-mode .footer-bottom * {
                background-color: #2A2A2A !important;
                color: white !important;
            }
            
            /* FAQ page */
            .dark-mode.faq-page, .dark-mode .faq-container, .dark-mode .faq-content {
                background-color: white !important;
            }
        `;
        document.head.appendChild(directStyles);
        
        // تغيير متغيرات الألوان الأساسية
        document.documentElement.style.setProperty('--primary-color', '#2A2A2A');
        document.documentElement.style.setProperty('--secondary-color', '#2A2A2A');
        
        // تطبيق مباشر على العناصر الرئيسية
        // فوتر الموقع
        document.querySelectorAll('.footer-bottom, .footer a, .footer-bottom *').forEach(el => {
            el.style.setProperty('color', 'white', 'important');
        });
        
        document.querySelectorAll('.footer-bottom').forEach(el => {
            el.style.setProperty('background-color', '#2A2A2A', 'important');
        });
        
        // خدمات واشتراك - محدث
        const serviceElements = document.querySelectorAll('.services-section, .services-section *, .service-card, .service-title, .card-desc, .more-btn, .community-programs-section h3, .sidebar-btn, .tab-publish, .tab-portal, .subscribe-section, .subscribe-section *');
        
        serviceElements.forEach(el => {
            el.style.setProperty('color', '#2A2A2A', 'important');
            
            // التعامل مع العناصر التي لديها نمط مضمن
            if (el.hasAttribute('style')) {
                // حفظ أي أنماط مهمة أخرى ولكن تغيير اللون
                const currentStyle = el.getAttribute('style');
                // إضافة لون أسود بعد أي أنماط موجودة
                el.setAttribute('style', currentStyle + '; color: #2A2A2A !important;');
            }
        });
        
        // تحديد إذا كانت صفحة الأسئلة الشائعة
        const isFaqPage = window.location.pathname.includes('faq') || 
                          window.location.href.includes('faq');
        
        if (isFaqPage) {
            document.body.classList.add('faq-page');
            document.body.style.setProperty('background-color', 'white', 'important');
        }
        
        // قسم الخدمات - التعامل مع كل نوع من العناصر بشكل فردي
        document.querySelectorAll('.services-section h2').forEach(el => {
            el.style.setProperty('color', '#2A2A2A', 'important');
        });
        
        document.querySelectorAll('.services-section h3').forEach(el => {
            el.style.setProperty('color', '#2A2A2A', 'important');
        });
        
        document.querySelectorAll('.services-section p').forEach(el => {
            el.style.setProperty('color', '#2A2A2A', 'important');
        });
        
        document.querySelectorAll('.services-section a').forEach(el => {
            el.style.setProperty('color', '#2A2A2A', 'important');
        });
        
        document.querySelectorAll('.services-section .service-card').forEach(el => {
            el.style.setProperty('color', '#2A2A2A', 'important');
        });
        
        document.querySelectorAll('.services-section .card-desc').forEach(el => {
            el.style.setProperty('color', '#2A2A2A', 'important');
        });
        
        document.querySelectorAll('.services-section .service-title').forEach(el => {
            el.style.setProperty('color', '#2A2A2A', 'important');
        });
        
        // إضافة وظيفة مراقبة للتغييرات في DOM للتأكد من تطبيق الأنماط على العناصر الجديدة
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // إذا كان العنصر المضاف عنصر HTML
                            if (document.body.classList.contains('dark-mode')) {
                                // تطبيق الأنماط على العنصر الجديد وأبنائه
                                if (node.matches('.services-section, .services-section *, .service-card, .service-title, .card-desc, .more-btn, .community-programs-section h3, .sidebar-btn, .tab-publish, .tab-portal, .subscribe-section, .subscribe-section *')) {
                                    node.style.setProperty('color', '#2A2A2A', 'important');
                                }
                                
                                // البحث عن العناصر المطابقة داخل العنصر الجديد
                                node.querySelectorAll('.services-section, .services-section *, .service-card, .service-title, .card-desc, .more-btn, .community-programs-section h3, .sidebar-btn, .tab-publish, .tab-portal, .subscribe-section, .subscribe-section *').forEach(el => {
                                    el.style.setProperty('color', '#2A2A2A', 'important');
                                });
                            }
                        }
                    });
                }
            });
        });
        
        // تكوين المراقبة لمشاهدة التغييرات في الصفحة بأكملها
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    // تحديد إذا كانت الصفحة هي الرئيسية أم صفحة فرعية
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' || 
                       window.location.pathname.endsWith('/index.html') ||
                       window.location.pathname === '';
    
    // إضافة فئة تعريفية للصفحة الرئيسية
    if (isHomePage) {
        document.body.classList.add('home-page');
    }
    
    // استخدام querySelectorAll لتحديد جميع أزرار الإعدادات في الصفحة
    const settingsToggleBtns = document.querySelectorAll('.settings-toggle-btn');
    const settingsMenus = document.querySelectorAll('.settings-menu');
    const contrastOptions = document.querySelectorAll('.contrast-option');
    const contrastSubmenus = document.querySelectorAll('.contrast-submenu');
    const contrastLights = document.querySelectorAll('.contrast-light');
    const contrastDarks = document.querySelectorAll('.contrast-dark');
    
    // تحقق من وجود عناصر واجهة المستخدم قبل إضافة المستمعين
    if (settingsToggleBtns.length > 0 && settingsMenus.length > 0) {
        // فتح/إغلاق قائمة الإعدادات عند النقر على أيقونة الإعدادات
        settingsToggleBtns.forEach((toggleBtn, index) => {
            toggleBtn.addEventListener('click', function() {
                // إيجاد أقرب قائمة إعدادات للزر الذي تم النقر عليه
                const closestMenu = this.closest('.top-icons, .mobile-topbar, .top-bar')?.querySelector('.settings-menu') || 
                                  document.querySelectorAll('.settings-menu')[index];
                
                if (closestMenu) {
                    // إغلاق جميع القوائم الأخرى أولاً
                    settingsMenus.forEach(menu => {
                        if (menu !== closestMenu) {
                            menu.classList.remove('show');
                        }
                    });
                    
                    // فتح أو إغلاق القائمة الحالية
                    closestMenu.classList.toggle('show');
                    
                    // إغلاق جميع القوائم الفرعية للتباين
                    contrastSubmenus.forEach(submenu => {
                        submenu.classList.remove('show');
                    });
                }
            });
        });
        
        // إغلاق القائمة عند النقر في أي مكان آخر
        document.addEventListener('click', function(e) {
            if (settingsMenus.length > 0) {
                settingsMenus.forEach(menu => {
                    // التحقق مما إذا كان النقر خارج القائمة وخارج أزرار الإعدادات
                    let clickedOnToggleBtn = false;
                    settingsToggleBtns.forEach(btn => {
                        if (btn.contains(e.target)) {
                            clickedOnToggleBtn = true;
                        }
                    });
                    
                    if (!menu.contains(e.target) && !clickedOnToggleBtn) {
                        menu.classList.remove('show');
                        
                        // إغلاق القائمة الفرعية للتباين أيضًا
                        contrastSubmenus.forEach(submenu => {
                            submenu.classList.remove('show');
                        });
                    }
                });
            }
        });
        
        // التعامل مع خيارات التباين الجديدة
        if (contrastOptions.length > 0) {
            contrastOptions.forEach((option, index) => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // إيجاد أقرب قائمة فرعية للتباين
                    const closestSubmenu = this.closest('.settings-menu')?.querySelector('.contrast-submenu') ||
                                        document.querySelectorAll('.contrast-submenu')[index];
                    
                    if (closestSubmenu) {
                        // إغلاق جميع القوائم الفرعية الأخرى أولاً
                        contrastSubmenus.forEach(submenu => {
                            if (submenu !== closestSubmenu) {
                                submenu.classList.remove('show');
                            }
                        });
                        
                        // فتح أو إغلاق القائمة الفرعية الحالية
                        closestSubmenu.classList.toggle('show');
                    }
                });
            });
        }
        
        // خيار التباين الفاتح
        if (contrastLights.length > 0) {
            contrastLights.forEach(light => {
                light.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('theme', 'light');
                    
                    // تطبيق الألوان الفاتحة
                    document.documentElement.style.setProperty('--primary-color', '#17a891');
                    document.documentElement.style.setProperty('--secondary-color', '#24516c');
                    
                    // إزالة ملف CSS الداكن
                    const darkStylesheet = document.getElementById('dark-mode-css');
                    if (darkStylesheet) {
                        darkStylesheet.remove();
                    }
                    
                    const directStyles = document.getElementById('direct-dark-styles');
                    if (directStyles) {
                        directStyles.remove();
                    }
                    
                    // إغلاق جميع القوائم
                    settingsMenus.forEach(menu => {
                        menu.classList.remove('show');
                    });
                    
                    contrastSubmenus.forEach(submenu => {
                        submenu.classList.remove('show');
                    });
                });
            });
        }
        
        // خيار التباين الداكن
        if (contrastDarks.length > 0) {
            contrastDarks.forEach(dark => {
                dark.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('theme', 'dark');
                    
                    // تطبيق تحويل الألوان إلى اللون الأسود عند الضغط على زر التباين الداكن
                    changeToBlack();
                    
                    // إغلاق جميع القوائم
                    settingsMenus.forEach(menu => {
                        menu.classList.remove('show');
                    });
                    
                    contrastSubmenus.forEach(submenu => {
                        submenu.classList.remove('show');
                    });
                });
            });
        }
    }

    // التعامل مع الخيارات الأخرى
    const statsOptions = document.querySelectorAll('.stats-option');
    const logoutOptions = document.querySelectorAll('.logout-option');

    if (statsOptions.length > 0) {
        statsOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('تم النقر على خيار الإحصائيات');
                
                // يمكن إضافة المزيد من المنطق هنا للتعامل مع خيار الإحصائيات
                
                // إغلاق القوائم
                settingsMenus.forEach(menu => {
                    menu.classList.remove('show');
                });
            });
        });
    }

    if (logoutOptions.length > 0) {
        logoutOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('تم النقر على خيار الخروج');
                
                // يمكن إضافة المزيد من المنطق هنا للتعامل مع خيار الخروج
                
                // إغلاق القوائم
                settingsMenus.forEach(menu => {
                    menu.classList.remove('show');
                });
            });
        });
    }
    
    // تطبيق الثيم عند تحميل الصفحة
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        // تطبيق وضع التباين الداكن
        setTimeout(changeToBlack, 100);
    }
});
