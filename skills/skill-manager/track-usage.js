#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

const LOG_PATH = path.join(os.homedir(), '.claude', 'skill-usage.log');

let input = '';

process.stdin.on('data', (chunk) => {
  input += chunk.toString();
});

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const toolName = (data.tool_name || data.toolName || '').toLowerCase();

    if (toolName === 'skill') {
      const skillName =
        data.tool_input?.skill ||
        data.toolInput?.skill ||
        data.tool_input?.args ||
        'unknown';

      const timestamp = new Date().toISOString();
      const logLine = `${timestamp}|${skillName}\n`;
      fs.appendFileSync(LOG_PATH, logLine, { encoding: 'utf8' });
    }
  } catch (_e) {
    // Silently ignore parsing errors
  }
  process.exit(0);
});

// Safety timeout in case stdin never closes
setTimeout(() => { process.exit(0); }, 2000);
