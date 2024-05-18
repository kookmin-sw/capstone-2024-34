"use client";

import { Table, TableColumnsType, TableProps, Tag, Tooltip } from "antd";
import { FileResultTableData } from "@customTypes/mock/dashboard";
import { useEffect, useState } from "react";
import moment from "moment";
import { Analysis } from "@prisma/client";

const ResultTable = () => {
  const [tableData, setTableData] = useState<FileResultTableData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/analyze", {
          method: "GET",
        });
        const data = await res.json();

        // let tmpData: FileResultTableData[] = [];
        const tmpData = data.map((element: Analysis, index: number) => {
          let tempResult;

          if (element.result === 1) {
            tempResult = "공격";
          } else if (element.result === 0) {
            tempResult = "정상";
          } else {
            tempResult = "보류";
          }

          return {
            key: index,
            id: index,
            date: moment(element.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
            filename: element.filename,
            result: tempResult,
            score: element.score,
          };
        });

        setTableData(tmpData);
      } catch (err) {
        console.log("Failed to send request");
      }
    };
    fetchData();
  }, []);

  const columns: TableColumnsType<FileResultTableData> = [
    {
      title: "번호",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, { id }) => (
        <div key={id + Math.random()}>
          <span className="text-sm text-gray-600">{id + 1}</span>
        </div>
      ),
    },
    {
      title: "일시",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "파일명",
      dataIndex: "filename",
      key: "filename",
      render: (_, { filename }) => (
        <div key={filename + Math.random()}>
          <span className="text-sm text-gray-600">{filename}</span>
        </div>
      ),
    },
    {
      title: "탐지결과",
      dataIndex: "result",
      key: "result",
      filters: [
        {
          text: "정상",
          value: "정상",
        },
        {
          text: "보류",
          value: "보류",
        },
        {
          text: "공격",
          value: "공격",
        },
      ],
      onFilter: (value, record) => record.result === value,
      render: (_, { result }) => (
        <div key={result + Math.random()}>
          {result === "정상" ? (
            <span className="inline-flex items-center gap-x-1 rounded-full bg-teal-100 px-1.5 py-1 text-xs font-medium text-teal-800">
              <svg
                className="size-2.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              정상
            </span>
          ) : result === "공격" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
              <svg
                className="size-2.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
              </svg>
              공격
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
              <svg
                className="size-2.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
              </svg>
              대기
            </span>
          )}
        </div>
      ),
    },
    {
      title: "탐지 개수",
      dataIndex: "score",
      key: "score",
      render: (_, { score }) => (
        <div className="px-6 py-2" key={`${score} + ${Math.random()}`}>
          <span className="text-sm text-gray-600">{score}</span>
        </div>
      ),
    },
  ];

  const onChange: TableProps<FileResultTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Table
        dataSource={tableData}
        columns={columns}
        onChange={onChange}
      ></Table>
    </div>
  );
};

export default ResultTable;
