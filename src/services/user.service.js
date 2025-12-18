import User from "../models/User.js";
import uploadFile from "../utils/fileUploader.js";

const createUser = async (data) => {
  return await User.create(data);
};

const getUsers = async () => {
  return await User.find();
};

const updateProfileImage = async (id, file) => {
  const uploadedFile = await uploadFile([file]);

  return await User.findByIdAndUpdate(
    id,
    {
      profileImageUrl: uploadedFile[0].url,
    },
    { new: true }
  );
};

export default { createUser, getUsers, updateProfileImage };
