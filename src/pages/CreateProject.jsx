import React from "react";
import { CreateProjectField } from "../components";

const CreateProject = () => {
  return (
    <div className="p-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Create a new project</h1>
        </div>

        <CreateProjectField />
      </div>
    </div>
  );
};

export default CreateProject;
