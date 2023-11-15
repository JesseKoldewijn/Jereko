// "use client";

// import { useEffect } from "react";

// interface NextPwaWrapper {
//   isProd: boolean;
//   children: React.ReactNode;
// }

// const NextPwaWrapper = ({ isProd, children }: NextPwaWrapper) => {
// useEffect(() => {
//   if (isProd && "serviceWorker" in navigator) {
//     navigator.serviceWorker.register("/sw.js", { scope: "/" });
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

//   return <>{children}</>;
// };

// export default NextPwaWrapper;

export {};
