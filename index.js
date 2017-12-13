#!/usr/bin/env node

const os = require('os');
const fs = require('fs');
const path = require('path');

const activeWindow = require('active-window');

const homeDir = os.homedir();
const settingsFileLocation = path.join(homeDir, '.obs-settings');
const sceneTargetFileLocation = path.join(homeDir, '.obs-target');

let configs = [];

function createSettingsFile() {
  fs.writeFileSync(settingsFileLocation, JSON.stringify([]));
}

function loadConfigs() {
  try {
    configs = JSON.parse(fs.readFileSync(settingsFileLocation, 'utf8'));
  } catch(e) {
    console.error('Failed to load config');
    console.error(e);
  }
}

if (!fs.existsSync(settingsFileLocation)) {
  console.log(`Couldn't find the settings file, creating an empty config here:`);
  console.log(settingsFileLocation);
  console.log('Edit your config and restart this process.');
  createSettingsFile();
} else {
  loadConfigs();
}

let currentScene;
function writeScene(scene) {
  if (scene !== currentScene) {
    currentScene = scene;

    console.log(`Switching to scene: ${scene}`);
    fs.writeFileSync(sceneTargetFileLocation, scene);
  }
}

setInterval(() => {
  activeWindow.getActiveWindow(function activeWindowCallback(window) {
    // TODO - Add debugging flag. To help users identify their windows.
    // console.log("App: " + window.app);
    // console.log("Title: " + window.title);
    // console.log();
    const matchingConfig = configs.find((potentialConfig) => {
      let appMatches = true;
      let titleMatches = true;
      if (potentialConfig.app) {
        appMatches = window.app.toLowerCase().includes(potentialConfig.app.toLowerCase());
      }
      if (potentialConfig.title) {
        titleMatches = window.title.toLowerCase().includes(potentialConfig.title.toLowerCase());
      }

      return appMatches && titleMatches;
    });

    if (matchingConfig) {
      writeScene(matchingConfig.scene);
    }
  });
}, 500);
