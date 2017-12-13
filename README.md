# OBS Controller

This is a simple module used to work around limitation that I found in the Advanced Scene Switcher OBS plugin.  I found that the plugin was unable to properly detect window titles and couldn't change scenes appropriately.

This module works around by utilizing the file input setting in Advanced Scene Switcher. When it detects you've changed applications to something you've configured in `~/.obs-settings` it will automatically write the desired scene to `~/.obs-target`.

## Installation

This assumes you have node and npm installed.

```bash
npm install -g obs-controller
```

## Running

```
obs-controller
```

## Configuration

Configuration is controlled by a file in your home directory called `.obs-settings`, it is configured as follows.

```js
[
  {
    "app": "google-chrome",
    "scene": "My Fancy Google Chrome Scene"
  },
  {
    "title": "Facebook",
    "scene": "My Fancy Facebook Scene",
  }
]
```

Configuration is simple at the moment, but may evolve in the future.

`app` - This is an optional flag, it's used as a matcher for detecting the current active application. In the example above it will match any Google Chrome window. You cannot use `app` and `title` in the same switcher configuration. This is case insensitive and is matched using include.

`title` - This is an optional flag, it's used as a matcher for detecting the title of the current active window. In the above example it will switch the the "My Fancy Facebook Scene" whenever you are in a window that includes the title "Facebook". This is case insensitive and is matched using include.

`scene` - The scene that you would like to switch to when you match your configuration.  This is case sensitive and must match what you've got configured in obs.

**NOTE:** The configs are matches in priority order. The first config that matches the current active window will be selected.

## Configuring obs

Running this application for the first time will create `~/.obs-target`, you need to install the Advanced Scene Switcher plugin, and enable scene switching on file input. See the below screen shot.

![obs settings](https://user-images.githubusercontent.com/4172067/33922765-e03eaea6-df81-11e7-9903-05cb0ba0d735.png)
