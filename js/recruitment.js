/**
 * 无障碍招聘平台 - 招聘功能脚本
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 设置岗位搜索表单监听
    setupJobSearchForm();
    
    // 设置AI智能匹配按钮监听
    setupAIMatchButton();
    
    // 设置分页按钮监听
    setupPagination();
    
    // 加载示例岗位数据（实际项目中应从API获取）
    loadJobData();
});

/**
 * 设置岗位搜索表单监听
 */
function setupJobSearchForm() {
    const searchForm = document.getElementById('job-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取搜索参数
            const keyword = document.getElementById('job-keyword').value;
            const location = document.getElementById('job-location').value;
            const category = document.getElementById('job-category').value;
            const disabilityType = document.getElementById('disability-type').value;
            
            // 显示搜索中消息
            showNotification('正在搜索匹配岗位...', 'info');
            
            // 更新筛选标签
            updateFilterTags(keyword, location, category, disabilityType);
            
            // 模拟搜索过程（实际项目中应调用API）
            setTimeout(() => {
                // 搜索岗位（模拟）
                searchJobs({
                    keyword,
                    location,
                    category,
                    disabilityType
                });
            }, 1000);
        });
    }
}

/**
 * 更新筛选标签显示
 */
function updateFilterTags(keyword, location, category, disabilityType) {
    const filterTagsContainer = document.getElementById('filter-tags');
    if (filterTagsContainer) {
        // 清空现有标签
        filterTagsContainer.innerHTML = '';
        
        // 添加关键词标签
        if (keyword) {
            addFilterTag(filterTagsContainer, `关键词: ${keyword}`);
        }
        
        // 添加地点标签
        if (location) {
            addFilterTag(filterTagsContainer, `地点: ${location}`);
        }
        
        // 添加职位类别标签
        if (category) {
            const categoryText = document.querySelector(`#job-category option[value="${category}"]`).textContent;
            addFilterTag(filterTagsContainer, `类别: ${categoryText}`);
        }
        
        // 添加残障类型标签
        if (disabilityType) {
            const disabilityText = document.querySelector(`#disability-type option[value="${disabilityType}"]`).textContent;
            addFilterTag(filterTagsContainer, `残障类型: ${disabilityText}`);
        }
    }
}

/**
 * 添加单个筛选标签
 */
function addFilterTag(container, text) {
    const tag = document.createElement('span');
    tag.className = 'filter-tag';
    tag.innerHTML = `${text} <button class="tag-remove">×</button>`;
    container.appendChild(tag);
    
    // 添加删除标签的点击事件
    const removeButton = tag.querySelector('.tag-remove');
    if (removeButton) {
        removeButton.addEventListener('click', function() {
            container.removeChild(tag);
            // 实际项目中应重新搜索
        });
    }
}

/**
 * 搜索岗位（模拟）
 * @param {Object} params - 搜索参数
 */
function searchJobs(params) {
    console.log('搜索岗位:', params);
    
    // 这里是模拟，实际项目中应调用API获取数据
    // 模拟搜索完成
    setTimeout(() => {
        showNotification('找到 15 个匹配岗位', 'success');
        
        // 模拟加载新的岗位数据
        const jobsContainer = document.getElementById('jobs-container');
        if (jobsContainer) {
            // 清空现有岗位
            jobsContainer.innerHTML = '';
            
            // 添加模拟岗位数据
            const mockJobs = [
                {
                    title: '前端开发工程师（远程）',
                    salary: '12000-18000元/月',
                    company: 'ABC科技有限公司',
                    location: '北京',
                    tag: '视障友好',
                    description: '负责公司产品的前端开发工作，包括Web界面设计与实现。要求熟悉HTML、CSS、JavaScript等前端技术，有React或Vue框架经验者优先。',
                    date: '2023-06-16'
                },
                {
                    title: '行政助理',
                    salary: '5000-7000元/月',
                    company: '环球贸易集团',
                    location: params.location || '上海',
                    tag: '肢障友好',
                    description: '负责日常行政事务、文件整理、会议安排等工作。要求有良好的沟通能力和办公软件使用经验。',
                    date: '2023-06-15'
                },
                {
                    title: '客户服务专员',
                    salary: '6000-8000元/月',
                    company: '阳光保险',
                    location: '广州',
                    tag: '听障友好',
                    description: '负责接收和处理客户书面咨询，解决客户问题并提供相关产品信息。要求有良好的书面表达能力和耐心细致的服务态度。',
                    date: '2023-06-14'
                }
            ];
            
            // 根据关键词筛选（简单模拟）
            let filteredJobs = mockJobs;
            if (params.keyword) {
                const keyword = params.keyword.toLowerCase();
                filteredJobs = mockJobs.filter(job => 
                    job.title.toLowerCase().includes(keyword) || 
                    job.company.toLowerCase().includes(keyword) ||
                    job.description.toLowerCase().includes(keyword)
                );
            }
            
            // 渲染岗位卡片
            filteredJobs.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.className = 'job-card';
                jobCard.innerHTML = `
                    <div class="job-header">
                        <h4 class="job-title">${job.title}</h4>
                        <span class="job-salary">${job.salary}</span>
                    </div>
                    <div class="job-company">
                        <p>${job.company} · ${job.location}</p>
                        <span class="job-tag">${job.tag}</span>
                    </div>
                    <div class="job-description">
                        <p>${job.description}</p>
                    </div>
                    <div class="job-footer">
                        <span class="job-date">发布于 ${job.date}</span>
                        <a href="#" class="btn btn-small job-apply-btn">申请职位</a>
                    </div>
                `;
                jobsContainer.appendChild(jobCard);
            });
            
            // 如果没有找到匹配岗位
            if (filteredJobs.length === 0) {
                jobsContainer.innerHTML = '<div class="no-results">没有找到匹配的岗位，请尝试调整搜索条件</div>';
            }
            
            // 更新分页信息
            updatePagination(1, Math.ceil(filteredJobs.length / 10));
            
            // 绑定申请按钮事件
            setupApplyButtons();
        }
    }, 500);
}

/**
 * 更新分页信息
 * @param {number} currentPage - 当前页码
 * @param {number} totalPages - 总页数
 */
function updatePagination(currentPage, totalPages) {
    const paginationInfo = document.querySelector('#job-pagination .pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `第${currentPage}页 / 共${totalPages}页`;
    }
    
    const prevBtn = document.querySelector('#job-pagination button:first-child');
    const nextBtn = document.querySelector('#job-pagination button:last-child');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage <= 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage >= totalPages;
    }
}

/**
 * 设置分页按钮监听
 */
function setupPagination() {
    const prevBtn = document.querySelector('#job-pagination button:first-child');
    const nextBtn = document.querySelector('#job-pagination button:last-child');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            // 实际项目中应分页加载数据
            showNotification('加载上一页...', 'info');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // 实际项目中应分页加载数据
            showNotification('加载下一页...', 'info');
        });
    }
}

/**
 * 设置申请按钮事件
 */
function setupApplyButtons() {
    const applyButtons = document.querySelectorAll('.job-apply-btn');
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const jobTitle = this.closest('.job-card').querySelector('.job-title').textContent;
            showNotification(`您已成功申请"${jobTitle}"职位`, 'success');
        });
    });
}

/**
 * 设置AI智能匹配按钮监听
 */
function setupAIMatchButton() {
    const aiMatchBtn = document.getElementById('ai-match-btn');
    const aiMatchPanel = document.getElementById('ai-match-panel');
    const closeAiPanel = document.getElementById('close-ai-panel');
    
    if (aiMatchBtn && aiMatchPanel) {
        // 打开AI匹配面板
        aiMatchBtn.addEventListener('click', function() {
            aiMatchPanel.style.display = 'flex';
        });
        
        // 关闭AI匹配面板
        if (closeAiPanel) {
            closeAiPanel.addEventListener('click', function() {
                aiMatchPanel.style.display = 'none';
            });
        }
        
        // 设置个人画像表单提交
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // 获取个人画像数据
                const education = document.getElementById('education').value;
                const experience = document.getElementById('experience').value;
                const skills = document.getElementById('skills').value;
                
                // 获取兴趣领域
                const interests = [];
                document.querySelectorAll('.interest-tag input:checked').forEach(checkbox => {
                    interests.push(checkbox.value);
                });
                
                // 显示匹配中消息
                showNotification('AI正在分析您的个人画像，匹配最适合的岗位...', 'info');
                
                // 关闭面板
                aiMatchPanel.style.display = 'none';
                
                // 模拟AI匹配过程（实际项目中应调用AI匹配API）
                setTimeout(() => {
                    // 模拟匹配结果
                    const mockMatchResult = {
                        matchScore: 89,
                        jobCount: 5,
                        topJobs: [
                            {
                                title: '数据分析师（远程）',
                                salary: '10000-15000元/月',
                                company: '数据智能科技',
                                location: '全国',
                                tag: '视障友好',
                                description: '负责数据收集、整理与分析，生成业务报告。要求熟悉Excel、SQL，有数据分析经验。',
                                matchReason: '与您的技能和教育背景高度匹配',
                                matchRate: 95
                            },
                            {
                                title: '内容编辑',
                                salary: '7000-9000元/月',
                                company: '新媒体集团',
                                location: '北京',
                                tag: '肢障友好',
                                description: '负责内容审核、编辑和发布，维护内容质量。要求有良好的文字功底和内容策划能力。',
                                matchReason: '与您的兴趣领域匹配',
                                matchRate: 88
                            }
                        ]
                    };
                    
                    // 显示AI匹配结果
                    showAIMatchResults(mockMatchResult);
                }, 2000);
            });
        }
    }
}

/**
 * 显示AI匹配结果（模拟）
 * @param {Object} result - 匹配结果
 */
function showAIMatchResults(result) {
    // 显示成功消息
    showNotification(`AI匹配完成！为您找到 ${result.jobCount} 个匹配度高的岗位`, 'success');
    
    // 清空岗位列表并添加AI匹配结果
    const jobsContainer = document.getElementById('jobs-container');
    if (jobsContainer) {
        jobsContainer.innerHTML = '';
        
        // 添加匹配分数信息
        const matchInfoDiv = document.createElement('div');
        matchInfoDiv.className = 'match-info';
        matchInfoDiv.innerHTML = `
            <div class="match-header">
                <h3>AI智能匹配结果</h3>
                <div class="match-score">
                    <div class="score-circle">${result.matchScore}</div>
                    <span>匹配度</span>
                </div>
            </div>
            <p>根据您的个人画像，AI为您推荐以下最适合的岗位：</p>
        `;
        jobsContainer.appendChild(matchInfoDiv);
        
        // 添加匹配岗位
        result.topJobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card match-job-card';
            jobCard.innerHTML = `
                <div class="job-header">
                    <h4 class="job-title">${job.title}</h4>
                    <div class="match-rate">
                        <span class="match-percentage">${job.matchRate}%</span>
                        <span class="match-label">匹配度</span>
                    </div>
                </div>
                <div class="job-company">
                    <p>${job.company} · ${job.location}</p>
                    <span class="job-tag">${job.tag}</span>
                </div>
                <div class="job-description">
                    <p>${job.description}</p>
                </div>
                <div class="match-reason">
                    <p><strong>匹配原因：</strong> ${job.matchReason}</p>
                </div>
                <div class="job-footer">
                    <span class="job-salary">${job.salary}</span>
                    <a href="#" class="btn btn-primary job-apply-btn">立即申请</a>
                </div>
            `;
            jobsContainer.appendChild(jobCard);
        });
        
        // 绑定申请按钮事件
        setupApplyButtons();
    }
    
    // 更新筛选标签
    const filterTagsContainer = document.getElementById('filter-tags');
    if (filterTagsContainer) {
        filterTagsContainer.innerHTML = '<span class="filter-tag ai-tag">AI智能匹配 <button class="tag-remove">×</button></span>';
        
        // 添加删除标签的点击事件
        const removeButton = filterTagsContainer.querySelector('.tag-remove');
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                filterTagsContainer.innerHTML = '';
                // 重新加载常规岗位
                loadJobData();
            });
        }
    }
}

/**
 * 加载岗位数据（实际项目中应从API获取）
 */
function loadJobData() {
    // 实际项目中应通过API获取数据
    // 这里仅使用静态数据作为示例
} 