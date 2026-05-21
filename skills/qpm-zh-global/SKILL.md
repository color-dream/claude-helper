---
name: qpm-zh-global
description: >
  This skill should be used when the user asks to "qpm-zh-global", "中文模式-全局",
  "全局中文化", "用户中文化", or wants to configure Chinese language at the
  user level for all projects.
allowed-tools: [Read, Write, Edit, Bash, Glob]
---

# User-level Chinese Configuration

Configure user-level Chinese language for all Claude Code interactions and generated documentation.

## Target

File: `~/.claude/CLAUDE.md` (user home directory, applies to all projects).

## Steps

1. Expand `~` to the actual home directory path.
2. Check if `~/.claude/CLAUDE.md` exists.
3. Read existing content if present.
4. Check if a Chinese language section already exists by searching for `<!-- zh-helper:start -->`.
   - If found, replace the block between `<!-- zh-helper:start -->` and `<!-- zh-helper:end -->` with the template.
   - If not found, append the template to the end of the file.
5. If the file does not exist, create it with the template as its full content.
6. Read the template from [references/template.md](references/template.md).
7. Report: "已为用户级别启用中文模式 (~/.claude/CLAUDE.md)，所有项目生效".

## Important

- Never remove existing CLAUDE.md content. Only append or update the marked section.
- Preserve existing line endings and encoding.
