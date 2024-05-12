import { AnalyzePeFileUploadResponse } from "@customTypes/analyze/api";
import { FilePeStringResultResponse } from "@customTypes/analyze/file_pe_string";
import { Table, TableColumnsType, TableProps, Tag } from "antd";

import FilePEHeaderResultCard from "./file_pe_result_header";

interface ResultItem {
  key: string;
  extracted_string: string;
  status: string;
}

const generateTableDataSource = (
  data: FilePeStringResultResponse,
): ResultItem[] => {
  if (!data) return [];
  const result: ResultItem[] = [];
  let keyCounter = 1;

  data.output.attack.forEach((exString: string) => {
    result.push({
      key: keyCounter.toString(),
      extracted_string: exString,
      status: "attack",
    });
    keyCounter++;
  });

  data.output.normal.forEach((exString: string) => {
    result.push({
      key: keyCounter.toString(),
      extracted_string: exString,
      status: "normal",
    });
    keyCounter++;
  });

  return result;
};

const FilePEResultCard = ({
  success,
  data,
  message,
  isProgress,
}: AnalyzePeFileUploadResponse & { isProgress: boolean }) => {
  const dataSource = generateTableDataSource(data.data_strings);
  const columns: TableColumnsType<ResultItem> = [
    {
      title: "번호",
      dataIndex: "key",
      key: "key",
      width: "10%",
    },
    {
      title: "추출 텍스트",
      dataIndex: "extracted_string",
      key: "extracted_string",
      width: "80%",
    },
    {
      title: "공격/정상",
      dataIndex: "status",
      key: "status",
      width: "10%",
      filters: [
        {
          text: "공격",
          value: "attack",
        },
        {
          text: "정상",
          value: "normal",
        },
      ],
      onFilter: (value, record) => record.status === value,
      filterSearch: true,
      render: (_, { status }) => (
        <>
          <Tag
            color={status === "attack" ? "red" : "blue"}
            key={status + Math.random()}
          >
            {status === "attack" ? "공격" : "정상"}
          </Tag>
        </>
      ),
    },
  ];

  const onChange: TableProps<ResultItem>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      {isProgress ? (
        <div className="focus:ring-brand-300 flex min-h-96 w-full max-w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm focus:outline-none focus:ring-4 md:p-5">
          <div role="status">
            <svg
              aria-hidden="true"
              className="h-8 w-8 animate-spin fill-blue-600 text-gray-200"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <div>
            <p className="mt-2 text-neutral-400">파일 분석중</p>
          </div>
        </div>
      ) : (
        <div className="grid w-full max-w-full gap-4 sm:gap-6 lg:grid-cols-3">
          {data.data_header ? (
            <>
              <div className="grid gap-4 sm:gap-6">
                <div className="max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="border-b border-gray-200 px-4 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      분석 파일 기본 정보
                    </h2>
                    {/* <p className="text-sm text-gray-600 ">String 영역 분석</p> */}
                  </div>
                  <div className="flex w-full items-center justify-center">
                    <ul className="flex w-full flex-col">
                      <li className="items-center gap-x-2 border-b border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 last:border-0">
                        <p className="text-neutral-400">파일명</p>
                        <p>{data.fileInfo.fileName}</p>
                      </li>
                      <li className="items-center gap-x-2 border-b border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 last:border-0">
                        <p className="text-neutral-400">파일크기</p>
                        <p>
                          {Math.round(
                            (data.fileInfo.fileSize / (1024 * 1024)) * 100,
                          ) / 100}
                          MB
                        </p>
                      </li>
                      <li className="items-center gap-x-2 border-b border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 last:border-0">
                        <p className="text-neutral-400">파일 마지막 수정일</p>
                        <p>
                          {new Date(
                            data.fileInfo.fileLastModified,
                          ).toLocaleString()}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="border-b border-gray-200 px-4 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      공격 분석 점수
                    </h2>
                    {/* <p className="text-sm text-gray-600 ">String 영역 분석</p> */}
                  </div>
                  <div className="flex w-full items-center justify-center px-4 py-4 ">
                    <p className="w-full text-xl">
                      {data.data_strings.output.score}점
                    </p>
                  </div>
                </div>

                <div className="max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="border-b border-gray-200 px-4 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      주요 사용 라이브러리
                    </h2>
                    {/* <p className="text-sm text-gray-600 ">String 영역 분석</p> */}
                  </div>
                  <div className="flex w-full items-center justify-center px-4 py-4 ">
                    <p className="w-full text-xl"></p>
                  </div>
                </div>
              </div>

              <div className="max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
                <div className="border-b border-gray-200 px-4 py-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    헤더 영역 분석 시각화
                  </h2>
                  {/* <p className="text-sm text-gray-600 ">String 영역 분석</p> */}
                </div>
                <div className="flex w-full items-center justify-center px-4 py-4 ">
                  <p className="w-full text-xl">
                    <FilePEHeaderResultCard data={data.data_header} />
                  </p>
                </div>
              </div>

              <div className="max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-3">
                <div className="border-b border-gray-200 px-4 py-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    스트링 영역 분석
                  </h2>
                  {/* <p className="text-sm text-gray-600 ">String 영역 분석</p> */}
                </div>
                <div className="flex w-full items-center justify-center px-4 py-4 ">
                  <p className="w-full text-xl">
                    <Table
                      dataSource={dataSource}
                      columns={columns}
                      onChange={onChange}
                    />
                  </p>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
export default FilePEResultCard;
