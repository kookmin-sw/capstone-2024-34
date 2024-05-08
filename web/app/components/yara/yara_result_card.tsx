import { YaraRuleCreateRespone } from "@customTypes/yara/api";

const YaraRuleResultCard = ({
  success,
  output,
  message,
}: YaraRuleCreateRespone) => {
  console.log(output);
  return (
    <div>{output ? <div>{output.yara}</div> : <div>분석결과 대기중</div>}</div>
  );
};
export default YaraRuleResultCard;
