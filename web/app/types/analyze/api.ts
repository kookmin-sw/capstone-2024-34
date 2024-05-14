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

export interface AnalyzePeFilesUploadResponse {
  success: boolean;
  message: string;
  data_uploader: FilesPeResultResponse;
  data_yara: GenAutoYaraAPIResponse;
}

export interface FilesPeResultResponse {
  files: FileName[];
  folderPath: String;
}

export interface FileName {
  origin_filename: string;
  conv_filename: string;
}

export interface GenAutoYaraAPIResponse {
  rule: string;
  extractSignature: string[];
}
