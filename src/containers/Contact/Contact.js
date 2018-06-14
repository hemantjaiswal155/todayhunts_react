import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';

export default class Contact extends Component {

  render() {
    return (
      <div className="container">
        <h1>Contact Us</h1>
        <Helmet title="Contact Us"/>

        <h2><span><strong>How can we help you? Get in touch!</strong></span></h2>

        <h3><strong>Press Releases</strong></h3>

        <p>Do you have something you want to share with the world? Email us at <strong>contact@todayhunts.com</strong></p>

        <h3><strong>Country specific inqueries</strong></h3>

        <p>Are you a writer or just a passionate Todayhunts reader? Do you have any question about Todayhunts website (e.g. how to sign up, how to start writing, how to get paid)? Get in touch with one of the members of our awesome team:</p>

        <p>Drop us a line at <strong>contact@todayhunts.com</strong></p>

        <h3><strong>Legal inquiries</strong></h3>

        <p>For any legal issues regarding Todayhunts, the articles published, images/videos/sounds embedded in our content or other general legal questions, please contact us at <strong>contact@todayhunts.com*</strong></p>

        <p><em>*Please refer to the following email address with regard to any and all communications of legal, fiscal or regulatory nature. The Company declines any and all responsibility for contents communicated to the Company through any other email address of the Company.</em></p>

        <h3><strong>General inquiries:</strong></h3>

        <p>Do you have any general questions about Todayhunts, mission and values? Please, drop us a line at <strong>contact@todayhunts.com</strong></p>

        <p>&nbsp;</p>

        <p>&nbsp;</p>

      </div>
    );
  }
}
