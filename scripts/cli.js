#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const PLUGIN_NAME = "qpm-claude-helper";
const SKILLS_DIR = path.join(os.homedir(), ".claude", "skills");
const SKILLS = ["qpm-zh-global", "qpm-zh-project"];

function status() {
  const installed = SKILLS.filter((name) =>
    fs.existsSync(path.join(SKILLS_DIR, name, "SKILL.md"))
  );

  if (installed.length > 0) {
    console.log(`[${PLUGIN_NAME}] Skills installed in: ${SKILLS_DIR}`);
    console.log(`[${PLUGIN_NAME}] Skills: ${installed.map((s) => "/" + s).join(", ")}`);
  } else {
    console.log(`[${PLUGIN_NAME}] Not installed. Run 'npm install -g qpm-claude-helper' to install.`);
  }
}

function help() {
  console.log(`
${PLUGIN_NAME} - Claude Code helper skills

Usage:
  qpm-claude-helper status    Show installation status
  qpm-claude-helper help      Show this help

Skills (available after install):
  /qpm-zh-project         Enable Chinese mode for current project
  /qpm-zh-global          Enable Chinese mode for all projects (user-level)

Install:
  npm install -g qpm-claude-helper

Uninstall:
  npm uninstall -g qpm-claude-helper
`);
}

const args = process.argv.slice(2);
const command = args[0];

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
