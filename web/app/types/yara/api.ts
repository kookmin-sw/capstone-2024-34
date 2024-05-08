export interface YaraRuleCreateRespone {
  success: boolean;
  message: string;
  output: YaraRule;
}

export interface YaraRule {
  yara: string;
}
