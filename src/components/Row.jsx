import { useState } from "react";
import { Edit2Icon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "../api/axios";
import { StatusList } from "../constant";

const Row = ({ video, updateVideoData }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(video.status);

  const handleEditStatus = () => {
    setEditStatus((prev) => !prev);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleStatusEditSave = async () => {
    try {
      const response = await axios.patch("/update-video-status", {
        client_email: video.client_email,
        video_id: video.video_id,
        status: selectedStatus,
      });

      console.log(response.data);
      toast.success("Status updated");
      updateVideoData();
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    } finally {
      setEditStatus(false);
    }
  };

  const splicedVideoId = video.video_id.slice(0, 6);
  return (
    <div className="flex px-8 relative font-medium border-b border-gray-400 pb-5 pt-1 items-center justify-between bg-inigo-600">
      <p className="w-24">{splicedVideoId}</p>
      <div className="flex flex-col w-56">
        <p className="text-base">{video.client_name}</p>
        <p className="text-sm font-normal">{video.client_email}</p>
      </div>
      <p className="w-80">{video.video_title}</p>
      <p className="w-36">{video.date_started}</p>

      {!editStatus && (
        <div className="w-80 flex justify-center">
          <p className="rounded-3xl py-2 px-4 bg-blue-500">{video.status}</p>
        </div>
      )}

      {editStatus && (
        <div className="w-80 flex justify-center">
          <select
            name="status"
            value={selectedStatus}
            onChange={handleStatusChange}
            className={`h-10 w-80 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none`}
          >
            <option value="">Select Status</option>
            {StatusList.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      )}

      {!editStatus && (
        <div
          className="w-16 flex justify-center"
          onClick={() => handleEditStatus()}
        >
          <Edit2Icon className="cursor-pointer" />
        </div>
      )}

      {editStatus && (
        <div
          className="w-16 flex bg-blue1 p-2 rounded-lg cursor-pointer justify-center"
          onClick={handleStatusEditSave}
        >
          <p>Save</p>
        </div>
      )}
    </div>
  );
};

export default Row;
