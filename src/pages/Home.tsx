import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Table, TableProps } from "antd";
import { useEffect } from "react";
import { getTags } from "../modules/api";
import { usePageStore } from "../modules/store";

interface DataType {
  name: string;
  count: number;
}

export const Home = () => {
  const queryClient = useQueryClient();
  const { page, setPage } = usePageStore((state) => ({
    page: state.page,
    setPage: state.setPage,
  }));

  const { isPending, error, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["tags", page],
    queryFn: () => getTags(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["projects", page + 1],
        queryFn: () => getTags(page + 1),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  const tableChange = (pagination, filters, sorter) => {
    console.log(pagination, sorter, filters);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    { title: "Count", dataIndex: "count" },
  ];

  return (
    <main className=" px-5 py-8 max-w-2xl m-auto flex items-center h-screen">
      <Table
        onChange={tableChange}
        className="w-full"
        columns={columns}
        dataSource={data?.items}
        rowKey={(record) => record.name}
      />
    </main>
  );
};
