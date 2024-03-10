import Row from "./Row.jsx";

const Projects = ({ videos, updateVideoData }) => {
  return (
    <div className="bg-blue1/80 text-white2 rounded-lg flex flex-col gap-5">
      <div className="flex relative bg-blue-800 rounded-t-lg py-6 px-8 font-medium items-center justify-between text-lg gap-4">
        <p className="w-24">Video ID</p>
        <p className="w-56">Client</p>
        <p className="w-80">Title</p>
        <p className="w-36">Date</p>
        <div className="w-80 flex justify-center">
          <p>Status</p>
        </div>
        <div className="w-12">Edit</div> {/* Empty cell for the edit icon */}
      </div>

      {videos.map((video, index) => (
        <Row key={index} video={video} updateVideoData={updateVideoData} />
      ))}
    </div>
  );
};

export default Projects;
