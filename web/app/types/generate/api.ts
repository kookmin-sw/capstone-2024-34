export interface YaraRuleCreateRespone {
  success: boolean;
  message: string;
  output: YaraRule;
}

export interface YaraRule {
  yara: string;
}

export interface GenYaraRulePeFilesUploadResponse {
  success: boolean;
  message: string;
  data_uploader: FilesPeUploaderResultResponse;
  data_yara: GenAutoYaraAPIResponse;
}

export interface FilesPeUploaderResultResponse {
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
