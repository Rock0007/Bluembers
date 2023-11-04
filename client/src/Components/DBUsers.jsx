import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../api";
import { setAllUserDetails } from "../context/actions/allUsersAction";
import DataTable from "./DataTable";
import { Avatar } from "../assets";

const DBUsers = () => {
  const [loading, setLoading] = useState(true);
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers()
        .then((data) => {
          dispatch(setAllUserDetails(data));
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [allUsers, dispatch]);

  const uniqueUsers = useMemo(() => {
    if (!allUsers) {
      return [];
    }

    const uniqueUsersMap = new Map();
    allUsers.forEach((user) => {
      if (!uniqueUsersMap.has(user.email)) {
        uniqueUsersMap.set(user.email, user);
      }
    });
    return Array.from(uniqueUsersMap.values());
  }, [allUsers]);

  const columns = useMemo(
    () => [
      {
        title: "Image",
        field: "photoURL",
        render: (rowData) => (
          <img
            src={rowData.photoURL ? rowData.photoURL : Avatar}
            className="w-32 h-16 object-contain rounded-md"
            alt="User Avatar"
          />
        ),
      },
      {
        title: "Name",
        field: "displayName",
      },
      {
        title: "Email",
        field: "email",
      },
      {
        title: "Verified",
        field: "emailVerified",
        render: (rowData) => (
          <p
            className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
              rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
            }`}
          >
            {rowData.emailVerified ? "Verified" : "Not Verified"}
          </p>
        ),
      },
    ],
    []
  );

  return (
    <div className="flex items-center justify-center gap-4 pt-6 w-full ">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={uniqueUsers} title="List of Users" />
      )}
    </div>
  );
};

export default DBUsers;
