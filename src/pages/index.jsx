import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { debounce } from 'lodash';
import moment from 'moment';

import Layout from '../components/Layout';

import lvwit from '../assets/images/lvwit.png';
import pic1 from '../assets/images/pic01.jpg';
import pic2 from '../assets/images/pic02.jpg';
import pic3 from '../assets/images/pic03.jpg';

import config from '../../config';

const IndexPage = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollListener = debounce(() => {
    if (window.scrollY >= 400) setIsScrolled(true);
    else setIsScrolled(false);
  }, 10);

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
  });

  const { allMarkdownRemark } = data;
  const { nodes } = allMarkdownRemark;

  const yesterday = moment().subtract(1, 'days').format('YYYY-DD-MM');
  const currentEvents = nodes.filter(
    (node) => node.frontmatter.date >= yesterday
  );
  console.log(
    currentEvents,
    moment(nodes[0].frontmatter.date).format('YYYY-DD-MM'),
    yesterday
  );

  return (
    <Layout scroll={isScrolled}>
      <section id="banner">
        <div className="inner">
          <div className="logo">
            {/* <span className="icon fa-female"></span> */}
            <img className="icon" src={lvwit} alt="LVWIT Logo" />
          </div>
          <h2>{config.heading}</h2>
          <p>{config.subHeading}</p>
          <a href="/events" className="button">
            Join Us!
          </a>
        </div>
      </section>

      <section id="wrapper">
        <section id="one" className="wrapper spotlight style1">
          <div className="inner">
            <a href="#one" className="image">
              <img src={pic1} alt="" />
            </a>
            <div className="content">
              <h2 className="major">About</h2>
              <p>
                Our mission is to build a supportive community of talented women
                who work or live in the Lehigh Valley and allow them to
                cultivate their knowledge and passion in the field of
                Information Technology by providing networking opportunities,
                education, sharing of knowledge, and mentoring.
              </p>
              {/* <a href="/about" className="special">
                Learn more
              </a> */}
            </div>
          </div>
        </section>

        <section id="two" className="wrapper alt spotlight style2">
          <div className="inner">
            <a href="/events" className="image">
              <img src={pic2} alt="" />
            </a>
            <div className="content">
              <h2 className="major">Join Us!</h2>
              <p>
                LVWIT is a local Lehigh Valley organization with that is
                dedicated to bringing together women in technology to network,
                share knowledge and experience. Whether you are a student or an
                experience professional considering a career in technology, join
                us to get to know other technology professionals in the Lehigh
                Valley area.
              </p>
              <a href="/events" className="special">
                Upcoming Events
              </a>
            </div>
          </div>
        </section>

        <section id="three" className="wrapper spotlight style3">
          <div className="inner">
            <a href="/resources" className="image">
              <img src={pic3} alt="" />
            </a>
            <div className="content">
              <h2 className="major">Resources</h2>
              <p>Coming Soon!</p>
              {/* <a href="/resources" className="special">
                Learn more
              </a> */}
            </div>
          </div>
        </section>

        <section id="four" className="wrapper alt style1">
          <div className="inner">
            <h2 className="major">Upcoming Events</h2>
            <section className="features">
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
                      <a href={node.fields.slug} className="special">
                        Details
                      </a>
                    </article>
                  );
                })}
            </section>
            <ul className="actions">
              <li>
                <a href="/events" className="button">
                  Browse All
                </a>
              </li>
            </ul>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 4) {
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
