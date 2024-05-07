import {
  AnalyzePeFileUploadResponse,
  FilePeStringResultResponse,
} from "@customTypes/analyze/api";
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

  data.output.attack.forEach((file) => {
    result.push({
      key: keyCounter.toString(),
      extracted_string: file,
      status: "attack",
    });
    keyCounter++;
  });

  data.output.normal.forEach((file) => {
    result.push({
      key: keyCounter.toString(),
      extracted_string: file,
      status: "normal",
    });
    keyCounter++;
  });

  return result;
};

const FilePEResultCard = ({
  succcess,
  data,
  message,
}: AnalyzePeFileUploadResponse) => {
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
    <div className="focus:ring-brand-300 flex w-full max-w-full  flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm focus:outline-none focus:ring-4 md:p-5">
      {data.data_header ? (
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
                <p className="text-center text-sm text-neutral-600">DOS STUB</p>
              </div>
              <div className="col-span-2 bg-orange-100">
                <p className="text-sm text-neutral-600">Signature 0x50450000</p>
              </div>
              <div className="col-span-1 bg-orange-100">
                <p className="text-sm text-neutral-600">Machine</p>
              </div>
              <div className="col-span-1 bg-orange-100">
                <p className="text-sm text-neutral-600">#NumberOfSections</p>
              </div>
              <div className="col-span-2 bg-orange-100">
                <p className="text-sm text-neutral-600">TimeDateStamp</p>
              </div>
              <div className="col-span-2 bg-orange-100">
                <p className="text-sm text-neutral-600">PointerToSymbolTable</p>
              </div>
              <div className="col-span-2 bg-orange-100">
                <p className="text-sm text-neutral-600">
                  # NumberOfSymbolTable
                </p>
              </div>
              <div className="col-span-1 bg-orange-100">
                <p className="text-sm text-neutral-600">SizeOfOptionalHeader</p>
              </div>
              <div className="col-span-1 bg-orange-100">
                <p className="text-sm text-neutral-600">Characteristics</p>
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
                <p className="text-sm text-neutral-600">AddressOfEntryPoint</p>
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
                <p className="text-sm text-neutral-600">SectionAlignment</p>
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
                <p className="text-sm text-neutral-600">MajorImageVersion</p>
              </div>
              <div className="col-span-1 bg-amber-100">
                <p className="text-sm text-neutral-600">MinorImageVersion</p>
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
                <p className="text-sm text-neutral-600">Win32VersionValue</p>
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
                <p className="text-sm text-neutral-600">DllCharacteristics</p>
              </div>
              <div className="col-span-2 bg-amber-100">
                <p className="text-sm text-neutral-600">SizeOfStackReserve</p>
              </div>
              <div className="col-span-2 bg-amber-100">
                <p className="text-sm text-neutral-600">SizeOfStackCommit</p>
              </div>
              <div className="col-span-2 bg-amber-100">
                <p className="text-sm text-neutral-600">SizeOfHeapReserve</p>
              </div>
              <div className="col-span-2 bg-amber-100">
                <p className="text-sm text-neutral-600">SizeOfHeapCommit</p>
              </div>
              <div className="col-span-2 bg-amber-100">
                <p className="text-sm text-neutral-600">LoaderFlags</p>
              </div>
              <div className="col-span-2 bg-amber-100">
                <p className="text-sm text-neutral-600">#NumberOfRvaAndSizes</p>
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
                <p className="text-sm text-neutral-600">SizeOfExportTable</p>
              </div>
              <div className="col-span-2 bg-violet-100">
                <p className="text-sm text-neutral-600">ImportTable</p>
              </div>
              <div className="col-span-2 bg-violet-100">
                <p className="text-sm text-neutral-600">SizeOfImportTable</p>
              </div>
              <div className="col-span-2 bg-violet-100">
                <p className="text-sm text-neutral-600">ResourceTable</p>
              </div>
              <div className="col-span-2 bg-violet-100">
                <p className="text-sm text-neutral-600">SizeOfResourceTable</p>
              </div>
              <div className="col-span-2 bg-violet-100">
                <p className="text-sm text-neutral-600">ExceptionTable</p>
              </div>
              <div className="col-span-2 bg-violet-100">
                <p className="text-sm text-neutral-600">SizeOfExceptionTable</p>
              </div>
              <div className="col-span-2 bg-violet-100">
                <p className="text-sm text-neutral-600">CertificateTable</p>
              </div>
              <div className="col-span-2 bg-violet-100">
                <p className="text-sm text-neutral-600">
                  SizeOfCertificateTable
                </p>
              </div>
              <div className="col-span-2 bg-violet-100">
                <p className="text-sm text-neutral-600">BaseRelocationTable</p>
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
                <p className="text-sm text-neutral-600">LoadConfigTable</p>
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
                <p className="text-sm text-neutral-600">SizeOfBoundImport</p>
              </div>
              <div className="col-span-2 bg-violet-100">
                <p className="text-sm text-neutral-600">ImportAddressTable</p>
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
                <p className="text-sm text-neutral-600">CLRRuntimeHeader</p>
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
                <p className="text-sm text-neutral-600">Section Table Name</p>
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
                <p className="text-sm text-neutral-600">PointerToRawData</p>
              </div>
              <div className="col-span-2 bg-lime-100">
                <p className="text-sm text-neutral-600">PointerToRelocations</p>
              </div>
              <div className="col-span-2 bg-lime-100">
                <p className="text-sm text-neutral-600">PointerToLinenumbers</p>
              </div>
              <div className="col-span-1 bg-lime-100">
                <p className="text-sm text-neutral-600">NumberOfRelocations</p>
              </div>
              <div className="col-span-1 bg-lime-100">
                <p className="text-sm text-neutral-600">NumberOfLinenumbers</p>
              </div>
              <div className="col-span-2 bg-lime-100">
                <p className="text-sm text-neutral-600">Characteristics</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <p className="mb-2 ml-1 text-xl">문자열 추출 결과</p>
            <Table dataSource={dataSource} columns={columns} />;
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
      ) : (
        <div>분석결과 대기중</div>
      )}
    </div>
  );
};
export default FilePEResultCard;
