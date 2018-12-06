# gatsby-remark-drupal

Provides support for markdown preprocessing to Drupal body fields.

* Creates a new `text/markdown` field for drupal body fields of the selected content types.
* Map drupal relative paths to previously downloaded and cached images by the `gatsby-source-drupal` plugin.

NOTE: To make sure your Drupal site expose markdown use the Toast UI Editor integration for Drupal provided by the [tui_editor](https://www.drupal.org/project/tui_editor) module.

## Install

```
npm install --save @weknow/gatsby-remark-drupal
```

## How to use

### Default configuration
```javascript
      // In your gatsby-config.js
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `@weknow/gatsby-remark-drupal`,
```

### Custom configuration
```javascript
      // In your gatsby-config.js
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `@weknow/gatsby-remark-drupal`,
            options: {
              nodes: [`article`,`page`, `landing`, `cta`]
            }
          }
        ]
      }
```
## Options
| Name | Default | Description |
| --- | --- | --- |
| `nodes` | [`article`,`page`] | The Drupal `node` types to process.