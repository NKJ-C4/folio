import React, { Component } from 'react';
export default class ContactUs extends Component {
  render() {
    let resumeData = this.props.resumeData;
    return (
      <section id="contact">
          <div className="row section-head">
            <div className="ten columns">
              <p className="lead">
              Feel free to contact me for any work or suggestions via
              </p>
            </div>
          </div>
          <div className="row">
            <aside className="eigth columns footer-widgets">
              <div className="widget">
                <a href={resumeData.linkedinId} target='_blank'>
                  <h4>
                    My linkedin
                  </h4>
                </a>
              </div>
            </aside>
          </div>
          <div className="row section-head">
            <div className="ten columns">
              <p className="lead">
              PS: I have a list of app ideas with me, so you're most welcome if you want to collaborate.
              </p>
            </div>
          </div>
        </section>
        );
  }
}
