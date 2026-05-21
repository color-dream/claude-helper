#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const PLUGIN_NAME = "claude-helper";
const TARGET_DIR = path.join(os.homedir(), ".claude", "plugins", PLUGIN_NAME);

const args = process.argv.slice(2);
const command = args[0];

function status() {
  const exists = fs.existsSync(TARGET_DIR);
  if (exists) {
    const skillsDir = path.join(TARGET_DIR, "skills");
    const skills = fs.existsSync(skillsDir)
      ? fs.readdirSync(skillsDir).filter((d) => fs.existsSync(path.join(skillsDir, d, "SKILL.md")))
      : [];
    console.log(`[${PLUGIN_NAME}] Installed at: ${TARGET_DIR}`);
    console.log(`[${PLUGIN_NAME}] Skills: ${skills.join(", ")}`);
  } else {
    console.log(`[${PLUGIN_NAME}] Not installed. Run 'npm install -g claude-helper' to install.`);
  }
}

function help() {
  console.log(`
${PLUGIN_NAME} - Claude Code helper skills

Usage:
  claude-helper status    Show installation status
  claude-helper help      Show this help

Skills (available after install):
  /qpm-zh-project         Enable Chinese mode for current project
  /qpm-zh-global          Enable Chinese mode for all projects (user-level)

Install:
  npm install -g claude-helper

Uninstall:
  npm uninstall -g claude-helper
`);
}

switch (command) {
  case "status":
    status();
    break;
  case "help":
  case "--help":
  case "-h":
    help();
    break;
  default:
    help();
}
