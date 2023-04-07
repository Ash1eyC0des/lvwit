import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { allMarkdownRemark, markdownRemark } = data; // data.markdownRemark holds your post data
  const { nodes } = allMarkdownRemark;
  const { frontmatter, html } = markdownRemark;

  console.log(nodes, frontmatter);

  return (
    <Layout fullMenu>
      <section id="wrapper">
        <header>
          <div className="inner">
            <h2>EVENT: {frontmatter.name}</h2>
            <p>{frontmatter.date}</p>
          </div>
        </header>

        <div className="wrapper spotlight style1">
          <div className="inner">
            <a href="#" className="image">
              <img src={frontmatter.image} alt="" />
            </a>
            <div className="content">
              <h3 className="major">Location:</h3>
              <p>{frontmatter.location}</p>

              <h3 className="major">RSVP Required:</h3>
              <p>{frontmatter.rsvp ? 'Yes' : 'No'}</p>

              <h3 className="major">Details:</h3>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </div>

        <div className="wrapper alt style1">
          <div className="inner">
            <h2 className="major">Other Events</h2>
            <section className="features">
              {nodes.length === 0 && (
                <p>No other events currently scheduled. Check back soon!</p>
              )}
              {nodes &&
                nodes.map((node) => {
                  return (
                    <article>
                      <a href={`/events${node.fields.slug}`} className="image">
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
                        href={`/events${node.fields.slug}`}
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

  // <div>
  //   <div>
  //     <h1></h1>
  //     <h2>{frontmatter.date}</h2>
  //     <div dangerouslySetInnerHTML={{ __html: html }} />
  //   </div>
  // </div>
}

export const pageQuery = graphql`
  query ($slug: String!, $yesterday: Date!) {
    allMarkdownRemark(
      filter: {
        fields: { slug: { ne: $slug } }
        frontmatter: { date: { gt: $yesterday } }
      }
      sort: { frontmatter: { date: ASC } }
      limit: 2
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "dddd MMMM DD, YYYY - h:mm a")
        name
        location
        image
        rsvp
      }
      fields {
        slug
      }
    }
  }
`;
