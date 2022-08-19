// priority: 9001
//   __   ___   _    _  _ ___ _    ___ ___   _       ____ 
//   \ \ / /_\ | |  | || | __| |  / __|_ _| /_\     | ___|
//    \ V / _ \| |__| __ | _|| |__\__ \| | / _ \    |___ \
//     \_/_/ \_\____|_||_|___|____|___/___/_/ \_\   |____/
//

/**
 * @file A global config file for Valhelsia 5.
 * When the pack is loaded, the config file will be automatically loaded and stored.
 * If the config file does not exist (or there are any missing entries), the file
 * will be created or updated. See the examples for how to use the config in
 * KubeJS scripts.
 * 
 * Note: There is a single config file per instance, not per world. Changing settings
 * will impact all saves / worlds. Use NBT instead for per-world configuration.
 * 
 * It is possible to adjust the config in-game
 * (via the /vconfig command by default, requires op / cheats enabled).
 * 
 * @example Accessing Config Entries (via script):
 * let debug = global.config.debug;
 * 
 * @example Setting Config Entries (via script):
 * setConfig('debug', true);
 * 
 */

/**
 * The filename of the config file.
 * @const {!string}
 * @default 'v5_config.json'
 */
const CONFIG_FILENAME = 'v5_config.json';

/**
 * The chat command to modify the config.
 * @const {string}
 * @default 'vconfig'
 */
const CONFIG_COMMAND = 'vconfig';

/**
 * The permission level required to use the config command.
 * See https://minecraft.fandom.com/wiki/Permission_level#Java_Edition
 * for information about each permission level.
 * @const {!number}
 * @default 4
 */
const CONFIG_COMMAND_PERMISSION_LEVEL = 4;
 
/**
 * The default values for config options in the pack.
 * @const {!Object}
 */
const DEFAULT_CONFIG = {
  debug: false,
  log_added_recipes: false,
  log_removed_recipes: false,
  log_skipped_recipes: false,
  log_erroring_recipes: true,
};
 
/**
 * Converts a given value into a boolean or number, if appropriate.
 * @param {!*} value The input to parse. Often a string, but not required to be.
 * @returns {boolean|number|string} The converted value.
 */
function parseConfigValue(value) {
  // Quick and dirty parser - converts strings to boolean or number if needed before storing them.
  if (value == 'true') {
    return true;
  }
  if (value == 'false') {
    return false;
  }
  if (isNumeric(value)) {
    return Number(value);
  }
  return value;
}
 
/**
 * Sets a config entry and then saves the config file.
 * @param {!string} key The config key to set. Automatically converted to lower case.
 * @param {!*} value The value to set. Will be automatically parsed into the appropriate type.
 */
function setConfig(key, value) {
  global.config[key.toLowerCase()] = parseConfigValue(value);
  JsonIO.write(CONFIG_FILENAME, global.config);
}

/**
 * Command registry handler that adds the config command.
 * 
 * Command Syntax (assuming default command): 
 * Get Config: /vconfig [key]
 * Set Config: /vconfig [key] [value]
 */
onEvent('command.registry', (event) => {
  const { commands: Commands, arguments: Arguments } = event;
  event.register(
    Commands.literal(CONFIG_COMMAND)
      .requires((source) => source.hasPermission(CONFIG_COMMAND_PERMISSION_LEVEL))
      .then(Commands.argument('key', Arguments.STRING.create(event))
        .then(Commands.argument('value', Arguments.STRING.create(event))
          .executes((ctx) => {
            // Set updated config entry (key, value).
            let key = Arguments.STRING.getResult(ctx, 'key').toLowerCase();
            let value = Arguments.STRING.getResult(ctx, 'value');
            setConfig(key, value);
            ctx.source.sendSuccess(Text.translate('valhelsia.config.updated', `${key}: '${global.config[key]}'.`), true);
            return 1;
          })
        )
        .executes((ctx) => {
          // Get current config entry (key).
          let key = Arguments.STRING.getResult(ctx, 'key');
          ctx.source.sendSuccess(Text.translate('valhelsia.config.current', `${key}: '${global.config[key]}'.`), false);
          return 1;
        })
      )
    );
});

// Read in current config + set any missing properties to defaults:
let config = JsonIO.read(CONFIG_FILENAME);
let configDirty = false;

if (!config) {
  configDirty = true;
  config = DEFAULT_CONFIG;
}

for (const index in DEFAULT_CONFIG) {
  if (!config.hasOwnProperty(index)) {
    config[index] = DEFAULT_CONFIG[index];
    configDirty = true;
  }
}

if (configDirty) {
  JsonIO.write(CONFIG_FILENAME, config);
  configDirty = false;
}

global.config = config;

// KubeJS Settings
settings.logAddedRecipes = config.log_added_recipes ? true : false;
settings.logRemovedRecipes = config.log_removed_recipess ? true : false;
settings.logSkippedRecipes = config.log_skipped_recipess ? true : false;
settings.logErroringRecipes = config.log_erroring_recipess ? true : false;