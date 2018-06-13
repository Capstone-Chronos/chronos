import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateTitle } from '../../../../store/mapChart';

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleInput: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    let { name, value } = evt.target;
    this.setState({[name]: value});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let { titleInput } = this.state;
    let { setTitle } = this.props;
    if (titleInput !== '') setTitle(titleInput);
  }

  render() {
    let { title } = this.props;
    let { titleInput } = this.state;
    let { handleChange, handleSubmit } = this;

    return (
      <div>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="titleInput"
            placeholder="Change Title Here"
            onChange={handleChange}
            value={titleInput}
          />
          <input type="submit" value="Update Title" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  title: state.mapChart.title
});

const mapDispatchToProps = dispatch => ({
  setTitle: title => {
    dispatch(updateTitle(title));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Title)
);
