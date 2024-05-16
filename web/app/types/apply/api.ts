import { FilesPeUploaderResultResponse } from "@customTypes/generate/api";

export interface ApplyYaraRulePeFilesUploadResponse {
  success: boolean | undefined;
  message: string | undefined;
  data_uploader: FilesPeUploaderResultResponse | undefined;
}
