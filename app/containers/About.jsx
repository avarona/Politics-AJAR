import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, AppBar } from 'material-ui';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Grid, Col, Row } from 'react-bootstrap';

const style = {
  height: 200,
  width: 200,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  margin: 80
};

class About extends Component {
  constructor(props) {
      super(props)
      this.goToHome = this.goToHome.bind(this)
  }

  goToHome() {
    browserHistory.push('/home')
  }

  render() {
    return (
      <div>
        <AppBar
          title=""
          style={{backgroundColor: '#000b63'}}
          onLeftIconButtonTouchTap={this.goToHome}
        />
        <div>
          <h2 style={{textAlign: 'center', color: '#000b63', fontFamily: 'Lato', fontSize: 40, marginTop: 90}}> Knowledge is power </h2>
          <h4 style={{textAlign: 'justify', fontFamily: 'Lato', fontSize: 20, marginTop: 55, marginRight: 50, marginLeft: 50}}>
            Politics AJAR was born out of our common realization that there is no
            centralized space of information to look at the members of the Senate
            and the house of Representatives and their different stance on the multitude of political issues in the United States.
            In order for people to make the right decision, it is important for them to have access to complete information.
            In order for people to elect the right representatives, it is  important to create a system of transparency
            and a way for the public to analyze and compare the views of the different candidates. Politics AJAR is our attempt to create this
            system. Through the work of the great people of ProPublica, we were able to receive information about the 500+ members of the legislative
            branch and their past votes on passed bills, and thanks to the hardwork of the people at Maplight, we were able to deduce the stance of these
            bills by analyzing the type of organization that supported and opposed these numerous bills. Understanding the political issue and the stance
            that these bills took allowed us in turn to infer the political stance of the members of the Senate and the House. Through this information, we
            enable our users to select the issues that are most important to them and see which candidates align the most and the least with their interests.
            In creating Politics AJAR, we are hoping to inspire others to help us inform the American public and create a better world.
          </h4>
          <h2 style={{textAlign: 'center', color: '#000b63', fontFamily: 'Lato', fontSize: 40, marginTop: 90}}> Team </h2>
          <div style={{width: '100%', marginTop: 100}}>
            <Grid>
              <Row className="show-grid">
                <Col md={3}>
                  <div style={{height: 200, width: 200, display: 'inline-block', marginLeft: 30, marginBottom: 200}}>
                    <a href="https://github.com/avarona">
                      <h4> Alejandro Varona </h4>
                      <img src="https://media.licdn.com/dms/image/C5603AQH72I1ValBaBw/profile-displayphoto-shrink_800_800/0?e=1530748800&v=beta&t=98zQQEzlWahPbrhEoTvTvJyOc-UowKQgpETIn9RqXcc" style={{height: 200, width:200, borderRadius: '50%'}} />
                    </a>
                  </div>
                </Col>
                <Col md={3}>
                  <div style={{height: 200, width:200, display: 'inline-block', marginLeft: 30, marginBottom: 200}}>
                    <a href="https://github.com/JFUCHS-FULLSTACK">
                      <h4> Jonathan Fuchs </h4>
                      <img src="https://media.licdn.com/dms/image/C4D03AQGC6kQdZWmvLQ/profile-displayphoto-shrink_800_800/0?e=1530748800&v=beta&t=KoLrOTX0KXkLdKFyJZYLOeYZJhOZXhYbf6YDZXAjXB8" style={{height: 200, width: 200, borderRadius: '50%'}} />
                    </a>
                  </div>
                </Col>
                <Col md={3}>
                  <div style={{ height: 200, width: 200, display:'inline-block', marginLeft: 20, marginBottom: 200}}>
                    <a href="https://github.com/abdelshok">
                      <h4> Abdel-Aziz Shokair </h4>
                      <img src="https://media.licdn.com/dms/image/C4D03AQFHDdkx305kXQ/profile-displayphoto-shrink_800_800/0?e=1530748800&v=beta&t=mp4qf-R6xHM39SoQTuMpMTAQtHlVpvu1P8lnUFOrJzA" style={{height: 200, width: 200, borderRadius: '50%'}} />
                    </a>
                  </div>
                </Col>
                <Col md={3}>
                  <div style={{height: 200, width: 200, display: 'inline-block', marginLeft: 20, marginBottom: 200}}>
                    <a href="https://github.com/robschroeder333">
                      <h4> Robert Schroeder </h4>
                      <img src="https://media.licdn.com/dms/image/C4D03AQGYXVMCbh10ug/profile-displayphoto-shrink_800_800/0?e=1530748800&v=beta&t=8oDRfA5kg3WYqanG_CBDAIbYCkgGnoPkaNgurO3EE-g" style={{height: 200, width: 200, borderRadius: '50%'}} />
                    </a>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}
export default connect()(About)
