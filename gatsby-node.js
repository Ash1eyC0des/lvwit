const path = require(`path`);
const moment = require('moment');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = function ({ graphql, actions }) {
  const yesterday = moment().subtract(1, 'days').format('YYYY-DD-MM');
  const { createPage } = actions;
  return graphql(
    `
      query loadEventPagesQuery($limit: Int!) {
        allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: $limit) {
          nodes {
            fields {
              slug
            }
          }
        }
      }
    `,
    { limit: 50 }
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    result.data.allMarkdownRemark.nodes.forEach((node) => {
      const slug = node.fields.slug;
      console.log(slug);
      createPage({
        path: `events${slug}`,
        component: path.resolve(`./src/components/Event.jsx`),
        context: {
          slug: slug,
          yesterday: yesterday,
        },
      });
    });

    createPage({
      path: `events`,
      component: path.resolve('./src/components/EventsList.jsx'),
      context: {
        yesterday: yesterday,
      },
    });

    createPage({
      path: `/`,
      component: path.resolve('./src/pages/index.jsx'),
      context: {
        yesterday: yesterday,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
