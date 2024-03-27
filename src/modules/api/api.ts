import axios from "axios";

export const getTags = (
  page: number,
  pageSize: number,
  order: "desc" | "asc",
  sort: "name" | "activity" | "popular"
) =>
  axios
    .get(
      `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${pageSize}&order=${order}&sort=${sort}&site=stackoverflow`
    )
    .then((res) => res.data);
