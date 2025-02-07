import Form from "@/components/Form"
import Result from "@/components/Result";

export default function Home() {
  return (
    <div className="layout">
      <h1> Reisverzekering berekenen?</h1>
      <Form />
      <Result />
    </div>
  );
}
