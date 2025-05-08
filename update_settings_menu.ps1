$pagesDir = "D:\Programming Projects\Freelancing\Web\New folder\Elbawaba2\pages"
$htmlFiles = Get-ChildItem -Path $pagesDir -Filter "*.html"

# النموذج الصحيح لقائمة الإعدادات
$correctSettingsMenu = @"
                            <div class="settings-menu">
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
                            </div>
"@

# النموذج الصحيح لزر الإعدادات
$correctToggleBtn = @"
                            <button class="icon-btn settings-toggle-btn">
                                <img src="../assets/icons/setting-2.png" alt="الإعدادات">
                            </button>
"@

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $updated = $false
    
    # 1. إضافة ملف CSS للإعدادات إذا لم يكن موجوداً
    if (-not ($content -match "settings\.css")) {
        $content = $content -replace '(<link rel="stylesheet" href="\.\.\/styles\/[^"]+\.css">)\s*</head>', '$1
    <link rel="stylesheet" href="../styles/home/settings.css">
</head>'
        $updated = $true
    }
    
    # 2. تحديث زر الإعدادات ليكون بالشكل الصحيح
    if ($content -match '<button class="icon-btn settings-btn">') {
        $content = $content -replace '<button class="icon-btn settings-btn">[^<]*<img[^>]*>[^<]*</button>', $correctToggleBtn
        $updated = $true
    }
    
    # 3. تحديث قائمة الإعدادات لتشمل جميع الخيارات
    if (-not ($content -match 'class="menu-option contrast-option"') -or 
        -not ($content -match 'class="menu-option stats-option"') -or
        -not ($content -match 'class="menu-option logout-option"')) {
        
        # البحث عن قائمة الإعدادات الحالية واستبدالها
        if ($content -match '<div class="settings-menu">.*?</div>\s*(?=<div class="|<\/div>)') {
            $content = $content -replace '<div class="settings-menu">.*?</div>\s*(?=<div class="|<\/div>)', $correctSettingsMenu
            $updated = $true
        }
    }
    
    # حفظ التغييرات فقط إذا كان هناك تغيير
    if ($updated) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "تم تحديث $($file.Name)"
    } else {
        Write-Host "الملف $($file.Name) لا يحتاج إلى تحديث"
    }
}

Write-Host "تم الانتهاء من تحديث جميع الصفحات!"
