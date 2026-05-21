#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const PLUGIN_NAME = "claude-helper";
const TARGET_DIR = path.join(os.homedir(), ".claude", "plugins", PLUGIN_NAME);

function uninstall() {
  if (!fs.existsSync(TARGET_DIR)) {
    return;
  }

  fs.rmSync(TARGET_DIR, { recursive: true, force: true });
  console.log(`[${PLUGIN_NAME}] Removed ${TARGET_DIR}`);
}

try {
  uninstall();
} catch (err) {
  console.error(`[${PLUGIN_NAME}] Uninstall cleanup failed:`, err.message);
  process.exit(0);
}
