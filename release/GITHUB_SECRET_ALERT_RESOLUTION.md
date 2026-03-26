# GitHub Secret Alert Resolution Note

## 中文版（可直接粘贴到告警处理备注）
本仓库已完成以下处置，相关暴露风险已收敛：

1. 已将公开代码中的微信 `appid` 替换为占位值 `touristappid`，不再提交真实标识符。  
2. 已执行 Git 历史重写并强制推送，移除历史提交中的旧值。  
3. 已清理本地历史引用并确认当前分支历史中不再包含暴露字符串。  
4. 已执行凭据轮换流程（建议：在微信公众平台再次确认当前有效 `AppSecret` 为最新值）。  
5. 后续将通过本地私有配置注入真实值，公开仓库仅保留占位配置。  

当前状态：该告警对应内容已清理，风险已受控，可关闭告警。

---

## English Version (for GitHub security alert resolution comment)
The exposed value has been remediated and risk is contained:

1. Replaced the public WeChat `appid` in repository files with a placeholder (`touristappid`).  
2. Rewrote Git history and force-pushed to remove historical occurrences.  
3. Cleaned local original refs/reflogs and verified the exposed string no longer exists in branch history.  
4. Performed credential rotation workflow (recommended: verify latest active `AppSecret` in WeChat console).  
5. Going forward, real identifiers/secrets are injected through private local config only, not public repo files.  

Current status: the exposure has been removed and this alert can be marked as resolved.
