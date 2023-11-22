// import { PhotoIcon } from "@heroicons/react/24/solid";
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
// const UploadPhoto = ({ userId }) => {
//   async function uploadFile(event) {
//     const file = event.target.file;

//     await axios.post(`${BASE_URL}/api/v1/users/${userId}`, file, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   }
//   return (
//     <>
//       {" "}
//       <div className="col-span-full">
//         <label
//           htmlFor="photo"
//           className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
//         >
//           Photo
//         </label>
//       </div>
//       <div className="col-span-full">
//         <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//           <div className="text-center">
//             <PhotoIcon
//               className="mx-auto h-12 w-12 text-gray-300 dark:text-white"
//               aria-hidden="true"
//             />
//             <div className="mt-4 flex rounded-md text-sm leading-6 text-gray-600 dark:text-white">
//               <label
//                 htmlFor="file-upload"
//                 className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//               >
//                 <input
//                   id="file-upload"
//                   name="file-upload"
//                   type="file"
//                   onChange={uploadFile}
//                 />
//               </label>
//             </div>
//             <p className="pl-1 dark:text-white">or drag and drop</p>
//             <p className="text-xs leading-5 text-gray-600 dark:text-white">
//               PNG, JPG, GIF up to 10MB
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UploadPhoto;

const BASE_URL = import.meta.env.VITE_BASE_URL;

import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";

const UploadPhoto: React.FC = ({ id }) => {
  const props: UploadProps = {
    name: "file",
    action: `${BASE_URL}/api/v1/users/${id}`,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props}>
      <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
        Photo
      </p>
      <div className="col-span-full">
        <Button className="mt-2" icon={<UploadOutlined />}>
          Click to Upload
        </Button>
      </div>
    </Upload>
  );
};

export default UploadPhoto;
