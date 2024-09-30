import dynamic from "next/dynamic";

export const CkEditor = dynamic(() =>
  import("./ck-editor").then((x) => x.INTERNAL_CkEditor),
);
