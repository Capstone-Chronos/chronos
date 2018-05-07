import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class EditTimeline extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imageUrl: 'https://www.researchgate.net/profile/Carlos_Pinho3/publication/303916561/figure/fig6/AS:372571687145475@1465839420211/Sankey-and-Grassmann-for-Un-0300-0400.png',
      visible: false
    }
    this.toggleVisibility.bind(this);
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    const { children, content } = this.props
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
                <img src={this.state.imageUrl} style={imageStyle}/>
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
