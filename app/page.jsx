import Form from "./addTodoForm";
import Todos from "./todos";
import React, { Suspense } from "react";
import Loading from './loading'
export default async function Home() {
  return (
    <div className="container">
      <Form />
      <Suspense fallback={<Loading />}>
        <Todos />
      </Suspense>
    </div>
  );
}
