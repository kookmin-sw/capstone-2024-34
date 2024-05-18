const SigCount = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signature`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const sigCount = data.length;

  return <div>{sigCount.toLocaleString("ko-KR")}</div>;
};

export default SigCount;
