"use client";

import { ErrorPage } from "@/containers";

export default () => {
  return (
    <ErrorPage
      code="500"
      title="Uups, some technical hiccup happened, we are working on resolving it."
    />
  );
}
