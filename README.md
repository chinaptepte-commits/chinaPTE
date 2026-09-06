# chinaPTE · PTE Academic 全题型零成本练习站

华人 PTE 备考静态站：暗色 UI + 耳机随身听（Web Speech API）+ 出国劳务软性留资。

## 快速打开

1. 解压 `/workspace/chinaPTE-site.zip`（或本文件夹）
2. Chrome / Edge 打开 `index.html` 或 `practice.html`
3. 单文件双击：
   - `chinaPTE-随身听.html` — WFD
   - `chinaPTE-RS随身听.html` — RS

详见 `打开说明.txt`。

## 题型

| 类型 | 页面 | 题量约 |
|------|------|--------|
| WFD | wfd.html | 133 |
| RS | rs.html | 85 |
| RL | rl.html | 26 |
| ASQ | asq.html | 42 |
| SST | sst.html | 21 |
| HIW | hiw.html | 21 |
| RA | ra.html | 41 |
| DI | di.html | 21 |
| SWT | swt.html | 20 |
| Essay | essay.html | 16 |
| Reading | reading.html | 30 |
| Listening | listening.html | 32 |

共享播放器：`player.js`（Play All / 语速 / 中文开关 / 今日计数 / 续听 / 筛选）

## 本地预览

```bash
cd chinaPTE-wfd-listen && python3 -m http.server 8080
```

## 技术

- 纯静态 · 无后端 · Web Speech API · localStorage（按题型分 key）
- 留资 mock：`consult.html` + `lead.js`
