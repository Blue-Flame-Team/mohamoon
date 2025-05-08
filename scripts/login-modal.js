/**
 * نظام تسجيل الدخول الموحد - ملف التوجيه
 * تم نقل جميع وظائف هذا الملف إلى auth-system.js
 * هذا الملف موجود فقط للحفاظ على التوافق مع الصفحات القديمة
 */

// توجيه الوظائف إلى نظام المصادقة الجديد
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحديث نظام تسجيل الدخول. استخدم auth-system.js');
    
    // تحقق من وجود نظام المصادقة الجديد
    if (typeof AuthSystem !== 'undefined') {
        console.log('نظام المصادقة الجديد موجود وجاهز');
    } else {
        console.error('لم يتم العثور على نظام المصادقة الجديد. الرجاء إضافة auth-system.js');
        
        // إضافة النظام الجديد ديناميكياً إذا لم يكن موجوداً
        const script = document.createElement('script');
        script.src = '../scripts/auth-system.js';
        script.async = true;
        script.onload = function() {
            console.log('تم تحميل نظام المصادقة الجديد ديناميكياً');
            // تهيئة النظام بعد التحميل
            if (typeof AuthSystem !== 'undefined') {
                AuthSystem.init();
            }
        };
        document.head.appendChild(script);
    }
});
