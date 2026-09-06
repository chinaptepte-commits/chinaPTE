# chinaPTE · PTE Academic 全题型零成本练习站

华人 PTE 备考静态站：暗色 UI + 耳机随身听（Web Speech API）+ 出国劳务软性留资。

## 快速打开

1. 解压本文件夹
2. Chrome / Edge 打开 `index.html`、`practice.html` 或 `体验全部功能.html`
3. 单文件双击：
   - `chinaPTE-随身听.html` — WFD
   - `chinaPTE-RS随身听.html` — RS
   - `chinaPTE-单词随身听.html` — 单词库

详见 `打开说明.txt`。

## 出国劳务页 + 后台

| 页面 | 说明 |
|------|------|
| `labor.html` | 公开「考不过怎么办 / 出国劳务」引导页（读 `content/labor.json`） |
| `admin/` | 零成本后台：改文案并用 GitHub Contents API 写回仓库 |
| `admin/config.js` | **改密码**：`window.ADMIN_PASSWORD`（默认 `chinaPTE2026`，请尽快修改） |

线上：

- https://chinaptepte-commits.github.io/chinaPTE/labor.html
- https://chinaptepte-commits.github.io/chinaPTE/admin/

后台保存需要你自己的 GitHub classic PAT（`repo` scope），Token 只存在浏览器 session/localStorage。

## 题型

| 类型 | 页面 | 题量约 |
|------|------|--------|
| WFD | wfd.html | 133+ |
| RS | rs.html | 85+ |
| RL | rl.html | 26+ |
| ASQ | asq.html | 42+ |
| SST | sst.html | 21+ |
| HIW | hiw.html | 21+ |
| RA | ra.html | 41+ |
| DI | di.html | 21+ |
| SWT | swt.html | 20+ |
| Essay | essay.html | 16+ |
| Reading | reading.html | 30+ |
| Listening | listening.html | 32+ |

共享播放器：`player.js`（Play All / 语速 / 中文开关 / 今日计数 / 续听 / 筛选）

## 本地预览

```bash
cd chinaPTE-wfd-listen && python3 -m http.server 8080
```

## 合规

仅提供 PTE 练习与正规出国劳务 / 海外就业信息咨询。禁止考试舞弊相关内容。不承诺签证或工作结果。

## 技术

- 纯静态 · 无后端 · Web Speech API · localStorage（按题型分 key）
- 留资 mock：`consult.html` + `lead.js`
- 劳务文案：`content/labor.json` + `admin/`（GitHub API 更新）
