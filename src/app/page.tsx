'use client'

import Form from "@/components/Form"
import Result from "@/components/Result";
import { useState } from "react";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<ApiResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="home">
      <h1>Reisverzekering berekenen?</h1>
      <div className="home__content">
        {loading && <p className="loading">We zijn aan het rekenen...</p>}

        {!loading && !apiResponse && <Form setApiResponse={setApiResponse} setLoading={setLoading} />}

        {apiResponse && <Result result={apiResponse} />}

      </div>

      {apiResponse && <button type="button" onClick={() => setApiResponse(null)}>Nieuwe berekening maken</button>}

    </div>
  );
}
