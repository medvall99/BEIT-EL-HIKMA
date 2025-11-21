// بيانات الطلاب المتفوقين
const studentsData = {
    overall: [
        { name: "حنان محمد", grade: "16.10" },
        { name: "خالد محمد", grade: "16.03" },
        { name: "محمد لمين محمد يحيى", grade: "15.90" },
        { name: "ديدو", grade: "15.60" },
        { name: "محمد شريف", grade: "15.30" },
        { name: "فاطمة الحسين", grade: "14.93" },
        { name: "أمامه محمدن", grade: "14.47" },
        { name: "رباب", grade: "14.44" },
        { name: "الطشه من أين لك هذا", grade: "14.18" },
        { name: "محمد فال محمد سالم (عدود لا سمحلنا)", grade: "14.11" }
    ],
    science: [
        { name: "خالد محمد", grade: "18.375" },
        { name: "ديدو", grade: "18.00" },
        { name: "يوسف", grade: "17.50" },
        { name: "محمد شريف", grade: "17.375" },
        { name: "محمد لمين محمد يحيى", grade: "17.375" },
        { name: "فاطمة الحسين (رباب)", grade: "16.875" },
        { name: "أمامة محمدن", grade: "16.625" },
        { name: "محمد يسلم", grade: "16.625" },
        { name: "صفية", grade: "16.50" },
        { name: "حنان محمد", grade: "16.00" }
    ],
    physics: [
        { name: "أمامه محمدن", grade: "19.125" },
        { name: "محمد لمين محمد يحيى", grade: "18.50" },
        { name: "خالد محمد", grade: "17.50" },
        { name: "حنان محمد", grade: "17.375" },
        { name: "فاطمة الحسين", grade: "17.125" },
        { name: "عدود", grade: "15.75" },
        { name: "محمد يسلم", grade: "15.50" },
        { name: "فاطمة محفوظ", grade: "15.125" },
        { name: "محمد القطب", grade: "15.00" },
        { name: "محمد شريف", grade: "15.00" }
    
    ],
    math: [
        { name: "حنان محمد", grade: "18.375" },
        { name: "رباب", grade: "17.875" },
        { name: "مريم محمد", grade: "17.50" },
        { name: "محمد القطب", grade: "17.375" },
        { name: "ديدو", grade: "17.25" },
        { name: "نزيه", grade: "17.25" },
        { name: "خالد محمد", grade: "17.00" },
        { name: "فاطمة الحسين", grade: "17.00" },
        { name: "محمد لمين محمد يحيى", grade: "16.75" },
        { name: "صفية", grade: "15.625" }
    ]
};

// DOM جاهز
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة علامات التبويب للطلاب
    initStudentTabs();
    
    // تهيئة التنقل السلس
    initSmoothScroll();
    
    // تهيئة تأثيرات الظهور
    initScrollAnimations();
    
    // تهيئة القائمة المتنقلة
    initMobileMenu();
    
    // تهيئة تغيير اللغة
    initLanguageToggle();
    
    // تهيئة نموذج الاتصال
    initContactForm();
    
    // تهيئة عداد الدرجات
    initGradeCounters();
    
    // تهيئة أقسام المدرسة
    initDivisions();
    
    // تهيئة بطاقات الأساتذة
    initTeachers();
});

// وظيفة تهيئة علامات التبويب للطلاب
function initStudentTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const studentsGrid = document.getElementById('overall-tab');
    
    // عرض البيانات الأولية (المعدل العام)
    renderStudents('overall');
    
    // إضافة مستمعي الأحداث لأزرار علامات التبويب
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            tabBtns.forEach(b => b.classList.remove('active'));
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            // عرض بيانات الطلاب للقسم المحدد
            const tab = this.getAttribute('data-tab');
            renderStudents(tab);
        });
    });
    
    // وظيفة عرض بيانات الطلاب
    function renderStudents(tab) {
        const students = studentsData[tab];
        studentsGrid.innerHTML = '';
        
        students.forEach((student, index) => {
            const card = document.createElement('div');
            card.className = 'student-card fade-in';
            card.innerHTML = `
                <div class="student-rank">${index + 1}</div>
                <h3 class="student-name">${student.name}</h3>
                <div class="student-grade" data-grade="${student.grade}">0.00</div>
            `;
            studentsGrid.appendChild(card);
        });
        
        // إعادة تهيئة تأثيرات الظهور للعناصر الجديدة
        initScrollAnimations();
        // بدء عدادات الدرجات
        initGradeCounters();
    }
}

// وظيفة عداد الدرجات
function initGradeCounters() {
    const gradeElements = document.querySelectorAll('.student-grade[data-grade]');
    
    gradeElements.forEach(element => {
        const targetGrade = parseFloat(element.getAttribute('data-grade'));
        animateGradeCounter(element, targetGrade);
    });
}

// وظيفة تحريك عداد الدرجات
function animateGradeCounter(element, targetGrade) {
    let currentGrade = 0;
    const duration = 1500; // مدة الحركة بالمللي ثانية
    const increment = targetGrade / (duration / 16); // 60 إطار في الثانية
    
    const timer = setInterval(() => {
        currentGrade += increment;
        if (currentGrade >= targetGrade) {
            currentGrade = targetGrade;
            clearInterval(timer);
        }
        element.textContent = currentGrade.toFixed(2);
    }, 16);
}

// وظيفة التنقل السلس
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            
            // إغلاق القائمة المتنقلة إذا كانت مفتوحة
            const mobileMenu = document.querySelector('.mobile-menu');
            const nav = document.querySelector('nav ul');
            if (nav.classList.contains('show')) {
                nav.classList.remove('show');
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// وظيفة تأثيرات الظهور عند التمرير
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

// وظيفة القائمة المتنقلة
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        if (nav.classList.contains('show')) {
            nav.classList.remove('show');
            this.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            nav.classList.add('show');
            this.innerHTML = '<i class="fas fa-times"></i>';
        }
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
            nav.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// وظيفة تبديل اللغة
function initLanguageToggle() {
    const langToggle = document.querySelector('.lang-toggle');
    let currentLang = 'ar';
    
    langToggle.addEventListener('click', function() {
        if (currentLang === 'ar') {
            currentLang = 'fr';
            this.innerHTML = '<i class="fas fa-globe"></i> FR';
            // هنا يمكن إضافة منطق تغيير النصوص إلى الفرنسية
            alert('سيتم تغيير اللغة إلى الفرنسية في النسخة الكاملة');
        } else {
            currentLang = 'ar';
            this.innerHTML = '<i class="fas fa-globe"></i> AR';
            // هنا يمكن إضافة منطق تغيير النصوص إلى العربية
            alert('سيتم تغيير اللغة إلى العربية في النسخة الكاملة');
        }
    });
}

// وظيفة نموذج الاتصال
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('شكراً لتواصلكم! سنرد على رسالتكم في أقرب وقت ممكن.');
        contactForm.reset();
    });
}

// وظيفة تهيئة أقسام المدرسة
function initDivisions() {
    const divisionsGrid = document.querySelector('.divisions-grid');
    const divisions = [
        { name: '5AF', stage: 'ابتدائي' },
        { name: '6AF', stage: 'ابتدائي' },
        { name: '1AS', stage: 'إعدادي' },
        { name: '2AS', stage: 'إعدادي' },
        { name: '3AS', stage: 'إعدادي' },
        { name: '4AS', stage: 'إعدادي' },
        { name: '5C&D', stage: 'ثانوي' },
        { name: '6C&D', stage: 'ثانوي' },
        { name: '7D الباكالوريا', stage: 'ثانوي' }
    ];
    
    divisions.forEach(division => {
        const card = document.createElement('div');
        card.className = 'division-card fade-in';
        card.innerHTML = `
            <div class="division-header">
                <div class="division-name">${division.name}</div>
                <div class="division-stage">${division.stage}</div>
            </div>
            <div class="division-info">
                <div class="info-item">
                    <span class="info-label">عدد التلاميذ:</span>
                    <span class="info-value">سيُضاف قريباً</span>
                </div>
                <div class="info-item">
                    <span class="info-label">الجدول الزمني:</span>
                    <span class="info-value">سيُضاف قريباً</span>
                </div>
            </div>
            <div class="info-placeholder">
                <p>معلومات مفصلة عن القسم والاساتذة ستُضاف قريباً</p>
            </div>
        `;
        divisionsGrid.appendChild(card);
    });
    
    // إعادة تهيئة تأثيرات الظهور للعناصر الجديدة
    initScrollAnimations();
}

// وظيفة تهيئة بطاقات الأساتذة
function initTeachers() {
    const teachersGrid = document.querySelector('.teachers-grid');
    const teachers = [
        { 
            name: 'الأستاذ المصطفى ولد يحيى', 
            subject: 'أستاذ الفيزياء والكيمياء',
            image: 'teacher1.jpg'
        },
        { 
            name: 'الأستاذ النهاه', 
            subject: 'أستاذ الرياضيات',
            image: 'teacher2.jpg'
        }
    ];
    
    teachers.forEach(teacher => {
        const card = document.createElement('div');
        card.className = 'teacher-card fade-in';
        card.innerHTML = `
            <div class="teacher-img">
                <img src="images/${teacher.image}" alt="${teacher.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="img-placeholder">
                    <i class="fas fa-user-graduate"></i>
                </div>
            </div>
            <h3>${teacher.name}</h3>
            <p class="teacher-subject">${teacher.subject}</p>
        `;
        teachersGrid.appendChild(card);
    });
    
    // إعادة تهيئة تأثيرات الظهور للعناصر الجديدة
    initScrollAnimations();
}