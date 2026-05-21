#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const PLUGIN_NAME = "qpm-claude-helper";
const SKILLS_DIR = path.join(os.homedir(), ".claude", "skills");
const SKILLS = ["qpm-zh-global", "qpm-zh-project", "qpm-skill-manager"];

function uninstall() {
  for (const skillName of SKILLS) {
    const skillDir = path.join(SKILLS_DIR, skillName);
    if (fs.existsSync(skillDir)) {
      fs.rmSync(skillDir, { recursive: true, force: true });
      console.log(`[${PLUGIN_NAME}] Removed ${skillDir}`);
    }
  }
}

try {
  uninstall();
} catch (err) {
  console.error(`[${PLUGIN_NAME}] Uninstall cleanup failed:`, err.message);
  process.exit(0);
}
