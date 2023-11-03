import React from "react";
import {
  DBHeader,
  DBHome,
  DBItems,
  DBNewItem,
  DBOrders,
  DBUsers,
} from "../Components";
import { Route, Routes } from "react-router-dom";

const DBRightSection = () => {
  return (
    <div className="flex flex-col py-12 flex-1 h-full px-10 bg-lightOverlay w-full">
      <DBHeader />
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none md:w-full">
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/orders" element={<DBOrders />} />
          <Route path="/items" element={<DBItems />} />
          <Route path="/newItem" element={<DBNewItem />} />
          <Route path="/users" element={<DBUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default DBRightSection;
