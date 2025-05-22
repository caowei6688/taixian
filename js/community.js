/**
 * 社区服务中台 - 功能脚本
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 设置服务卡片按钮监听
    setupServiceButtons();
    
    // 设置表单关闭按钮监听
    setupCloseButtons();
    
    // 设置无障碍设施报修表单监听
    setupRepairForm();
    
    // 设置紧急呼叫按钮监听
    setupEmergencyButtons();
    
    // 设置活动筛选和预约监听
    setupActivityFunctions();
    
    // 加载社区服务数据（实际项目中应从API获取）
    loadCommunityData();
});

/**
 * 设置服务卡片按钮监听
 */
function setupServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            
            // 根据服务类型显示对应表单或面板
            switch (serviceType) {
                case 'repair':
                    document.getElementById('repair-form').style.display = 'flex';
                    break;
                case 'emergency':
                    document.getElementById('emergency-form').style.display = 'flex';
                    // 自动获取当前位置
                    getCurrentLocationForEmergency();
                    break;
                case 'activity':
                    document.getElementById('activity-form').style.display = 'flex';
                    break;
                default:
                    break;
            }
        });
    });
}

/**
 * 设置表单关闭按钮监听
 */
function setupCloseButtons() {
    const closeButtons = document.querySelectorAll('.form-close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取并隐藏父级表单/面板
            const parentForm = this.closest('.service-form');
            if (parentForm) {
                parentForm.style.display = 'none';
                
                // 如果是紧急呼叫面板，重置状态
                if (parentForm.id === 'emergency-form') {
                    resetEmergencyStatus();
                }
            }
        });
    });
}

/**
 * 设置无障碍设施报修表单监听
 */
function setupRepairForm() {
    // 设置获取当前位置按钮
    const locationButton = document.getElementById('get-current-location');
    if (locationButton) {
        locationButton.addEventListener('click', function() {
            // 显示获取位置中消息
            showNotification('正在获取您的位置...', 'info');
            
            // 获取当前位置
            getCurrentLocation(
                // 成功回调
                (coords) => {
                    // 在实际项目中，这里需要进行地理编码转换为具体地址
                    document.getElementById('repair-location').value = `当前位置 (${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)})`;
                    showNotification('已成功获取当前位置', 'success');
                },
                // 错误回调
                (errorMessage) => {
                    showNotification(errorMessage, 'error');
                }
            );
        });
    }
    
    // 设置报修表单提交
    const repairForm = document.getElementById('facility-repair-form');
    if (repairForm) {
        repairForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 表单验证
            if (!validateForm(this)) {
                showNotification('请填写所有必填信息', 'error');
                return;
            }
            
            // 获取报修数据
            const repairType = document.getElementById('repair-type').value;
            const repairLocation = document.getElementById('repair-location').value;
            const repairDescription = document.getElementById('repair-description').value;
            const repairUrgency = document.getElementById('repair-urgency').value;
            
            // 显示提交中消息
            showNotification('正在提交报修信息...', 'info');
            
            // 模拟提交过程（实际项目中应调用API）
            setTimeout(() => {
                // 显示成功消息
                showNotification('报修信息已成功提交，工作人员将尽快处理！', 'success');
                
                // 重置表单
                repairForm.reset();
                
                // 关闭报修表单
                document.getElementById('repair-form').style.display = 'none';
                
                // 更新服务统计数据（实际项目中）
                updateServiceStats();
            }, 1500);
        });
    }
}

/**
 * 更新服务统计数据（模拟）
 */
function updateServiceStats() {
    // 实际项目中应通过API获取最新统计数据
    // 这里仅模拟数据更新
    const repairCountElement = document.querySelector('.stats-grid .stat-card:first-child .stat-number');
    if (repairCountElement) {
        // 将当前数值加1
        const currentCount = parseInt(repairCountElement.textContent.replace(/,/g, ''));
        repairCountElement.textContent = (currentCount + 1).toLocaleString();
    }
}

/**
 * 设置紧急呼叫按钮监听
 */
function setupEmergencyButtons() {
    // 社区服务人员呼叫按钮
    const callCommunityBtn = document.getElementById('call-community');
    if (callCommunityBtn) {
        callCommunityBtn.addEventListener('click', function() {
            startEmergencyCall('社区服务人员', '社区服务中心');
        });
    }
    
    // 120急救呼叫按钮
    const call120Btn = document.getElementById('call-120');
    if (call120Btn) {
        call120Btn.addEventListener('click', function() {
            startEmergencyCall('120急救服务', '120急救中心');
        });
    }
    
    // 紧急联系人通知按钮
    const callContactsBtn = document.getElementById('call-contacts');
    if (callContactsBtn) {
        callContactsBtn.addEventListener('click', function() {
            startEmergencyCall('紧急联系人', '您的紧急联系人');
        });
    }
}

/**
 * 开始紧急呼叫（模拟）
 * @param {string} serviceType - 服务类型
 * @param {string} serviceProvider - 服务提供方
 */
function startEmergencyCall(serviceType, serviceProvider) {
    // 显示状态面板
    const statusPanel = document.getElementById('emergency-status');
    if (statusPanel) {
        statusPanel.style.display = 'flex';
    }
    
    // 更新状态文本
    const statusText = document.querySelector('#emergency-status .status-text');
    if (statusText) {
        statusText.textContent = `正在连接${serviceType}...`;
    }
    
    // 显示通知
    showNotification(`正在连接${serviceType}，请稍候...`, 'info');
    
    // 模拟连接过程（实际项目中应调用通信API）
    setTimeout(() => {
        // 更新状态文本
        if (statusText) {
            statusText.textContent = `已连接${serviceType}，正在传输位置信息...`;
        }
        
        // 再次延迟，模拟连接完成
        setTimeout(() => {
            // 显示成功消息
            showNotification(`已成功通知${serviceProvider}，请保持通话状态`, 'success');
            
            // 更新状态文本
            if (statusText) {
                statusText.textContent = `${serviceProvider}已收到您的求助，正在安排救援...`;
            }
            
            // 实际项目中，这里应保持通信连接状态
        }, 2000);
    }, 2000);
}

/**
 * 获取当前位置用于紧急呼叫
 */
function getCurrentLocationForEmergency() {
    const locationSpan = document.getElementById('current-location');
    if (locationSpan) {
        locationSpan.textContent = '正在获取位置信息...';
        
        // 获取当前位置
        getCurrentLocation(
            // 成功回调
            (coords) => {
                // 在实际项目中，这里需要进行地理编码转换为具体地址
                locationSpan.textContent = `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
            },
            // 错误回调
            (errorMessage) => {
                locationSpan.textContent = '无法获取位置信息';
                showNotification('无法获取位置信息：' + errorMessage, 'error');
            }
        );
    }
}

/**
 * 重置紧急呼叫状态
 */
function resetEmergencyStatus() {
    const statusPanel = document.getElementById('emergency-status');
    if (statusPanel) {
        statusPanel.style.display = 'none';
    }
    
    const locationSpan = document.getElementById('current-location');
    if (locationSpan) {
        locationSpan.textContent = '正在获取位置信息...';
    }
}

/**
 * 设置活动筛选和预约监听
 */
function setupActivityFunctions() {
    // 活动筛选按钮
    const filterBtn = document.getElementById('filter-activity');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            // 获取筛选条件
            const activityType = document.getElementById('activity-type').value;
            const activityDate = document.getElementById('activity-date').value;
            
            // 显示筛选中消息
            showNotification('正在筛选活动...', 'info');
            
            // 模拟筛选过程（实际项目中应调用API）
            setTimeout(() => {
                // 筛选活动（模拟）
                filterActivities(activityType, activityDate);
            }, 800);
        });
    }
    
    // 活动预约按钮（现有活动项）
    setupActivityReservationButtons();
    
    // 分页按钮
    const prevBtn = document.querySelector('#activity-pagination button:first-child');
    const nextBtn = document.querySelector('#activity-pagination button:last-child');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            // 实际项目中应加载上一页活动
            showNotification('加载上一页活动...', 'info');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // 实际项目中应加载下一页活动
            showNotification('加载下一页活动...', 'info');
        });
    }
}

/**
 * 设置活动预约按钮监听
 */
function setupActivityReservationButtons() {
    const reservationButtons = document.querySelectorAll('.activity-action .btn');
    reservationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activityItem = this.closest('.activity-item');
            if (activityItem) {
                const activityTitle = activityItem.querySelector('.activity-title').textContent;
                
                // 显示预约中消息
                showNotification('正在预约活动...', 'info');
                
                // 模拟预约过程（实际项目中应调用API）
                setTimeout(() => {
                    // 显示成功消息
                    showNotification(`您已成功预约"${activityTitle}"活动！`, 'success');
                    
                    // 更新按钮状态
                    this.textContent = '已预约';
                    this.disabled = true;
                    this.classList.add('btn-disabled');
                    
                    // 更新活动参与统计（实际项目中）
                    updateActivityStats();
                }, 1000);
            }
        });
    });
}

/**
 * 更新活动统计数据（模拟）
 */
function updateActivityStats() {
    // 实际项目中应通过API获取最新统计数据
    // 这里仅模拟数据更新
    const participantCountElement = document.querySelector('.stats-grid .stat-card:last-child .stat-number');
    if (participantCountElement) {
        // 将当前数值加1
        const currentCount = parseInt(participantCountElement.textContent.replace(/,/g, ''));
        participantCountElement.textContent = (currentCount + 1).toLocaleString();
    }
}

/**
 * 筛选活动（模拟）
 * @param {string} type - 活动类型
 * @param {string} dateRange - 日期范围
 */
function filterActivities(type, dateRange) {
    console.log('筛选活动:', type, dateRange);
    
    // 这里是模拟，实际项目中应调用API获取筛选结果
    // 模拟筛选完成
    setTimeout(() => {
        // 根据条件显示不同结果
        if (type || dateRange !== 'all') {
            showNotification('找到 3 个匹配活动', 'success');
            
            // 模拟筛选后的结果
            const activityList = document.getElementById('activity-list');
            if (activityList) {
                // 只保留一个活动作为示例（实际应显示筛选结果）
                const firstActivity = activityList.querySelector('.activity-item');
                if (firstActivity) {
                    activityList.innerHTML = '';
                    activityList.appendChild(firstActivity.cloneNode(true));
                    
                    // 更新分页信息
                    const paginationInfo = document.querySelector('#activity-pagination .pagination-info');
                    if (paginationInfo) {
                        paginationInfo.textContent = '第1页 / 共1页';
                    }
                    
                    // 禁用分页按钮
                    const prevBtn = document.querySelector('#activity-pagination button:first-child');
                    const nextBtn = document.querySelector('#activity-pagination button:last-child');
                    if (prevBtn) prevBtn.disabled = true;
                    if (nextBtn) nextBtn.disabled = true;
                    
                    // 重新绑定预约按钮事件
                    setupActivityReservationButtons();
                }
            }
        } else {
            // 如果没有筛选条件，恢复原有活动列表
            loadActivityData();
        }
    }, 500);
}

/**
 * 加载活动数据（实际项目中应从API获取）
 */
function loadActivityData() {
    // 实际项目中应通过API获取数据
    
    // 恢复原始活动列表（示例）
    const activityList = document.getElementById('activity-list');
    if (activityList && activityList.children.length <= 1) {
        // 模拟添加第二个活动（如果当前只有一个）
        const secondActivity = document.createElement('div');
        secondActivity.className = 'activity-item';
        secondActivity.innerHTML = `
            <div class="activity-time">
                <div class="activity-date">6月28日</div>
                <div class="activity-hour">9:30-11:30</div>
            </div>
            <div class="activity-info">
                <h4 class="activity-title">社区适应性瑜伽</h4>
                <div class="activity-meta">
                    <span class="activity-tag">康复锻炼</span>
                    <span class="activity-location">社区康复中心</span>
                    <span class="activity-capacity">剩余名额：5/12</span>
                </div>
                <p class="activity-desc">适应性瑜伽专为行动不便和肢体障碍者设计，通过改良的瑜伽体式，帮助参与者提升身体协调性、平衡能力和心肺功能。</p>
            </div>
            <div class="activity-action">
                <button class="btn">立即预约</button>
            </div>
        `;
        activityList.appendChild(secondActivity);
        
        // 更新分页信息
        const paginationInfo = document.querySelector('#activity-pagination .pagination-info');
        if (paginationInfo) {
            paginationInfo.textContent = '第1页 / 共3页';
        }
        
        // 启用下一页按钮
        const nextBtn = document.querySelector('#activity-pagination button:last-child');
        if (nextBtn) nextBtn.disabled = false;
        
        // 重新绑定预约按钮事件
        setupActivityReservationButtons();
    }
}

/**
 * 加载社区服务数据
 */
function loadCommunityData() {
    // 实际项目中应从API获取服务统计数据、活动列表等
    
    // 创建图像目录和图标（如果需要）
    createPlaceholderImages();
}

/**
 * 创建占位图像（实际项目中应使用真实图像）
 */
function createPlaceholderImages() {
    // 检查是否已存在图标元素
    const serviceIcons = document.querySelectorAll('.service-icon img');
    serviceIcons.forEach(icon => {
        // 如果图像加载失败，使用CSS创建占位图标
        icon.onerror = function() {
            const iconContainer = icon.parentElement;
            icon.style.display = 'none';
            
            // 根据服务类型创建不同的占位符
            let iconText = '';
            if (icon.alt.includes('报修')) {
                iconText = '🔧';
            } else if (icon.alt.includes('紧急')) {
                iconText = '🚨';
            } else if (icon.alt.includes('活动')) {
                iconText = '📅';
            }
            
            // 添加占位文本
            const placeholderText = document.createElement('span');
            placeholderText.className = 'icon-placeholder';
            placeholderText.textContent = iconText;
            placeholderText.style.fontSize = '36px';
            iconContainer.appendChild(placeholderText);
        };
    });
} 