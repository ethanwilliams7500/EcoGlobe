# 绿色环保网页项目 - 详细文档

## 项目背景
本项目是一个专注于环境保护和可持续发展的信息门户网站，旨在：
- 提高公众对环境问题的认识
- 提供实用的环保知识和行动指南
- 展示环保组织和倡议
- 促进可持续生活方式

## 技术栈
- 前端: HTML5, CSS3, JavaScript
- 响应式设计: 适配桌面、平板和移动设备
- 动画效果: 使用CSS animations.css实现
- 表单验证: 使用JavaScript实现客户端验证

## 详细功能说明

### 首页 (index.html)
- 展示环保使命宣言和核心价值
- 特色内容轮播图
- 快速导航到主要功能区域
- 最新环保新闻和活动摘要

### 关于我们 (about.html)
- 组织历史和愿景
- 团队成员介绍
- 合作伙伴展示(WWF、联合国环境署等)
- 联系方式和社会媒体链接

### 环保知识库 (knowledge.html)
- 分类环保知识文章
- 气候变化专题
- 可持续发展目标(SDGs)介绍
- 资源下载区(报告、指南等)

### 行动指南 (action.html)
- 个人可采取的环保行动
- 本地环保活动日历
- 志愿者机会
- 环保挑战和成就系统

### 用户系统
- **登录/注册**: 使用表单验证和本地存储
- **仪表板**: 个人环保行动追踪
- **密码重置**: 完整的密码恢复流程

## 文件结构

```
├── css/                  # 样式文件
│   ├── about.css         # 关于页面样式
│   ├── action.css        # 行动页面样式
│   ├── animations.css    # 动画效果
│   ├── dashboard.css     # 仪表板样式
│   ├── form.css          # 表单样式
│   ├── knowledge.css     # 知识库样式
│   └── style.css         # 全局样式
├── images/               # 图片资源
│   ├── greenpeace-logo.png
│   ├── ipcc-logo.png
│   ├── mission.jpg
│   ├── team1.jpg
│   ├── un-logo.png
│   └── wwf-logo.png
├── js/                   # JavaScript文件
│   ├── about.js          # 关于页面脚本
│   ├── knowledge.js      # 知识库脚本
│   └── main.js           # 主脚本文件
├── about.html            # 关于页面
├── action.html           # 行动页面
├── dashboard.html        # 仪表板
├── index.html            # 首页
├── knowledge.html        # 知识库
├── login.html            # 登录页面
├── register.html         # 注册页面
├── reset-confirm.html    # 密码重置确认
└── reset-password.html   # 密码重置
```

## 开发与部署

### 开发环境要求
- 现代浏览器(Chrome/Firefox/Safari最新版)
- 代码编辑器(VSCode推荐)
- Git版本控制(可选)

### 本地运行
1. 克隆仓库或下载ZIP包
2. 直接打开index.html或使用Live Server扩展
3. 所有功能无需后端即可运行

### 生产部署
1. 上传所有文件到Web服务器
2. 确保正确MIME类型设置
3. 建议启用GZIP压缩
4. 可配置HTTPS增强安全性

## 版权与许可
- 图片资源: 仅限教育用途，版权归各自组织所有
- 代码部分: MIT License
- 文档内容: Creative Commons Attribution 4.0

## 贡献

欢迎通过提交Pull Request或Issue来改进本项目。
