# qpm-claude-helper

Claude Code 实用技能集，安装后自动注册为 Claude Code 插件。

## 安装

```bash
npm install -g qpm-claude-helper
```

安装完成后自动生效，无需额外配置。

## 技能列表

### /qpm-zh-project — 项目级中文化

在当前项目的 `CLAUDE.md` 中注入中文语言设置，仅对当前项目生效。

```
/qpm-zh-project
```

### /qpm-zh-global — 全局中文化

在 `~/.claude/CLAUDE.md` 中注入中文语言设置，对所有项目生效。

```
/qpm-zh-global
```

### /skill-manager — 技能管家

盘点、检索、分析你安装的所有 Claude Code 技能，追踪使用频率，建议清理。

```
/skill-manager
```

**功能：**

| 意图 | 示例 |
|------|------|
| 盘点 | `盘点技能` `我有什么技能` `技能清单` |
| 检索 | `找技能` `有没有能做XX的技能` `推荐技能` |
| 统计 | `技能统计` `哪些技能没用过` `使用频率` |
| 清理 | `清理技能` `帮我删没用的技能` |

**配置使用追踪（可选）：**

要让「使用统计」和「清理建议」功能生效，需要配置 PostToolUse hook。

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
            "command": "node ~/.claude/skills/skill-manager/track-usage.js"
          }
        ]
      }
    ]
  }
}
```

配置后，每次调用技能时会自动记录到 `~/.claude/skill-usage.log`。

## 效果

启用中文化后，Claude Code 在该项目/全局范围内将：

- 始终使用简体中文回复
- 生成的文档使用中文
- commit message 使用中文（格式：`type: 中文描述`）
- 代码标识符和类型注解保持英文原样

## 卸载

```bash
npm uninstall -g qpm-claude-helper
```

## 开发

```bash
git clone <repo-url>
cd qpm-claude-helper
npm link
```

## License

MIT
