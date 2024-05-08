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
