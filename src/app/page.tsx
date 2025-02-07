import Form from "@/components/Form"
import Result from "@/components/Result";

export default function Home() {
  return (
    <div className="layout">
      <p> Reisverzekering berekenen?</p>
      <Form />
      <Result />
    </div>
  );
}
