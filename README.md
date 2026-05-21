<p align="center">
  <h1 align="center">@qingpingmo/claude-helper</h1>
  <p align="center">
    <strong>Claude Code 实用技能集</strong>
    <br />
    一键中文化 · 技能管理 · 开箱即用
  </p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@qingpingmo/claude-helper">
    <img src="https://img.shields.io/npm/v/@qingpingmo/claude-helper.svg" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@qingpingmo/claude-helper">
    <img src="https://img.shields.io/npm/dm/@qingpingmo/claude-helper.svg" alt="npm downloads">
  </a>
  <a href="https://github.com/color-dream/claude-helper/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@qingpingmo/claude-helper.svg" alt="license">
  </a>
  <a href="https://github.com/color-dream/claude-helper">
    <img src="https://img.shields.io/github/stars/color-dream/claude-helper?style=social" alt="github stars">
  </a>
</p>

---

## 简介

**@qingpingmo/claude-helper** 是一个 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 技能插件集合，提供中文化、技能管理等实用功能。

安装后，Claude Code 将自动识别并注册这些技能，让你的开发体验更加顺畅。

## 功能特性

### 🌐 中文化技能

让 Claude Code 使用简体中文进行交流、生成文档和提交代码。

| 技能 | 作用范围 | 说明 |
|------|---------|------|
| `/qpm-zh-global` | 全局 | 对所有项目生效 |
| `/qpm-zh-project` | 项目级 | 仅对当前项目生效 |

**启用后效果：**
- 始终使用简体中文回复
- 生成的文档使用中文
- commit message 使用中文（格式：`type: 中文描述`）
- 代码标识符和类型注解保持英文原样

**多种触发方式：**
```
用中文 / 使用中文 / 切换中文 / 说中文 / 中文回复
speak chinese / use chinese / switch to chinese
```

### 🛠️ 技能管家

一站式管理你的所有 Claude Code 技能。

```
/qpm-skill-manager
```

| 功能 | 触发示例 | 说明 |
|------|---------|------|
| 盘点 | `盘点技能` `我有什么技能` | 扫描并分类展示所有技能 |
| 检索 | `找技能` `有没有能做XX的技能` | 按需求匹配推荐技能 |
| 统计 | `技能统计` `哪些技能没用过` | 追踪使用频率和活跃度 |
| 清理 | `清理技能` `帮我删没用的技能` | 智能建议保留或删除 |

## 安装

### 方式一：npm 全局安装（推荐）

```bash
npm install -g @qingpingmo/claude-helper
```

安装完成后自动生效，无需额外配置。

### 方式二：从源码安装

```bash
git clone https://github.com/color-dream/claude-helper.git
cd claude-helper
npm link
```

## 使用方法

### 中文化

在 Claude Code 对话中，使用以下任一方式触发：

```bash
# 斜杠命令
/qpm-zh-global    # 全局中文化
/qpm-zh-project   # 项目级中文化

# 自然语言
用中文
使用中文
切换到中文
```

### 技能管理

```bash
# 斜杠命令
/qpm-skill-manager

# 自然语言
盘点技能
我有什么技能
找技能
技能统计
清理技能
```

## 配置使用追踪（可选）

要让技能管家的「使用统计」和「清理建议」功能生效，需要配置 PostToolUse hook。

在 `~/.claude/settings.json` 中添加：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "skill",
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.claude/skills/qpm-skill-manager/track-usage.js"
          }
        ]
      }
    ]
  }
}
```

配置后，每次调用技能时会自动记录到 `~/.claude/skill-usage.log`。

## 卸载

```bash
npm uninstall -g @qingpingmo/claude-helper
```

## 目录结构

```
@qingpingmo/claude-helper/
├── skills/
│   ├── qpm-zh-global/          # 全局中文化技能
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── template.md
│   ├── qpm-zh-project/         # 项目级中文化技能
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── template.md
│   └── qpm-skill-manager/      # 技能管家
│       ├── SKILL.md
│       └── track-usage.js
├── scripts/
│   ├── cli.js                  # CLI 工具
│   ├── install.js              # 安装脚本
│   └── uninstall.js            # 卸载脚本
├── package.json
├── plugin.json
└── README.md
```

## 开发

```bash
# 克隆仓库
git clone https://github.com/color-dream/claude-helper.git
cd claude-helper

# 本地开发
npm link

# 测试技能
qpm-claude-helper status
```

## 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个 Pull Request

## 许可证

[MIT](LICENSE) © [tianye](https://github.com/color-dream)

---

<p align="center">
  如果这个项目对你有帮助，请给一个 ⭐️ 支持一下！
</p>
