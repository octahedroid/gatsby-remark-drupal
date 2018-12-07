
const _camelCase = require('lodash/camelCase');
const path = require('path');
const crypto = require('crypto');
const digest = str => crypto
    .createHash('md5')
    .update(str)
    .digest('hex');

exports.onCreateNode = ({
    node,
    getNodes,
    actions
}, pluginOptions) => {

    if (node.internal.owner !== 'gatsby-source-drupal') {
        return
    }

    if (!pluginOptions.hasOwnProperty("nodes")) {
        pluginOptions.nodes = [`article`,`page`];
    }

    const node_types = pluginOptions.nodes.map((type) => {
        return `node__${type}`;
    });

    if (node_types.includes(node.internal.type)) {

        const {
            createNode,
            createNodeField
        } = actions;

        let content = node.body.value;
        const inlineImageRegExp = /\(\/sites[^)]+\)/gi;
        const nodeImages = content.match(inlineImageRegExp);
        if (nodeImages) {
            const nodes = getNodes();
            nodeImages.forEach((element) => {
                const nodeImage = element.slice(1, -1);
                const nodeImageCached = nodes.find(contentNode => (contentNode.internal.type === 'File' && contentNode.internal.description.includes(nodeImage)));
                if (nodeImageCached) {
                    console.log(`replace ${nodeImage}`);
                    content = content.replace(new RegExp(nodeImage, 'g'), nodeImageCached.relativePath);
                }
            });
        }

        const textNode = {
            id: `${node.id}-MarkdownBody`,
            parent: node.id,
            dir: path.resolve('./'),
            internal: {
                type: _camelCase(`${node.internal.type}MarkdownBody`),
                mediaType: 'text/markdown',
                content: content,
                contentDigest: digest(content)
            }
        };

        createNode(textNode);

        createNodeField({
            node,
            name: 'markdownBody___NODE',
            value: textNode.id
        });
    }

    return;
}