// وظيفة تكبير وتصغير النص في الموقع
document.addEventListener('DOMContentLoaded', function() {
    // المتغير العام لحجم النص
    let currentTextSize = 100;
    
    // استرجاع الحجم المحفوظ (إن وجد)
    const savedSize = localStorage.getItem('textSizeValue');
    if (savedSize) {
        currentTextSize = parseInt(savedSize);
        applyFontSize(currentTextSize);
    }
    
    // تطبيق تغيير حجم الخط على جميع عناصر النص
    function applyFontSize(sizePercent) {
        // تحديد العناصر التي ستتأثر بتغيير الحجم
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, td, th, button, input, textarea, label, div, .section-title, .card-title, .footer-title');
        
        // حساب نسبة التغيير (100% هو الحجم الطبيعي)
        const sizeRatio = sizePercent / 100;
        
        // تطبيق الحجم على كل عنصر
        textElements.forEach(function(element) {
            // تجاهل بعض العناصر الخاصة (مثل الأيقونات)
            if (element.classList.contains('fas') || element.classList.contains('fab') || element.classList.contains('fa')) {
                return;
            }
            
            // الحصول على حجم الخط الأصلي إذا لم يتم تخزينه بعد
            if (!element.dataset.originalFontSize) {
                const computedStyle = window.getComputedStyle(element);
                const originalSize = parseFloat(computedStyle.fontSize);
                element.dataset.originalFontSize = originalSize;
            }
            
            // تطبيق الحجم الجديد
            const originalSize = parseFloat(element.dataset.originalFontSize);
            const newSize = originalSize * sizeRatio;
            element.style.fontSize = newSize + 'px';
        });
    }
    
    // وظيفة تغيير حجم النص (تُستدعى من الأزرار)
    window.changeFontSize = function(change) {
        // حساب الحجم الجديد
        const newSize = currentTextSize + change;
        
        // التأكد من عدم تجاوز الحدود (70% إلى 150%)
        if (newSize >= 70 && newSize <= 150) {
            currentTextSize = newSize;
            
            // تطبيق الحجم الجديد
            applyFontSize(currentTextSize);
            
            // حفظ الإعداد
            localStorage.setItem('textSizeValue', currentTextSize);
            
            console.log('تم تغيير حجم النص إلى: ' + currentTextSize + '%');
        }
    };
});
