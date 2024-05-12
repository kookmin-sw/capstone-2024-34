import { FilePeStringResultResponse } from "@customTypes/analyze/file_pe_string";
import { FilePeHeaderResultResponse } from "@customTypes/analyze/file_pe_header";

export interface AnalyzePeFileUploadResponse {
  success: boolean;
  message: string;
  data: FilePeResultResponse;
}

export interface FilePeResultResponse {
  data_header: FilePeHeaderResultResponse;
  data_strings: FilePeStringResultResponse;
}

export interface AnalyzePeFilesUploadResponse {
  success: boolean;
  message: string;
  data: FilesPeResultResponse;
}

export interface FilesPeResultResponse {
  files: FileName[];
  folderPath: String;
}

export interface FileName {
  origin_filename: string;
  conv_filename: string;
}
