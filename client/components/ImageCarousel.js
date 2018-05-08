import React from 'react';
import { Icon, Button, Image, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1
    };
  }

  componentDidMount() {
    let intervalId = setInterval(() => {
      this.setState({ index: this.state.index + 1 });
    }, 5000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <Container>
        <section id="carousel">
          <div id="carousel-text">
            <h1>Chronos</h1>
            <Button color="blue" size="huge">
              Get Started
              <Icon name="right arrow" />
            </Button>
          </div>
          <Image
            className={
              this.state.index % 2 === 1
                ? 'carousel-image'
                : 'carousel-image hidden'
            }
            src="http://www.railbaltica.org/wp-content/uploads/2017/04/Rail-Baltica-Project-Timeline.png"
          />
          <Image
            className={
              this.state.index % 2 === 0
                ? 'carousel-image'
                : 'carousel-image hidden'
            }
            src="https://c1.staticflickr.com/8/7447/27544789976_d9ef43a082_b.jpg"
          />
        </section>
      </Container>
    );
  }
}
