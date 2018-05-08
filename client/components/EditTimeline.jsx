import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import PieChart from './PieChart'
import d3, { select } from 'd3';


class EditTimeline extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    this.toggleVisibility.bind(this);
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    const { children, content } = this.props
    var node = document.createElement('div')
    let d3 = d3
    // let circle = canvas.append("circle")
    // .attr("cx", 250)
    // .attr('cy', 250)
    // .attr('r', 50)
    // .attr('fill', 'red');
    return (
      <div style={toolsStyle}>
        <Button onClick={this.toggleVisibility} style={buttonStyle}>Show Tools</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='uncover' width='thin' visible={visible} icon='labeled' vertical inverted>
          <div className="graph-attribute-set">{children}</div>
          {/* Placeholder Icons are below */}
            <Menu.Item name='home'>
              <Icon name='home' />
              Add Event
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Change Line Color
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Edit Line Thickness
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
            {/* Insert the actual timeline component here */}
              <div>
                <Button secondary style={publishStyle}>Publish</Button>
                <div id="d3Component">
                  <PieChart />
                </div>
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default EditTimeline

const toolsStyle = {
  marginTop: 50
}

const imageStyle = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const buttonStyle = {
  zIndex: 2
}

const publishStyle = {
  float: 'right',
  marginTop: 50,
  marginLeft: 50
}
