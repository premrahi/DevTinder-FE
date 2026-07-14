import axios from "axios";
import { useEffect } from "react";
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
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

if(!feed) return null ;

  if (feed.data.length <= 0) return <h1 className="text-center my-10 text-4xl">lets wait for someone new</h1>;

  return (
    feed && (
      <div>
          <UserCard user={feed?.data[0]} />
      </div>
    )
  );
};

export default Feed;
