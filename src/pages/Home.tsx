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
  const { page, setPage, pageSize, setPageSize, order, sort } = usePageStore(
    (state) => ({
      pageSize: state.pageSize,
      page: state.page,
      order: state.order,
      sort: state.sort,
      setPage: state.setPage,
      setPageSize: state.setPageSize,
    })
  );

  const { isPending, error, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["tags", page],
    queryFn: () => getTags(page, pageSize, order, sort),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (!isPlaceholderData && data?.has_more && page > 25) {
      queryClient.prefetchQuery({
        queryKey: ["tags", page + 1],
        queryFn: () => getTags(page + 1, pageSize, order, sort),
        staleTime: 1000 * 60 * 10,
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  const tableChange = (pagination) => {
    setPage(pagination.current);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
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
        pagination={{
          current: page,
          total: pageSize * 25,
        }}
      />
    </main>
  );
};
