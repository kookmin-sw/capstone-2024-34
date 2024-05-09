import { AnalyzePeFileUploadResponse } from "@customTypes/analyze/api";
import { FilePeStringResultResponse } from "@customTypes/analyze/file_pe_string";
import { Table, TableColumnsType, TableProps, Tag } from "antd";

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
        <>
          {data.data_header ? (
            <div className="focus:ring-brand-300 flex w-full max-w-full  flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm focus:outline-none focus:ring-4 md:p-5">
              <div className="grid w-full gap-2 lg:grid-cols-2">
                {/* 점수 */}
                <div>
                  <p className="text-lg">분석점수</p>
                  <p className="text-xl">{data.data_strings.output.score}</p>
                </div>
                {/* 테이블 */}
                <div>
                  <div className="grid grid-cols-4 divide-y divide-neutral-500 border-y border-neutral-700">
                    <div className="col-span-4 bg-emerald-100">
                      <p className="text-center text-sm text-neutral-600">
                        DOS HEADER
                      </p>
                    </div>
                    <div className="col-span-4 bg-emerald-100">
                      <p className="text-center text-sm text-neutral-600">
                        DOS STUB
                      </p>
                    </div>
                    <div className="col-span-2 bg-orange-100">
                      <p className="text-sm text-neutral-600">
                        Signature 0x50450000
                      </p>
                    </div>
                    <div className="col-span-1 bg-orange-100">
                      <p className="text-sm text-neutral-600">Machine</p>
                    </div>
                    <div className="col-span-1 bg-orange-100">
                      <p className="text-sm text-neutral-600">
                        #NumberOfSections
                      </p>
                    </div>
                    <div className="col-span-2 bg-orange-100">
                      <p className="text-sm text-neutral-600">TimeDateStamp</p>
                    </div>
                    <div className="col-span-2 bg-orange-100">
                      <p className="text-sm text-neutral-600">
                        PointerToSymbolTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-orange-100">
                      <p className="text-sm text-neutral-600">
                        # NumberOfSymbolTable
                      </p>
                    </div>
                    <div className="col-span-1 bg-orange-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfOptionalHeader
                      </p>
                    </div>
                    <div className="col-span-1 bg-orange-100">
                      <p className="text-sm text-neutral-600">
                        Characteristics
                      </p>
                    </div>
                    <div className="col-span-1 bg-cyan-100">
                      <p className="text-sm text-neutral-600">Magic</p>
                    </div>
                    <div className="col-span-1 bg-cyan-100">
                      <p className="text-sm text-neutral-600">
                        Major/MinorLinker Version
                      </p>
                    </div>
                    <div className="col-span-2 bg-cyan-100">
                      <p className="text-sm text-neutral-600">SizeOfCode</p>
                    </div>
                    <div className="col-span-2 bg-cyan-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfInitializedData
                      </p>
                    </div>
                    <div className="col-span-2 bg-cyan-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfUninitializedData
                      </p>
                    </div>
                    <div className="col-span-2 bg-cyan-100">
                      <p className="text-sm text-neutral-600">
                        AddressOfEntryPoint
                      </p>
                    </div>
                    <div className="col-span-2 bg-cyan-100">
                      <p className="text-sm text-neutral-600">BaseOfCode</p>
                    </div>
                    <div className="col-span-2 bg-cyan-100">
                      <p className="text-sm text-neutral-600">BaseOfData</p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">ImageBase</p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">
                        SectionAlignment
                      </p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">FileAlignment</p>
                    </div>
                    <div className="col-span-1 bg-amber-100">
                      <p className="text-sm text-neutral-600">MajorOSVersion</p>
                    </div>
                    <div className="col-span-1 bg-amber-100">
                      <p className="text-sm text-neutral-600">MinorOSVersion</p>
                    </div>
                    <div className="col-span-1 bg-amber-100">
                      <p className="text-sm text-neutral-600">
                        MajorImageVersion
                      </p>
                    </div>
                    <div className="col-span-1 bg-amber-100">
                      <p className="text-sm text-neutral-600">
                        MinorImageVersion
                      </p>
                    </div>
                    <div className="col-span-1 bg-amber-100">
                      <p className="text-sm text-neutral-600">
                        MajorSubsystemVersion
                      </p>
                    </div>
                    <div className="col-span-1 bg-amber-100">
                      <p className="text-sm text-neutral-600">
                        MinorSubsystemVersion
                      </p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">
                        Win32VersionValue
                      </p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">SizeOfImage</p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">SizeOfHeaders</p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">CheckSum</p>
                    </div>
                    <div className="col-span-1 bg-amber-100">
                      <p className="text-sm text-neutral-600">Subsystem</p>
                    </div>
                    <div className="col-span-1 bg-amber-100">
                      <p className="text-sm text-neutral-600">
                        DllCharacteristics
                      </p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfStackReserve
                      </p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfStackCommit
                      </p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfHeapReserve
                      </p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfHeapCommit
                      </p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">LoaderFlags</p>
                    </div>
                    <div className="col-span-2 bg-amber-100">
                      <p className="text-sm text-neutral-600">
                        #NumberOfRvaAndSizes
                      </p>
                    </div>
                    <div className="col-span-4 bg-violet-100">
                      <p className="text-center text-sm text-neutral-600">
                        Optional Header
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">ExportTable</p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfExportTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">ImportTable</p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfImportTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">ResourceTable</p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfResourceTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">ExceptionTable</p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfExceptionTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        CertificateTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfCertificateTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        BaseRelocationTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfBaseRelocationTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">Debug</p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">SizeOfDebug</p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">GlobalPtr</p>
                    </div>
                    <div className="col-span-1 bg-violet-100">
                      <p className="text-sm text-neutral-600">0000</p>
                    </div>
                    <div className="col-span-1 bg-violet-100">
                      <p className="text-sm text-neutral-600">0000</p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">TLSTable</p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">SizeOfTLSTable</p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        LoadConfigTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfLoadConfigTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">BoundImport</p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfBoundImport
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        ImportAddressTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfImportAddressTable
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        DelayImportDescriptor
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfDelayImportDescriptor
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        CLRRuntimeHeader
                      </p>
                    </div>
                    <div className="col-span-2 bg-violet-100">
                      <p className="text-sm text-neutral-600">
                        SizeOfCLRRuntimeHeader
                      </p>
                    </div>
                    <div className="col-span-1 bg-violet-100">
                      <p className="text-sm text-neutral-600">0000</p>
                    </div>
                    <div className="col-span-1 bg-violet-100">
                      <p className="text-sm text-neutral-600">0000</p>
                    </div>
                    <div className="col-span-1 bg-violet-100">
                      <p className="text-sm text-neutral-600">0000</p>
                    </div>
                    <div className="col-span-1 bg-violet-100">
                      <p className="text-sm text-neutral-600">0000</p>
                    </div>
                    <div className="col-span-4 bg-lime-100">
                      <p className="text-sm text-neutral-600">
                        Section Table Name
                      </p>
                    </div>
                    <div className="col-span-2 bg-lime-100">
                      <p className="text-sm text-neutral-600">VirtualSize</p>
                    </div>
                    <div className="col-span-2 bg-lime-100">
                      <p className="text-sm text-neutral-600">VirtualAddress</p>
                    </div>
                    <div className="col-span-2 bg-lime-100">
                      <p className="text-sm text-neutral-600">SizeOfRawData</p>
                    </div>
                    <div className="col-span-2 bg-lime-100">
                      <p className="text-sm text-neutral-600">
                        PointerToRawData
                      </p>
                    </div>
                    <div className="col-span-2 bg-lime-100">
                      <p className="text-sm text-neutral-600">
                        PointerToRelocations
                      </p>
                    </div>
                    <div className="col-span-2 bg-lime-100">
                      <p className="text-sm text-neutral-600">
                        PointerToLinenumbers
                      </p>
                    </div>
                    <div className="col-span-1 bg-lime-100">
                      <p className="text-sm text-neutral-600">
                        NumberOfRelocations
                      </p>
                    </div>
                    <div className="col-span-1 bg-lime-100">
                      <p className="text-sm text-neutral-600">
                        NumberOfLinenumbers
                      </p>
                    </div>
                    <div className="col-span-2 bg-lime-100">
                      <p className="text-sm text-neutral-600">
                        Characteristics
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="mb-2 ml-1 text-xl">문자열 추출 결과</p>
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <p>Header 추출</p>
                  <p className="whitespace-pre-line text-wrap">
                    {JSON.stringify(data.data_header, null, 2)}
                  </p>
                </div>
                <div>
                  <p>String 추출</p>
                  <p className="whitespace-pre-line text-wrap">
                    {JSON.stringify(data.data_strings, null, 2)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};
export default FilePEResultCard;
