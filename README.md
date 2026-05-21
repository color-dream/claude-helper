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

## 效果

启用后，Claude Code 在该项目/全局范围内将：

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
