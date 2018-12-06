# gatsby-remark-drupal

Provides support for markdown preprocessing to Drupal body fields.

* Creates a new `text/markdown` field for drupal body fields.
* Map drupal relative paths to previously downloaded and cached images by `gatsby-data-source`.

NOTE: To make sure your Drupal site expose markdown use the Toast UI Editor integration for Drupal provided by the [tui_editor](https://www.drupal.org/project/tui_editor) module.

## Install

`npm install --save @weknow/gatsby-drupal-remark`

## How to use

### Default configuration
```javascript
      // In your gatsby-config.js
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-drupal',
```

### Custom configuration
```javascript
      // In your gatsby-config.js
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-drupal`,
            options: {
              nodes: [`article`,`page`]
            }
          }
        ]
      }
```
## Options
| Name | Default | Description |
| --- | --- | --- |
| `nodes` | [`article`,`page`] | The Drupal `node` types to process.