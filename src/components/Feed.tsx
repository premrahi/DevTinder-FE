import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch  } from "../utils/hooks";
import { BASE_URL } from "../constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useAppSelector } from "../utils/hooks";


const Feed = () => {
  const feed = useAppSelector((store) => store.feed);
  const dispatch = useAppDispatch();
  // console.log(feed);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

if(!feed) return null ;

  if (feed.length <= 0) return <h1 className="text-center my-10 text-4xl">lets wait for someone new</h1>;

  return (
    feed && (
      <div>
          <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
