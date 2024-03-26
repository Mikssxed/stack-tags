import axios from "axios";

export const getTags = (page: number) =>
  axios
    .get(
      `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=10&order=desc&sort=popular&site=stackoverflow`
    )
    .then((res) => res.data);
