$pagesDir = "D:\Programming Projects\Freelancing\Web\New folder\Elbawaba2\pages"
$htmlFiles = Get-ChildItem -Path $pagesDir -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # 1. إضافة ملف CSS للإعدادات إذا لم يكن موجوداً
    if (-not ($content -match "styles/home/settings.css")) {
        $content = $content -replace '(styles/login-modal\.css[^<]*</link>)', '$1
    <link rel="stylesheet" href="../styles/home/settings.css">'
    }
    
    # 2. تحديث زر الإعدادات ليكون مطابقا للرئيسية
    $settingsButtonPattern = '<button class="icon-btn settings-btn">'
    $newSettingsButton = '<button class="icon-btn settings-toggle-btn">'
    
    if ($content -match $settingsButtonPattern) {
        $content = $content -replace $settingsButtonPattern, $newSettingsButton
    }
    
    # 3. تحديث قائمة الإعدادات
    $settingsMenuStart = '<div class="settings-menu">'
    $settingsMenuEnd = '</div>\s*(?=<div class="main-icons-group"|<div class="top-icons"|<div class="zoom-group")'
    $settingsMenuPattern = "$settingsMenuStart[\s\S]*?$settingsMenuEnd"
    $newSettingsMenu = '<div class="settings-menu">
                                <a href="#" class="menu-option contrast-option">
                                    <div class="option-icon"><img src="../assets/icons/eye-slash.png" alt="تباين"></div>
                                    <div class="option-text">تباين</div>
                                </a>
                                <div class="contrast-submenu">
                                    <a href="#" class="submenu-option contrast-light">
                                        <div class="option-icon"><img src="../assets/icons/sun.png" alt="تباين فاتح"></div>
                                        <div class="option-text">تباين فاتح</div>
                                    </a>
                                    <a href="#" class="submenu-option contrast-dark">
                                        <div class="option-icon"><img src="../assets/icons/moon.png" alt="تباين داكن"></div>
                                        <div class="option-text">تباين داكن</div>
                                    </a>
                                </div>
                                <a href="#" class="menu-option stats-option">
                                    <div class="option-icon"><img src="../assets/icons/chart.png" alt="الاحصائيات"></div>
                                    <div class="option-text">الاحصائيات</div>
                                </a>
                                <a href="#" class="menu-option logout-option">
                                    <div class="option-icon"><img src="../assets/icons/logout.png" alt="خروج"></div>
                                    <div class="option-text">خروج</div>
                                </a>
                            </div>'
    
    # تطبيق التغيير فقط إذا وجد النمط المطلوب
    if ($content -match $settingsMenuPattern) {
        $content = $content -replace $settingsMenuPattern, $newSettingsMenu
    }
    
    # حفظ التغييرات
    Set-Content -Path $file.FullName -Value $content
    Write-Host "تم تحديث $($file.Name)"
}

Write-Host "تم الانتهاء من تحديث جميع الصفحات!"
