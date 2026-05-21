---
name: qpm-zh-project
description: >
  This skill should be used when the user asks to "qpm-zh-project", "中文模式-项目",
  "项目中文化", "项目级中文", or wants to configure Chinese language for the
  current project only.
allowed-tools: [Read, Write, Edit, Bash, Glob]
---

# Project-level Chinese Configuration

Configure the current project to use Chinese for all interactions and generated documentation.

## Target

File: `.claude/CLAUDE.md` in the current project root (the working directory).

## Steps

1. Create `.claude` directory if it does not exist (`mkdir -p .claude`).
2. Check if `.claude/CLAUDE.md` exists.
3. Read existing content if present.
4. Check if a Chinese language section already exists by searching for `<!-- zh-helper:start -->`.
   - If found, replace the block between `<!-- zh-helper:start -->` and `<!-- zh-helper:end -->` with the template.
   - If not found, append the template to the end of the file.
5. If the file does not exist, create it with the template as its full content.
6. Read the template from [references/template.md](references/template.md).
7. Report: "已为当前项目启用中文模式 (.claude/CLAUDE.md)".

## Important

- Never remove existing .claude/CLAUDE.md content. Only append or update the marked section.
- Preserve existing line endings and encoding.
