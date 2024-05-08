export interface AnalyzePeFileUploadResponse {
  success: boolean;
  message: string;
  data: FilePeResultResponse;
}

export interface FilePeResultResponse {
  data_header: JSON;
  data_strings: FilePeStringResultResponse;
}

export interface FilePeStringResultResponse {
  output: {
    score: number;
    attack: string[];
    normal: string[];
  };
}
