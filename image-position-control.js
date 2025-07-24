/**
 * Image Position Control System
 * Allows dynamic control of image positioning within service cards
 */

class ImagePositionController {
    constructor() {
        this.init();
    }

    init() {
        this.createControlPanel();
        this.bindEvents();
    }

    createControlPanel() {
        // Create floating control panel (hidden by default)
        const controlPanel = document.createElement('div');
        controlPanel.id = 'image-position-control';
        controlPanel.className = 'position-control-panel';
        controlPanel.innerHTML = `
            <div class="control-header">
                <h5>التحكم في موضع الصور</h5>
                <button class="close-btn" onclick="this.parentElement.parentElement.style.display='none'">×</button>
            </div>
            <div class="control-content">
                <div class="service-selector">
                    <label>اختر الخدمة:</label>
                    <select id="service-selector">
                        <option value="coffee">ضيافة القهوة السعودية</option>
                        <option value="food">ضيافة الأكل السعودي</option>
                        <option value="drinks">المشروبات والموكتيلات</option>
                        <option value="corporate">ضيافة الشركات</option>
                        <option value="workshop">ورش العمل</option>
                    </select>
                </div>
                
                <!-- Object Fit Control -->
                <div class="control-group">
                    <label>نوع العرض:</label>
                    <div class="fit-controls">
                        <button data-fit="cover">ملء كامل</button>
                        <button data-fit="contain" class="active">احتواء</button>
                        <button data-fit="fill">تمدد</button>
                        <button data-fit="scale-down">تصغير</button>
                        <button data-fit="none">طبيعي</button>
                    </div>
                </div>

                <!-- Manual Position Control -->
                <div class="control-group">
                    <label>الموضع اليدوي:</label>
                    <div class="manual-position">
                        <div class="position-input-group">
                            <label>أفقي (X):</label>
                            <input type="range" id="position-x" min="0" max="100" value="50" step="1">
                            <input type="number" id="position-x-value" min="0" max="100" value="50" step="1">
                            <span>%</span>
                        </div>
                        <div class="position-input-group">
                            <label>عمودي (Y):</label>
                            <input type="range" id="position-y" min="0" max="100" value="50" step="1">
                            <input type="number" id="position-y-value" min="0" max="100" value="50" step="1">
                            <span>%</span>
                        </div>
                    </div>
                </div>

                <!-- Scale Control -->
                <div class="control-group">
                    <label>التكبير/التصغير:</label>
                    <div class="scale-controls">
                        <input type="range" id="scale-range" min="50" max="200" value="100" step="5">
                        <input type="number" id="scale-value" min="50" max="500" value="100" step="5">
                        <span>%</span>
                    </div>
                </div>

                <!-- Rotation Control -->
                <div class="control-group">
                    <label>الدوران:</label>
                    <div class="rotation-controls">
                        <input type="range" id="rotation-range" min="-180" max="180" value="0" step="1">
                        <input type="number" id="rotation-value" min="-360" max="360" value="0" step="1">
                        <span>°</span>
                    </div>
                </div>

                <!-- Filter Controls -->
                <div class="control-group">
                    <label>المرشحات:</label>
                    <div class="filter-controls">
                        <div class="filter-input-group">
                            <label>السطوع:</label>
                            <input type="range" id="brightness" min="0" max="200" value="100" step="5">
                            <input type="number" id="brightness-value" min="0" max="300" value="100" step="5">
                            <span>%</span>
                        </div>
                        <div class="filter-input-group">
                            <label>التباين:</label>
                            <input type="range" id="contrast" min="0" max="200" value="100" step="5">
                            <input type="number" id="contrast-value" min="0" max="300" value="100" step="5">
                            <span>%</span>
                        </div>
                        <div class="filter-input-group">
                            <label>التشبع:</label>
                            <input type="range" id="saturate" min="0" max="200" value="100" step="5">
                            <input type="number" id="saturate-value" min="0" max="300" value="100" step="5">
                            <span>%</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Presets -->
                <div class="control-group">
                    <label>إعدادات سريعة:</label>
                    <div class="preset-buttons">
                        <button data-preset="focus-top">تركيز علوي</button>
                        <button data-preset="focus-center">تركيز وسط</button>
                        <button data-preset="focus-bottom">تركيز سفلي</button>
                        <button data-preset="zoom-in">تكبير</button>
                        <button data-preset="zoom-out">تصغير</button>
                    </div>
                </div>

                <div class="reset-controls">
                    <button id="reset-position">إعادة تعيين</button>
                    <button id="apply-all">تطبيق على الكل</button>
                    <button id="save-preset">حفظ كإعداد</button>
                </div>
            </div>
        `;

        // Add CSS for control panel
        const style = document.createElement('style');
        style.textContent = `
            .position-control-panel {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                padding: 20px;
                width: 350px;
                max-height: 90vh;
                overflow-y: auto;
                z-index: 9999;
                display: none;
                font-family: 'Tajawal', sans-serif;
                direction: rtl;
            }

            .control-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
            }

            .control-header h5 {
                margin: 0;
                color: #A0826D;
            }

            .close-btn {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #999;
            }

            .service-selector, .control-group, .reset-controls {
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #f0f0f0;
            }

            .service-selector label, .control-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: bold;
                color: #333;
                font-size: 14px;
            }

            .service-selector select {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-family: 'Tajawal', sans-serif;
            }

            .position-buttons button, .reset-controls button {
                padding: 8px 12px;
                border: 1px solid #A0826D;
                background: white;
                color: #A0826D;
                border-radius: 5px;
                cursor: pointer;
                font-family: 'Tajawal', sans-serif;
                font-size: 12px;
                transition: all 0.3s ease;
            }

            .position-buttons button:hover, .reset-controls button:hover {
                background: #A0826D;
                color: white;
            }

            .position-buttons button.active {
                background: #A0826D;
                color: white;
            }

            .reset-controls {
                display: flex;
                gap: 10px;
            }

            .reset-controls button {
                flex: 1;
            }

            /* New Control Styles */
            .fit-controls, .preset-buttons {
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                margin-bottom: 10px;
            }

            .fit-controls button, .preset-buttons button {
                padding: 6px 10px;
                border: 1px solid #A0826D;
                background: white;
                color: #A0826D;
                border-radius: 5px;
                cursor: pointer;
                font-family: 'Tajawal', sans-serif;
                font-size: 11px;
                transition: all 0.3s ease;
                flex: 1;
                min-width: 60px;
            }

            .fit-controls button:hover, .preset-buttons button:hover {
                background: #A0826D;
                color: white;
            }

            .fit-controls button.active {
                background: #A0826D;
                color: white;
            }

            /* Admin toggle button */
            .admin-toggle {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #A0826D;
                color: white;
                border: none;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                font-size: 20px;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(160, 130, 109, 0.3);
                z-index: 9998;
                transition: all 0.3s ease;
            }

            .admin-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 8px 25px rgba(160, 130, 109, 0.4);
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(controlPanel);

        // Add admin toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'admin-toggle';
        toggleBtn.innerHTML = '⚙️';
        toggleBtn.title = 'التحكم في موضع الصور';
        toggleBtn.onclick = () => {
            const panel = document.getElementById('image-position-control');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        };
        document.body.appendChild(toggleBtn);
    }

    bindEvents() {
        const serviceSelector = document.getElementById('service-selector');
        const resetBtn = document.getElementById('reset-position');
        const applyAllBtn = document.getElementById('apply-all');
        const savePresetBtn = document.getElementById('save-preset');

        // Object fit controls
        const fitButtons = document.querySelectorAll('.fit-controls button');
        fitButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                fitButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.applyStyles();
            });
        });

        // Reset button event
        resetBtn.addEventListener('click', () => {
            this.resetAllSettings();
        });

        // Apply to all button event
        applyAllBtn.addEventListener('click', () => {
            this.applyToAllServices();
        });
    }

    applyStyles() {
        const selectedService = document.getElementById('service-selector').value;
        const slideshow = document.querySelector(`[data-service="${selectedService}"]`);
        
        if (!slideshow) return;

        const images = slideshow.querySelectorAll('.slide img');
        
        // Get current values
        const objectFit = document.querySelector('.fit-controls button.active')?.dataset.fit || 'contain';

        // Apply styles to all images in the slideshow
        images.forEach(img => {
            img.style.objectFit = objectFit;
        });
    }

    resetAllSettings() {
        // Reset object fit to contain
        document.querySelectorAll('.fit-controls button').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.fit-controls button[data-fit="contain"]').classList.add('active');

        this.applyStyles();
    }

    applyToAllServices() {
        const services = ['coffee', 'food', 'drinks', 'corporate', 'workshop'];
        const currentService = document.getElementById('service-selector').value;
        
        services.forEach(service => {
            document.getElementById('service-selector').value = service;
            this.applyStyles();
        });
        
        // Restore original selection
        document.getElementById('service-selector').value = currentService;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImagePositionController();
});
