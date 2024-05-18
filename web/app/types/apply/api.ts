import { FileName, YaraRule } from "@customTypes/generate/api";
import { YaraRuleDB } from "@customTypes/yara/db";

export interface ApplyYaraRulePeFilesUploadResponse {
  success: boolean | undefined;
  message: string | undefined;
  data_uploader: ApplyYaraRuleFilesUploadResponse | undefined;
  data_apply_yara: ApplyYaraPythonAPIResponse | undefined;
}

export interface ApplyYaraRuleYarFileUploadResponse {
  success: boolean | undefined;
  message: string | undefined;
  data_db: YaraRuleDB | undefined;
}

export interface ApplyYaraRuleFilesUploadResponse {
  files: FileName[];
  folderPath: String;
  yara: string;
}

export interface ApplyYaraPythonAPIResponse {
  output: {
    path: string;
    data: ApplyYaraPythonAPIFileItem[];
  };
}
export interface ApplyYaraPythonAPIFileItem {
  id: number;
  filename: string;
  match: boolean;
}
