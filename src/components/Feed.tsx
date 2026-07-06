import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  // console.log(feed);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0) return <h1>lets wait for someone new</h1>;

  return (
    feed && (
      <div>
        {feed?.data?.map((feed : any) => (
          <UserCard user={feed} />
        ))}
      </div>
    )
  );
};

export default Feed;
