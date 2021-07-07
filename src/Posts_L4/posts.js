import React, { Component } from "react";
import Post from "../Post_Lesson3/post";

const NEWS = [
  {
    author: "Inna",
    created_at: "2021-07-07T23:36:09.816Z",
    num_comments: 10,
    objectID: 1,
    title: "Jest & Enzyme",
    points: 100,
    url: "//test.url",
  },
  {
    author: "Sveta",
    created_at: "2021-07-07T23:36:09.816Z",
    num_comments: 8,
    objectID: 2,
    title: "TypeScript Basics",
    points: 10,
    url: "//test2121.url",
  },
];

const Posts = () => (
  <ul className="newsList">
    {NEWS.map(
      ({ author, created_at, num_comments, objectID, title, points, url }) => (
        <Post
          key={objectID}
          author={author}
          created_at={created_at}
          num_comments={num_comments}
          title={title}
          points={points}
          url={url}
        />
      )
    )}
  </ul>
);

export default Posts;