'use client'

import Form from "@/components/Form"
import Result from "@/components/Result";
import { useState } from "react";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<ApiResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="layout">
      <h1>Reisverzekering berekenen?</h1>

      {loading && <p>Loading...</p>}

      {!loading && !apiResponse && <Form setApiResponse={setApiResponse} setLoading={setLoading} />}

      {apiResponse && <Result result={apiResponse} />}
    </div>
  );
}
