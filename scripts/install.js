#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const PLUGIN_NAME = "claude-helper";
const SOURCE_DIR = path.resolve(__dirname, "..");
const TARGET_DIR = path.join(os.homedir(), ".claude", "plugins", PLUGIN_NAME);

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

  // Remove old installation if exists
  if (fs.existsSync(TARGET_DIR)) {
    fs.rmSync(TARGET_DIR, { recursive: true, force: true });
  }

  // Copy plugin files (plugin.json + skills/)
  fs.mkdirSync(TARGET_DIR, { recursive: true });
  copyRecursive(path.join(SOURCE_DIR, "plugin.json"), path.join(TARGET_DIR, "plugin.json"));
  copyRecursive(path.join(SOURCE_DIR, "skills"), path.join(TARGET_DIR, "skills"));

  console.log(`[${PLUGIN_NAME}] Installed to ${TARGET_DIR}`);
  console.log(`[${PLUGIN_NAME}] Skills available: /qpm-zh-project, /qpm-zh-global`);
}

try {
  install();
} catch (err) {
  console.error(`[${PLUGIN_NAME}] Install failed:`, err.message);
  // Don't fail npm install
  process.exit(0);
}
