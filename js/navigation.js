/**
 * 无障碍导航引擎 - 导航功能脚本
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化地图
    initMap();
    
    // 设置导航表单监听
    setupNavigationForm();
    
    // 设置"使用当前位置"按钮
    setupLocationButton();
});

// 存储地图对象
let map = null;
// 存储当前位置标记
let currentPositionMarker = null;
// 存储路径规划路线
let routePath = null;

/**
 * 初始化地图
 */
function initMap() {
    // 这里仅为模拟，实际项目中应集成真实地图API（高德地图、百度地图或Leaflet+OSM等）
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        // 模拟地图加载过程
        mapContainer.innerHTML = '<div class="map-loading">地图加载中...</div>';
        
        // 模拟加载延迟
        setTimeout(() => {
            mapContainer.innerHTML = '<div class="map-placeholder">地图已加载（实际项目中需集成地图API）</div>';
            // 显示成功消息
            showNotification('地图加载成功', 'success');
        }, 1000);
    }
}

/**
 * 设置导航表单监听
 */
function setupNavigationForm() {
    const navigationForm = document.getElementById('navigation-form');
    if (navigationForm) {
        navigationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 表单验证
            if (!validateForm(this)) {
                showNotification('请填写所有必填信息', 'error');
                return;
            }
            
            // 获取表单数据
            const startLocation = document.getElementById('start-location').value;
            const endLocation = document.getElementById('end-location').value;
            const rampPriority = document.getElementById('ramp-priority').checked;
            const elevatorAccess = document.getElementById('elevator-access').checked;
            const avoidObstacles = document.getElementById('avoid-obstacles').checked;
            
            // 显示导航计算中消息
            showNotification('正在计算最佳路线...', 'info');
            
            // 模拟路径规划过程（实际应调用导航API）
            setTimeout(() => {
                // 计算路线（模拟）
                calculateRoute(startLocation, endLocation, {
                    rampPriority,
                    elevatorAccess,
                    avoidObstacles
                });
            }, 1500);
        });
    }
}

/**
 * 设置"使用当前位置"按钮
 */
function setupLocationButton() {
    const locationButton = document.getElementById('use-current-location');
    if (locationButton) {
        locationButton.addEventListener('click', function() {
            // 显示获取位置中消息
            showNotification('正在获取您的位置...', 'info');
            
            // 获取当前位置
            getCurrentLocation(
                // 成功回调
                (coords) => {
                    // 在实际项目中，这里需要进行地理编码转换为地址
                    document.getElementById('start-location').value = `当前位置 (${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)})`;
                    showNotification('已成功获取当前位置', 'success');
                    
                    // 在地图上标记当前位置（实际项目中）
                    markCurrentPosition(coords);
                },
                // 错误回调
                (errorMessage) => {
                    showNotification(errorMessage, 'error');
                }
            );
        });
    }
}

/**
 * 在地图上标记当前位置（模拟）
 * @param {Object} coords - 包含经纬度的坐标对象
 */
function markCurrentPosition(coords) {
    console.log('标记当前位置:', coords);
    // 实际项目中应使用地图API添加标记
}

/**
 * 计算路线（模拟）
 * @param {string} start - 起点
 * @param {string} end - 终点
 * @param {Object} options - 路线规划选项
 */
function calculateRoute(start, end, options) {
    console.log('计算路线:', start, end, options);
    
    // 这里是模拟，实际项目中应调用导航API
    // 例如高德地图、百度地图或其他支持无障碍路径规划的服务
    
    // 模拟路径计算完成
    setTimeout(() => {
        showNotification('路线规划完成！', 'success');
        
        // 显示导航结果（模拟）
        displayNavigationResults();
    }, 1000);
}

/**
 * 显示导航结果（模拟）
 */
function displayNavigationResults() {
    // 在真实项目中，这里应该渲染实际的路线和导航指令
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        // 添加模拟的路线显示
        const routeDisplay = document.createElement('div');
        routeDisplay.className = 'route-simulation';
        routeDisplay.innerHTML = `
            <h4>模拟路线导航</h4>
            <div class="route-steps">
                <div class="route-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <p>从<strong>当前位置</strong>出发，沿着<strong>主路</strong>向东走约<strong>50米</strong></p>
                    </div>
                </div>
                <div class="route-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <p>在<strong>十字路口</strong>处，使用<strong>无障碍坡道</strong>过马路</p>
                        <div class="step-note">注意：此处有坡道辅助设施</div>
                    </div>
                </div>
                <div class="route-step">
                    <span class="step-number">3</span>
                    <div class="step-content">
                        <p>沿<strong>人行道</strong>向北走约<strong>100米</strong>，在<strong>第三个路口</strong>右转</p>
                    </div>
                </div>
                <div class="route-step">
                    <span class="step-number">4</span>
                    <div class="step-content">
                        <p>向东走约<strong>30米</strong>，使用<strong>电梯</strong>上到<strong>2楼</strong></p>
                        <div class="step-note">注意：电梯位于建筑物右侧</div>
                    </div>
                </div>
                <div class="route-step">
                    <span class="step-number">5</span>
                    <div class="step-content">
                        <p>出电梯后直行约<strong>20米</strong>，到达<strong>目的地</strong></p>
                    </div>
                </div>
            </div>
            <div class="route-summary">
                <p>总距离：约 <strong>200米</strong> | 预计时间：<strong>5分钟</strong></p>
                <p>路线特点：全程无障碍通道，有2处坡道，使用1次电梯</p>
            </div>
            <div class="route-actions">
                <button class="btn btn-primary start-navigation">开始语音导航</button>
                <button class="btn">分享路线</button>
            </div>
        `;
        
        // 替换地图显示内容
        mapContainer.innerHTML = '';
        mapContainer.appendChild(routeDisplay);
        
        // 添加开始导航按钮的监听
        const startNavBtn = mapContainer.querySelector('.start-navigation');
        if (startNavBtn) {
            startNavBtn.addEventListener('click', function() {
                showNotification('语音导航已启动，请开始前进', 'success');
                // 实际项目中这里应启动实时语音导航
                simulateVoiceGuidance();
            });
        }
    }
}

/**
 * 模拟语音导航
 */
function simulateVoiceGuidance() {
    // 这是模拟的语音导航，实际项目中应使用Web Speech API或其他语音合成技术
    const voiceMessages = [
        '从当前位置出发，沿着主路向东走约50米',
        '前方10米处有一个十字路口，请使用右侧的无障碍坡道过马路',
        '过马路后，沿人行道向北走约100米，在第三个路口右转',
        '向东走约30米，前方右侧有电梯，请使用电梯上到2楼',
        '出电梯后直行约20米，到达目的地'
    ];
    
    let messageIndex = 0;
    
    // 显示第一条语音指令
    showVoiceMessage(voiceMessages[messageIndex]);
    
    // 模拟定时播放后续指令
    const voiceInterval = setInterval(() => {
        messageIndex++;
        if (messageIndex < voiceMessages.length) {
            showVoiceMessage(voiceMessages[messageIndex]);
        } else {
            clearInterval(voiceInterval);
            setTimeout(() => {
                showNotification('您已到达目的地！', 'success');
            }, 1000);
        }
    }, 5000);
}

/**
 * 显示语音消息
 * @param {string} message - 语音消息内容
 */
function showVoiceMessage(message) {
    // 创建语音消息元素
    const voiceElement = document.createElement('div');
    voiceElement.className = 'voice-message';
    voiceElement.innerHTML = `
        <div class="voice-icon">
            <i class="voice-wave"></i>
        </div>
        <div class="voice-text">${message}</div>
    `;
    
    // 添加到页面
    document.body.appendChild(voiceElement);
    
    // 显示消息
    setTimeout(() => {
        voiceElement.classList.add('show');
    }, 10);
    
    // 自动移除
    setTimeout(() => {
        voiceElement.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(voiceElement);
        }, 500);
    }, 4000);
    
    // 实际项目中，这里应调用语音合成API朗读消息
    console.log('语音导航:', message);
} 