import React from "react";
import { Rate } from "antd";

const Reviews: React.FC<{ value: number }> = ({ value }) => (
  <Rate allowHalf disabled defaultValue={value} className="mt-2" />
);

export default Reviews;
