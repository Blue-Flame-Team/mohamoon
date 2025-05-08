$pagesDir = "D:\Programming Projects\Freelancing\Web\New folder\Elbawaba2\pages"
$htmlFiles = Get-ChildItem -Path $pagesDir -Filter "*.html"

# النموذج الدقيق لقائمة الإعدادات كما في الصفحة الرئيسية
$exactSettingsMenuStructure = @"
                            <div class="settings-menu">
                                <a href="#" class="settings-option contrast-option">
                                    <span>تباين</span>
                                    <i class="fas fa-eye-slash"></i>
                                </a>
                                <!-- Submenú de opciones de contraste -->
                                <div class="contrast-submenu">
                                    <a href="#" class="settings-option contrast-light">
                                        <span>تباين</span>
                                        <i class="fas fa-eye-slash"></i>
                                    </a>
                                    <a href="#" class="settings-option contrast-dark">
                                        <span>تباين</span>
                                        <i class="fas fa-eye-slash"></i>
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
                            </div>
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
    
    # 2. تحديث قائمة الإعدادات لتكون متطابقة مع الصفحة الرئيسية
    if ($content -match '<div class="settings-menu">.*?</div>\s*(?=<div class="|<\/div>)') {
        # استبدال قائمة الإعدادات الحالية بالهيكل الدقيق من الصفحة الرئيسية
        $content = $content -replace '<div class="settings-menu">.*?</div>\s*(?=<div class="|<\/div>)', $exactSettingsMenuStructure
        $updated = $true
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
