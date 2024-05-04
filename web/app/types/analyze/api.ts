export interface AnalyzePeFileUploadResponse {
  succcess: boolean;
  message: string;
  data: FilePeResultResponse;
}

export interface FilePeResultResponse {
  data_header: JSON | undefined;
  data_strings: JSON | undefined;
}
