interface FilePeResultCardProps {
  data: JSON | undefined;
}
const FilePeResultCard = (props: FilePeResultCardProps) => {
  return <div>{JSON.stringify(props.data)}</div>;
};
export default FilePeResultCard;
