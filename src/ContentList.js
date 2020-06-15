import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Content from './Content';

const ContentList = () => {
  const contents = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  console.log(contents);

  return (
    <div>
      <Content />
    </div>
  );
};

export default ContentList;
