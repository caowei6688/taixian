/**
 * 无障碍服务平台 - 公共脚本
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加移动端导航菜单切换功能
    setupMobileMenu();
    
    // 添加无障碍键盘导航功能
    setupAccessibilityNavigation();
    
    // 检查并添加高对比度模式
    setupContrastMode();
});

/**
 * 设置移动端导航菜单
 */
function setupMobileMenu() {
    // 未来可以在这里添加移动端导航菜单的切换功能
}

/**
 * 设置无障碍键盘导航
 */
function setupAccessibilityNavigation() {
    // 为所有导航链接添加键盘焦点样式
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            // 按下回车键或空格键时触发链接点击
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // 为所有按钮添加键盘操作支持
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * 设置高对比度模式
 */
function setupContrastMode() {
    // 未来可以添加高对比度模式切换功能
}

/**
 * 显示通知消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型 (success, error, info)
 * @param {number} duration - 显示时长(毫秒)
 */
function showNotification(message, type = 'info', duration = 3000) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 设置定时器自动关闭
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

/**
 * 使用地理位置API获取当前位置
 * @param {Function} successCallback - 成功获取位置后的回调函数
 * @param {Function} errorCallback - 获取位置失败后的回调函数
 */
function getCurrentLocation(successCallback, errorCallback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                successCallback(coords);
            },
            (error) => {
                let errorMessage;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "用户拒绝了位置请求。";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "位置信息不可用。";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "获取位置超时。";
                        break;
                    case error.UNKNOWN_ERROR:
                        errorMessage = "发生未知错误。";
                        break;
                }
                errorCallback(errorMessage);
            }
        );
    } else {
        errorCallback("您的浏览器不支持地理位置功能。");
    }
}

/**
 * 表单验证
 * @param {HTMLFormElement} form - 表单元素
 * @returns {boolean} - 是否验证通过
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            // 清除之前的错误消息
            const existingError = field.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // 添加错误消息
            const errorMessage = document.createElement('span');
            errorMessage.className = 'error-message';
            errorMessage.textContent = `${field.getAttribute('aria-label') || field.getAttribute('placeholder') || '此项'} 不能为空`;
            field.parentElement.appendChild(errorMessage);
        } else {
            field.classList.remove('error');
            const existingError = field.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        }
    });
    
    return isValid;
}

/**
 * 获取API数据
 * @param {string} url - API URL
 * @param {Object} options - 请求选项
 * @returns {Promise} - Promise对象
 */
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('获取数据失败:', error);
        throw error;
    }
} 