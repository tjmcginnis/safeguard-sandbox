import Form from "@/app/ui/form";
import Result from "@/app/ui/result";
import Explanation from "@/app/ui/explanation";

export default function Home() {
  return (
    <div className="h-[calc(100vh-8rem)] xs:flex-col sm:flex">
      <div className="mx-auto sm:w-1/2 p-2">
        <Form />
      </div>
      <div className="mx-auto sm:w-1/2 p-2">
        <div className="h-full relative flex flex-col">
          <Result />
          <Explanation />
        </div>
      </div>
    </div>
  );
}
