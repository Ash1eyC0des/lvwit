import React from 'react';
import { graphql } from 'gatsby';
import Layout from './Layout';

export default function EventIndexPage({ data }) {
  const { allMarkdownRemark } = data;
  const { nodes } = allMarkdownRemark;

  console.log(nodes);

  return (
    <Layout fullMenu>
      <section id="wrapper">
        <header>
          <div className="inner">
            <h2>Upcoming Events</h2>
            <p>Check out our upcoming events and join us!</p>
          </div>
        </header>

        <div className="wrapper">
          <div className="inner">
            <section className="features">
              {nodes.length === 0 && (
                <h3>No events currently scheduled. Please check back soon!</h3>
              )}
              {nodes &&
                nodes.map((node) => {
                  return (
                    <article>
                      <a href={node.fields.slug} className="image">
                        <img src={node.frontmatter.image} alt="" />
                      </a>
                      <h3 className="major">{node.frontmatter.name}</h3>
                      <p>
                        <strong>Date:</strong> {node.frontmatter.date}
                      </p>
                      <p>
                        <strong>Location:</strong> {node.frontmatter.location}
                      </p>
                      <a
                        href={`../events${node.fields.slug}`}
                        className="special"
                      >
                        Details
                      </a>
                    </article>
                  );
                })}
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($yesterday: Date!) {
    allMarkdownRemark(
      filter: { frontmatter: { date: { gt: $yesterday } } }
      sort: { frontmatter: { date: ASC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "dddd MMMM DD, YYYY - h:mm a")
          name
          image
          location
          rsvp
        }
        html
      }
    }
  }
`;
