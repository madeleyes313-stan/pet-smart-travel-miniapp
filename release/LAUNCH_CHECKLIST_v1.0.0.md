# 微信小程序上线检查清单（v1.0.0）

## A. 代码与仓库
- [ ] `project.config.json` 使用占位 `appid`（`touristappid`）
- [ ] 真实 `AppID/AppSecret` 仅存在本地安全配置，不在公开仓库
- [ ] `release/WECHAT_REVIEW_NOTE_v1.0.0.md` 已准备
- [ ] 已打标签 `v1.0.0`
- [ ] GitHub Secret Scanning 告警已处置并关闭

## B. 微信公众平台配置
- [ ] 小程序主体信息完整（名称、头像、简介）
- [ ] `request` 合法域名已配置：`https://api.pettravel.com`
- [ ] `uploadFile` 合法域名已配置：`https://upload.pettravel.com`
- [ ] `downloadFile` 合法域名已配置：`https://cdn.pettravel.com`
- [ ] `socket` 合法域名已配置：`wss://ws.pettravel.com`
- [ ] 隐私政策与用户协议链接已配置并可访问

## C. 开发者工具与提审包
- [ ] 本地微信开发者工具绑定真实 AppID
- [ ] 能正常编译，不报域名/权限错误
- [ ] 关键页面截图已准备（首页、行程、风险、宠物、我的）
- [ ] 录屏素材已准备（核心体验路径 30-60 秒）
- [ ] 提审描述粘贴自 `WECHAT_REVIEW_NOTE_v1.0.0.md`

## D. 功能冒烟测试（上线前）
- [ ] 首页问答请求成功
- [ ] 行程规划可返回结果
- [ ] 风险评估与提醒订阅可用
- [ ] 宠物档案新增/编辑可用
- [ ] 运营演示按钮仅开发环境可见（如需上线隐藏）

## E. 发布后验证
- [ ] 审核通过后点击发布上线
- [ ] 真机访问核心路径无异常
- [ ] 接口监控无明显 4xx/5xx 抖动
- [ ] 投递可观测面板指标正常（成功率、失败原因、DLQ 趋势）
- [ ] 搜索可见性按预期开启（需等待索引生效）
