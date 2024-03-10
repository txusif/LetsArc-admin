import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";
import { Projects } from "../components";

const Dashboard = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("/get-all-videos");
      console.log(response.data);
      setVideos(response.data.videos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-10 py-6">
      <div className="space-y-6">
        <div className="flex justify-between py-2 items-center">
          <div>
            <h1 className="text-3xl font-semibold">All projects</h1>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              className="bg-blue1/80 text-lg hover:bg-blue1 text-white2 px-6 py-3 rounded-lg font-medium tracking-wide"
              onClick={() => {
                navigate("/createUser");
              }}
            >
              Create User
            </button>
            <button
              type="button"
              className="bg-blue1/80 text-lg hover:bg-blue1 text-white2 px-6 py-3 rounded-lg font-medium tracking-wide"
              onClick={() => {
                navigate("/createProject");
              }}
            >
              Create Project
            </button>
          </div>
        </div>

        <Projects videos={videos} updateVideoData={fetchVideos}/>
      </div>
    </div>
  );
};

export default Dashboard;
