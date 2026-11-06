const themePack = require('hexo-theme-aurora/package.json');

class SiteGenerator {
  data = {};

  constructor(configs) {
    configs.theme_config.version = themePack.version;
    this.data = configs;
  }

  addSiteConfig(data) {
    const tempConfigs = this.data;
    // Removed privacy data from site configs
    delete tempConfigs.deploy;
    delete tempConfigs.server;
    tempConfigs.theme_config.algolia = {
      enable: this.data.theme_config.algolia?.enable ?? false
    };
    data.push({
      path: 'api/site.json',
      data: JSON.stringify(tempConfigs)
    });
    return data;
  }
}

module.exports = SiteGenerator;
