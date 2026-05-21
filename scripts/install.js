#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const PLUGIN_NAME = "qpm-claude-helper";
const SOURCE_DIR = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(os.homedir(), ".claude", "skills");

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function install() {
  // Skip in CI or if already installed from this source
  if (process.env.CI || process.env.npm_config_global === "false") {
    return;
  }

  // Check if running as global install
  const isGlobal =
    process.env.npm_config_global === "true" ||
    process.env.npm_lifecycle_event === "postinstall";

  if (!isGlobal && !process.env.CLAUDE_HELPER_FORCE_INSTALL) {
    console.log(`[${PLUGIN_NAME}] Local install detected, skipping plugin setup.`);
    console.log(`[${PLUGIN_NAME}] Run 'npm install -g' or set CLAUDE_HELPER_FORCE_INSTALL=1 to install.`);
    return;
  }

  // Copy each skill to ~/.claude/skills/
  const skillsSource = path.join(SOURCE_DIR, "skills");
  const installedSkills = [];

  for (const skillName of fs.readdirSync(skillsSource)) {
    const skillSrc = path.join(skillsSource, skillName);
    const skillDest = path.join(SKILLS_DIR, skillName);

    if (!fs.statSync(skillSrc).isDirectory()) continue;

    // Remove old skill if exists
    if (fs.existsSync(skillDest)) {
      fs.rmSync(skillDest, { recursive: true, force: true });
    }

    copyRecursive(skillSrc, skillDest);
    installedSkills.push(`/${skillName}`);
  }

  console.log(`[${PLUGIN_NAME}] Skills installed to ${SKILLS_DIR}`);
  console.log(`[${PLUGIN_NAME}] Skills available: ${installedSkills.join(", ")}`);
}

try {
  install();
} catch (err) {
  console.error(`[${PLUGIN_NAME}] Install failed:`, err.message);
  // Don't fail npm install
  process.exit(0);
}
