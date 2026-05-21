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

File: `CLAUDE.md` in the current project root (the working directory).

## Steps

1. Check if `CLAUDE.md` exists in the project root.
2. Read existing content if present.
3. Check if a Chinese language section already exists by searching for `<!-- zh-helper:start -->`.
   - If found, replace the block between `<!-- zh-helper:start -->` and `<!-- zh-helper:end -->` with the template.
   - If not found, append the template to the end of the file.
4. If the file does not exist, create it with the template as its full content.
5. Read the template from [references/template.md](references/template.md).
6. Report: "已为当前项目启用中文模式 (CLAUDE.md)".

## Important

- Never remove existing CLAUDE.md content. Only append or update the marked section.
- Preserve existing line endings and encoding.
