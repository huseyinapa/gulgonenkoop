"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const data = searchParams.get("userid");
  const data2 = searchParams.get("orderid");
  console.log(data);
  console.log(data2);

  return data ? <div>{data}</div> : <div>Parametre girilmemiş.</div>;
}

// export const generateStaticParams = () => [{ slug: "page" }];
