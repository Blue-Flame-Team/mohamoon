// ملف جافاسكريبت موحد لوظائف الأيقونات في جميع النسخ (الموبايل والكمبيوتر)

document.addEventListener('DOMContentLoaded', function() {
    console.log('تهيئة وظائف الأيقونات...');

    // ---- التهيئة الأساسية ----
    // تهيئة نافذة البحث إذا لم تكن موجودة
    let searchPopupOverlay = document.getElementById('searchPopupOverlay');
    if (!searchPopupOverlay) {
        initializeSearchPopup();
        searchPopupOverlay = document.getElementById('searchPopupOverlay');
    }
    
    // ---- وظائف أيقونة البحث ----
    // تحديد زر البحث في نسخة سطح المكتب - استهداف مباشر
    const desktopSearchBtn = document.querySelector('.main-icons-group .icon-btn.search-btn, .main-icons-group .icon-btn:nth-child(1)');
    if (desktopSearchBtn) {
        console.log('تم العثور على زر البحث في نسخة سطح المكتب');
        desktopSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (searchPopupOverlay) {
                searchPopupOverlay.style.display = 'flex';
                setTimeout(() => {
                    const searchPopup = document.querySelector('.search-popup');
                    if (searchPopup) {
                        searchPopup.classList.add('active');
                        const searchInput = document.querySelector('.search-popup-input');
                        if (searchInput) searchInput.focus();
                    }
                }, 10);
            }
        });
    }
    
    // تحديد جميع أزرار البحث الأخرى (للموبايل والكمبيوتر)
    const allSearchButtons = document.querySelectorAll(
        '.search-btn, ' + 
        '.icon-btn img[src*="search"]');
    console.log('تم العثور على أزرار البحث:', allSearchButtons.length);
    let searchPopupOverlay = document.getElementById('searchPopupOverlay');
    
    // التحقق من وجود popup البحث وإنشائه إذا لم يكن موجوداً
    if (!searchPopupOverlay) {
        initializeSearchPopup();
    }
    
    // إضافة مستمع الحدث لجميع أزرار البحث
    allSearchButtons.forEach(function(searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchPopupOverlay = document.getElementById('searchPopupOverlay');
            if (searchPopupOverlay) {
                searchPopupOverlay.style.display = 'flex';
                setTimeout(() => {
                    const searchPopup = document.querySelector('.search-popup');
                    if (searchPopup) {
                        searchPopup.classList.add('active');
                        const searchInput = document.querySelector('.search-popup-input');
                        if (searchInput) searchInput.focus();
                    }
                }, 10);
            }
        });
    });
    
    // ---- وظائف أيقونة الإعدادات ----
    // تحديد زر الإعدادات في نسخة سطح المكتب - استهداف مباشر
    const desktopSettingsBtn = document.querySelector('.main-icons-group .icon-btn.settings-toggle-btn, .main-icons-group .icon-btn:nth-child(4)');
    const mainSettingsMenu = document.querySelector('.main-icons-group .settings-menu');
    
    if (desktopSettingsBtn && mainSettingsMenu) {
        console.log('تم العثور على زر الإعدادات في نسخة سطح المكتب');
        desktopSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('تم النقر على زر الإعدادات في نسخة سطح المكتب');
            mainSettingsMenu.classList.toggle('show');
            initializeSettingsMenuListeners(mainSettingsMenu);
        });
    }
    
    // تحديد جميع أزرار الإعدادات الأخرى (للموبايل والكمبيوتر)
    const allSettingsButtons = document.querySelectorAll(
        '.settings-toggle-btn:not(.main-icons-group .settings-toggle-btn), ' + 
        '.icon-btn img[src*="setting"]');
    console.log('تم العثور على أزرار الإعدادات:', allSettingsButtons.length);
    
    // إضافة مستمع الحدث لجميع أزرار الإعدادات
    // نتأكد من وجود قائمة الإعدادات الرئيسية
    let mainSettingsMenu = document.querySelector('.settings-menu');
    if (!mainSettingsMenu) {
        // إنشاء قائمة الإعدادات إذا لم تكن موجودة
        console.log('إنشاء قائمة الإعدادات الرئيسية');
        mainSettingsMenu = document.createElement('div');
        mainSettingsMenu.className = 'settings-menu';
        mainSettingsMenu.innerHTML = `
            <a href="#" class="settings-option contrast-option">
                <span>تباين</span>
                <i class="fas fa-eye-slash"></i>
            </a>
            <div class="contrast-submenu">
                <a href="#" class="settings-option contrast-light">
                    <span>تباين فاتح</span>
                    <i class="fas fa-sun"></i>
                </a>
                <a href="#" class="settings-option contrast-dark">
                    <span>تباين داكن</span>
                    <i class="fas fa-moon"></i>
                </a>
            </div>
            <a href="#" class="settings-option stats-option">
                <span>الاحصائيات</span>
                <i class="fas fa-chart-line"></i>
            </a>
            <a href="#" class="settings-option logout-option">
                <span>خروج</span>
                <i class="fas fa-sign-out-alt"></i>
            </a>
        `;
        document.body.appendChild(mainSettingsMenu);
        initializeSettingsMenuListeners(mainSettingsMenu);
    }
    
    // معالجة قائمة الإعدادات للموبايل
    let mobileSettingsMenu = document.querySelector('.mobile-settings-menu');
    if (!mobileSettingsMenu) {
        console.log('إنشاء قائمة الإعدادات للموبايل');
        // نسخ قائمة الإعدادات الرئيسية لاستخدامها للموبايل
        mobileSettingsMenu = mainSettingsMenu.cloneNode(true);
        mobileSettingsMenu.classList.add('mobile-settings-menu');
        document.body.appendChild(mobileSettingsMenu);
        initializeSettingsMenuListeners(mobileSettingsMenu);
    }

    console.log('تم العثور على أزرار الإعدادات:', allSettingsButtons.length);
    
    // إضافة مستمع الحدث لجميع أزرار الإعدادات
    allSettingsButtons.forEach(function(settingsBtn) {
        // أضف رسالة تصحيح لمعرفة أي زر تم العثور عليه
        console.log('تم العثور على زر إعدادات:', settingsBtn);
        
        // تحديد قائمة الإعدادات المناسبة بناءً على موقع الزر
        let menuToShow;
        
        // تحديد القائمة المناسبة بناءً على موقع الزر
        if (isInMobileView() || settingsBtn.closest('.logo') || settingsBtn.closest('.mobile-icons')) {
            menuToShow = mobileSettingsMenu;
            console.log('سيتم عرض قائمة الموبايل لهذا الزر');
        } else {
            menuToShow = mainSettingsMenu;
            console.log('سيتم عرض قائمة سطح المكتب لهذا الزر: ' + (settingsBtn.className || 'لا اسم للفئة'));
        }
        
        // إضافة مستمع الحدث للزر
        if (menuToShow) {
            settingsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                
                // إضافة طباعة معلومات تفصيلية للتصحيح
                console.log('تم النقر على زر الإعدادات:', settingsBtn);
                console.log('سيتم عرض القائمة:', menuToShow);
                
                // إغلاق القائمة الأخرى إذا كانت مفتوحة
                if (menuToShow === mainSettingsMenu && mobileSettingsMenu) {
                    mobileSettingsMenu.classList.remove('show');
                } else if (menuToShow === mobileSettingsMenu && mainSettingsMenu) {
                    mainSettingsMenu.classList.remove('show');
                }
                
                // فتح/إغلاق القائمة المناسبة
                menuToShow.classList.toggle('show');
                settingsBtn.classList.toggle('active');
                
                // تموضع القائمة بشكل مناسب بالنسبة للزر
                positionSettingsMenu(menuToShow, settingsBtn);
                
                // إغلاق القائمة الفرعية للتباين إذا كانت مفتوحة
                const contrastSubmenu = menuToShow.querySelector('.contrast-submenu');
                if (contrastSubmenu) {
                    contrastSubmenu.classList.remove('show');
                }
            });
        }
    });
    
    // إغلاق قوائم الإعدادات عند النقر خارجها
    document.addEventListener('click', function(e) {
        const allSettingsMenus = document.querySelectorAll('.settings-menu, .mobile-settings-menu');
        const allSettingsButtons = document.querySelectorAll('.settings-toggle-btn');
        
        let clickedOnMenuOrButton = false;
        
        // التحقق مما إذا كان النقر على زر أو قائمة
        allSettingsButtons.forEach(button => {
            if (button.contains(e.target)) {
                clickedOnMenuOrButton = true;
            }
        });
        
        allSettingsMenus.forEach(menu => {
            if (menu.contains(e.target)) {
                clickedOnMenuOrButton = true;
            } else if (!clickedOnMenuOrButton) {
                menu.classList.remove('show');
                // إعادة الزر إلى حالته الطبيعية
                allSettingsButtons.forEach(button => {
                    button.classList.remove('active');
                });
            }
        });
    });
    
    // ---- وظائف زر الهامبرغر ----
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileSideMenu = document.querySelector('.mobile-side-menu');
    
    if (hamburgerMenu && mobileMenuOverlay && mobileSideMenu) {
        // فتح/إغلاق القائمة الجانبية
        hamburgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenuOverlay.classList.add('show');
            mobileSideMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        // إغلاق القائمة الجانبية عند النقر خارجها
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMenu();
            }
        });
        
        // روابط القائمة الجانبية
        const sideMenuLinks = document.querySelectorAll('.mobile-side-menu-links a:not(.has-dropdown)');
        sideMenuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                setTimeout(closeMenu, 100);
            });
        });
        
        // القوائم المنسدلة
        const dropdownLinks = document.querySelectorAll('.mobile-side-menu-links a.has-dropdown');
        dropdownLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('open');
            });
        });
    }
    
    // ---- الدوال المساعدة ----
    // دالة إغلاق القائمة الجانبية
    function closeMenu() {
        mobileMenuOverlay.classList.remove('show');
        mobileSideMenu.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // دالة تهيئة نافذة البحث المنبثقة
    function initializeSearchPopup() {
        // إنشاء غلاف النافذة المنبثقة
        searchPopupOverlay = document.createElement('div');
        searchPopupOverlay.id = 'searchPopupOverlay';
        searchPopupOverlay.className = 'search-popup-overlay';
        
        // إنشاء حاوية النافذة المنبثقة
        const searchPopup = document.createElement('div');
        searchPopup.className = 'search-popup';
        
        // إنشاء حاوية للأزرار
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'search-buttons-container';
        searchPopup.appendChild(buttonsContainer);
        
        // إنشاء حقل الإدخال
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-popup-input';
        searchInput.placeholder = 'ابحث في الاحكام و الانظمه ...';
        searchPopup.appendChild(searchInput);
        
        // إضافة النافذة المنبثقة إلى الغلاف
        searchPopupOverlay.appendChild(searchPopup);
        
        // إضافة الغلاف إلى الجسم
        document.body.appendChild(searchPopupOverlay);
        
        // إنشاء زر البحث (الأخضر)
        const searchButton = document.createElement('button');
        searchButton.className = 'search-popup-button search';
        searchButton.textContent = 'بحث';
        buttonsContainer.appendChild(searchButton);
        
        // إنشاء زر محرك البحث (البرتقالي)
        const engineBtn = document.createElement('button');
        engineBtn.className = 'search-popup-button engine';
        engineBtn.textContent = 'محرك البحث';
        buttonsContainer.appendChild(engineBtn);
        
        // إضافة مستمعات الأحداث
        // إغلاق النافذة المنبثقة عند النقر على الغلاف
        searchPopupOverlay.addEventListener('click', function(e) {
            if (e.target === searchPopupOverlay) {
                closeSearchPopup();
            }
        });
        
        // معالجة نموذج البحث
        searchButton.addEventListener('click', function() {
            performSearch();
        });
        
        // معالجة زر محرك البحث
        engineBtn.addEventListener('click', function() {
            if (window.location.pathname.includes('/pages/')) {
                window.location.href = '../pages/general-search-engine.html';
            } else {
                window.location.href = './pages/general-search-engine.html';
            }
        });
        
        // معالجة مفتاح Enter في حقل الإدخال
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // دالة إغلاق نافذة البحث المنبثقة
    function closeSearchPopup() {
        const searchPopup = document.querySelector('.search-popup');
        if (searchPopup) {
            searchPopup.classList.remove('active');
            setTimeout(() => {
                if (searchPopupOverlay) searchPopupOverlay.style.display = 'none';
            }, 300);
        }
    }
    
    // دالة البحث
    function performSearch() {
        const searchInput = document.querySelector('.search-popup-input');
        if (searchInput) {
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                console.log('إجراء البحث عن:', searchQuery);
                // تنفيذ وظيفة البحث الفعلية هنا
                // حالياً، نقوم فقط بإغلاق النافذة المنبثقة
                closeSearchPopup();
            }
        }
    }
    
    // إغلاق قوائم الإعدادات عند النقر خارجها
    document.addEventListener('click', function(e) {
        // إغلاق قائمة سطح المكتب
        if (mainSettingsMenu && !mainSettingsMenu.contains(e.target) && !desktopSettingsBtn.contains(e.target)) {
            mainSettingsMenu.classList.remove('show');
        }
        
        // إغلاق قائمة الموبايل
        const mobileSettingsMenu = document.querySelector('.mobile-settings-menu');
        if (mobileSettingsMenu && !mobileSettingsMenu.contains(e.target)) {
            mobileSettingsMenu.classList.remove('show');
        }
    });
    
    // دالة للتحقق مما إذا كان المستخدم يستخدم نسخة الموبايل
    function isInMobileView() {
        // التحقق من عرض الشاشة أو وجود عنصر mobile-view
        const isMobileWidth = window.innerWidth <= 767;
        const hasMobileClass = document.querySelector('.mobile-view') !== null;
        const hasMobileNavbar = document.querySelector('.mobile-navbar') !== null;
        
        return isMobileWidth || hasMobileClass || hasMobileNavbar;
    }
    
    // دالة لتموضع قائمة الإعدادات بشكل مناسب بالنسبة للزر
    function positionSettingsMenu(menu, button) {
        // التحقق من أن القائمة ليست mobile-settings-menu التي لها تنسيق ثابت
        if (!menu.classList.contains('mobile-settings-menu')) {
            // الحصول على موقع الزر
            const buttonRect = button.getBoundingClientRect();
            
            // تحديد موقع القائمة بالنسبة للزر
            menu.style.position = 'absolute';
            menu.style.top = (buttonRect.bottom + window.scrollY) + 'px';
            
            // في نسخة RTL، نضع القائمة لليمين من الزر
            if (document.dir === 'rtl' || getComputedStyle(document.body).direction === 'rtl') {
                menu.style.right = (window.innerWidth - buttonRect.right) + 'px';
            } else {
                menu.style.left = buttonRect.left + 'px';
            }
        }
    }
    
    // دالة تهيئة مستمعات الأحداث لقائمة الإعدادات
    function initializeSettingsMenuListeners(menu) {
        // معالجة خيار التباين
        const contrastOption = menu.querySelector('.contrast-option');
        const contrastSubmenu = menu.querySelector('.contrast-submenu');
        
        if (contrastOption && contrastSubmenu) {
            contrastOption.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                contrastSubmenu.classList.toggle('show');
            });
        }
        
        // معالجة خيار التباين الفاتح
        const contrastLight = menu.querySelector('.contrast-light');
        if (contrastLight) {
            contrastLight.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                document.documentElement.style.setProperty('--primary-color', '#17a891');
                document.documentElement.style.setProperty('--secondary-color', '#24516c');
                menu.classList.remove('show');
                if (contrastSubmenu) contrastSubmenu.classList.remove('show');
            });
        }
        
        // معالجة خيار التباين الداكن
        const contrastDark = menu.querySelector('.contrast-dark');
        if (contrastDark) {
            contrastDark.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                document.documentElement.style.setProperty('--primary-color', '#000000');
                document.documentElement.style.setProperty('--secondary-color', '#000000');
                menu.classList.remove('show');
                if (contrastSubmenu) contrastSubmenu.classList.remove('show');
            });
        }
        
        // معالجة خيار الإحصائيات
        const statsOption = menu.querySelector('.stats-option');
        if (statsOption) {
            statsOption.addEventListener('click', function(e) {
                e.preventDefault();
                // تحديد ما إذا كنا في الصفحة الرئيسية أو صفحة فرعية
                const isHomePage = window.location.pathname === '/' || 
                               window.location.pathname === '/index.html' || 
                               window.location.pathname.endsWith('/index.html') ||
                               window.location.pathname === '';
                               
                if (isHomePage) {
                    window.location.href = 'pages/analytics.html';
                } else {
                    window.location.href = '../pages/analytics.html';
                }
            });
        }
        
        // معالجة خيار تسجيل الخروج
        const logoutOption = menu.querySelector('.logout-option');
        if (logoutOption) {
            logoutOption.addEventListener('click', function(e) {
                e.preventDefault();
                alert('تم تسجيل الخروج بنجاح');
                menu.classList.remove('show');
            });
        }
    }
});
