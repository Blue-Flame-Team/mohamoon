// ملف جافاسكريبت للقائمة المتنقلة في الموبايل

// تنفيذ دالة فورية للتأكد من أنها تعمل فور تحميل الصفحة
(function() {
    // التأكد من تحميل المستند بالكامل
    function init() {
        // عناصر القائمة
        var menuToggler = document.querySelector('.menu-toggler');
        var menuClose = document.querySelector('.menu-close');
        var mainMenu = document.querySelector('.main-menu');
        var dropdowns = document.querySelectorAll('.dropdown');

        // إذا لم توجد العناصر المطلوبة
        if (!menuToggler || !menuClose || !mainMenu) {
            console.error('لم يتم العثور على عناصر القائمة المتنقلة');
            return;
        }

        // طباعة رسالة للتأكيد على تحميل السكريبت
        console.log('تم تحميل سكريبت القائمة المتنقلة', menuToggler, menuClose, mainMenu);
        
        // فتح القائمة
        menuToggler.onclick = function(e) {
            e.preventDefault();
            console.log('تم النقر على زر القائمة');
            mainMenu.classList.add('active');
        };
        
        // إغلاق القائمة
        menuClose.onclick = function(e) {
            e.preventDefault();
            console.log('تم النقر على زر الإغلاق');
            mainMenu.classList.remove('active');
        };

        // معالجة القوائم المنسدلة
        if (dropdowns && dropdowns.length > 0) {
            console.log('تم العثور على ' + dropdowns.length + ' قائمة منسدلة');
            
            // إضافة معالج أحداث لكل قائمة منسدلة
            dropdowns.forEach(function(dropdown) {
                var link = dropdown.querySelector('a');
                var dropdownMenu = dropdown.querySelector('.dropdown-menu');

                // التأكد من وجود العناصر
                if (link && dropdownMenu) {
                    link.onclick = function(e) {
                        // منع السلوك الافتراضي للرابط
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log('تم النقر على قائمة منسدلة', dropdown);

                        // إذا كانت القائمة مفتوحة، أغلقها، وإلا افتحها
                        if (dropdown.classList.contains('active')) {
                            dropdown.classList.remove('active');
                            dropdownMenu.style.display = 'none';
                        } else {
                            // إغلاق جميع القوائم المنسدلة الأخرى
                            dropdowns.forEach(function(otherDropdown) {
                                if (otherDropdown !== dropdown) {
                                    otherDropdown.classList.remove('active');
                                    var otherMenu = otherDropdown.querySelector('.dropdown-menu');
                                    if (otherMenu) {
                                        otherMenu.style.display = 'none';
                                    }
                                }
                            });
                            
                            // فتح القائمة المنسدلة الحالية
                            dropdown.classList.add('active');
                            dropdownMenu.style.display = 'block';
                        }
                    };
                }
            });
        }
    }
    
    // تنفيذ الدالة عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
