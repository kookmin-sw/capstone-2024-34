import { FilePeStringResultResponse } from "@customTypes/analyze/file_pe_string";
import { FilePeHeaderResultResponse } from "@customTypes/analyze/file_pe_header";
import exp from "constants";

export interface AnalyzePeFileUploadResponse {
  success: boolean | undefined;
  message: string | undefined;
  data: FilePeResultResponse;
}

export interface FileInfo {
  fileName: string;
  fileType: string;
  fileSize: number;
  fileLastModified: number;
}

export interface FilePeResultResponse {
  data_header: FilePeHeaderResultResponse;
  data_strings: FilePeStringResultResponse;
  fileInfo: FileInfo;
}
