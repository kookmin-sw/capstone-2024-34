export interface YaraRuleCreateRespone {
  success: boolean;
  message: string;
  output: YaraRule;
}

export interface YaraRule {
  yara: string;
}

export interface GenYaraRulePeFilesUploadResponse {
  success: boolean | undefined;
  message: string | undefined;
  data_uploader: FilesPeUploaderResultResponse | undefined;
  data_yara: GenAutoYaraAPIResponse | undefined;
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
