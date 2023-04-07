import React from 'react';
import config from '../../config';
import chamber from '../assets/images/chamber.jpg';

export default function Footer() {
  return (
    <section id="footer">
      <div className="inner">
        <h2 className="major">Get in touch</h2>
        <p>
          Questions / Comments? Please send us a message below and we'll get
          back to you as soon as possible.
        </p>
        <form name="contact" method="post" data-netlify="true">
          <div className="fields">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="4"></textarea>
            </div>
          </div>
          <ul className="actions">
            <li>
              <input type="submit" value="Send Message" />
            </li>
          </ul>
        </form>
        <ul className="contact">
          {/* <li className="fa-home">{config.address}</li>

          <li className="fa-phone">{config.phone}</li> */}

          {config.socialLinks.map((social) => {
            const { icon, url, name } = social;
            return (
              <li className={`${icon}`} key={url}>
                <a href={url}>{name}</a>
              </li>
            );
          })}

          <div id="chamber">
            <a href="https://www.lehighvalleychamber.org/">
              <img
                src={chamber}
                alt="Proud Member of the Greater Lehigh Valley Chamber of Commerce"
                className="image main"
              />
            </a>
          </div>
        </ul>
        <ul className="copyright">
          <li>&copy; 2023 LVWIT. All rights reserved.</li>
          <li>
            Design: <a href="http://html5up.net">HTML5 UP</a>
          </li>
          <li>
            Developed by:{' '}
            <a href="http://www.ashleychristman.com">Ashley Christman</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
