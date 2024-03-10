import React from "react";
import { CreateUserField } from "../components";

const CreateUser = () => {
  return (
    <div className="p-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Create a new user</h1>
        </div>

        <CreateUserField />
      </div>
    </div>
  );
};

export default CreateUser;
