#!/usr/bin/env node

/**
 * EVO BYPASS - Setup Validation Script
 * Checks if everything is configured correctly before deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 EVO BYPASS - Setup Validation\n');

let errors = 0;
let warnings = 0;

// Check files exist
const requiredFiles = [
  '.gitlab-ci.yml',
  'backend/package.json',
  'backend/tsconfig.json',
  'backend/src/server.ts',
  'backend/src/bot/client.ts',
  'backend/src/services/bypass-ultimate.ts',
  'backend/.env.example',
  'website/index.html',
  'GITLAB_DEPLOYMENT_GUIDE.md',
  'FINAL_DEPLOYMENT_CHECKLIST.md'
];

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING!`);
    errors++;
  }
});

// Check backend dependencies
console.log('\n📦 Checking backend dependencies...');
const backendPackage = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));
const requiredDeps = [
  'axios',
  'cheerio',
  'cors',
  'discord.js',
  'dotenv',
  'express',
  'express-rate-limit',
  'mongodb',
  'mongoose',
  'socket.io',
  'zod'
];

requiredDeps.forEach(dep => {
  if (backendPackage.dependencies[dep]) {
    console.log(`  ✅ ${dep}`);
  } else {
    console.log(`  ❌ ${dep} - MISSING!`);
    errors++;
  }
});

// Check .env file
console.log('\n🔐 Checking environment configuration...');
if (fs.existsSync('backend/.env')) {
  const envContent = fs.readFileSync('backend/.env', 'utf8');
  const requiredEnvVars = [
    'PORT',
    'DISCORD_TOKEN',
    'DISCORD_CLIENT_ID'
  ];
  
  requiredEnvVars.forEach(envVar => {
    if (envContent.includes(envVar)) {
      console.log(`  ✅ ${envVar}`);
    } else {
      console.log(`  ⚠️  ${envVar} - Not found in .env`);
      warnings++;
    }
  });
  
  // Check Discord token
  if (envContent.includes('DISCORD_TOKEN')) {
    console.log('  ✅ Discord bot token configured');
  } else {
    console.log('  ⚠️  Discord bot token might not be configured');
    warnings++;
  }
} else {
  console.log('  ⚠️  backend/.env not found (will use .env.example)');
  warnings++;
}

// Check GitLab CI/CD configuration
console.log('\n🚀 Checking GitLab CI/CD configuration...');
const gitlabCI = fs.readFileSync('.gitlab-ci.yml', 'utf8');
if (gitlabCI.includes('deploy:production')) {
  console.log('  ✅ Production deployment configured');
} else {
  console.log('  ❌ Production deployment not configured');
  errors++;
}

if (gitlabCI.includes('SSH_PRIVATE_KEY')) {
  console.log('  ✅ SSH deployment configured');
} else {
  console.log('  ❌ SSH deployment not configured');
  errors++;
}

// Check bypass service
console.log('\n🔧 Checking bypass service...');
const bypassService = fs.readFileSync('backend/src/services/bypass-ultimate.ts', 'utf8');
const services = [
  'Linkvertise',
  'Work.ink',
  'Lootlabs',
  'Rekonise',
  'Platoboost'
];

services.forEach(service => {
  if (bypassService.includes(service)) {
    console.log(`  ✅ ${service} support`);
  } else {
    console.log(`  ❌ ${service} support - MISSING!`);
    errors++;
  }
});

// Check Discord bot commands
console.log('\n🤖 Checking Discord bot commands...');
const commandFiles = [
  'backend/src/bot/commands/bypass.ts',
  'backend/src/bot/commands/premium.ts',
  'backend/src/bot/commands/stats.ts',
  'backend/src/bot/commands/help.ts',
  'backend/src/bot/commands/ticket.ts',
  'backend/src/bot/commands/settings.ts'
];

commandFiles.forEach(file => {
  const cmdName = path.basename(file, '.ts');
  if (fs.existsSync(file)) {
    console.log(`  ✅ /${cmdName} command`);
  } else {
    console.log(`  ❌ /${cmdName} command - MISSING!`);
    errors++;
  }
});

// Check website
console.log('\n🌐 Checking website...');
const website = fs.readFileSync('website/index.html', 'utf8');
if (website.includes('bypass')) {
  console.log('  ✅ Bypass functionality in website');
} else {
  console.log('  ❌ Bypass functionality not found');
  errors++;
}

if (website.includes('urpy.link/gkLVl4')) {
  console.log('  ✅ Donate link configured');
} else {
  console.log('  ⚠️  Donate link not found');
  warnings++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VALIDATION SUMMARY\n');

if (errors === 0 && warnings === 0) {
  console.log('✅ PERFECT! Everything is configured correctly!');
  console.log('🚀 You are ready to deploy!');
  console.log('\nNext steps:');
  console.log('1. Read FINAL_DEPLOYMENT_CHECKLIST.md');
  console.log('2. Setup your server');
  console.log('3. Configure GitLab CI/CD variables');
  console.log('4. Push to GitLab and deploy!');
} else {
  if (errors > 0) {
    console.log(`❌ Found ${errors} error(s) that need to be fixed`);
  }
  if (warnings > 0) {
    console.log(`⚠️  Found ${warnings} warning(s) (optional)`);
  }
  
  if (errors > 0) {
    console.log('\n⚠️  Please fix the errors before deploying');
    process.exit(1);
  } else {
    console.log('\n✅ No critical errors! Warnings are optional.');
    console.log('🚀 You can proceed with deployment!');
  }
}

console.log('='.repeat(50));
