import React from 'react';

const Title = props => {
  let { title, setTitle, titleInput } = props;
  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={setTitle}>
        <input
          type="text"
          name="title"
          placeholder="Change Title Here"
          value={titleInput}
        />
        <input type="submit" value="Update Title" />
      </form>
    </div>
  );
};

export default Title;
