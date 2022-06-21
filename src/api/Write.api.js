import axios from "axios";

export async function getData() {
  const res = await axios.get("/list");
  //   console.log(res.data, "data");
  return res.data;
}
