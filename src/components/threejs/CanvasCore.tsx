import { type CanvasProps } from "@react-three/fiber";

import dynamic from "next/dynamic";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 h-full min-h-full w-full min-w-full">
        <div className="absolute inset-0 rounded-3xl bg-foreground opacity-10 blur-sm"></div>
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    ),
  },
);

/**

 * The `CanvasCore` function in TypeScript React renders a `Canvas` component with the provided props.
 * @param {CanvasProps} props - The `props` parameter in the `CanvasCore` function is of type
 * `CanvasProps`, which likely contains the properties or configuration settings needed for rendering a
 * canvas element.
 * 
 * Make sure to use this component in a dynamic import to prevent server-side rendering issues.
 * And also prevent the initial js bundle size from getting too large.
 * 
 * @returns A JSX element `<Canvas>` with the props passed to the `CanvasCore` component.
 */
const CanvasCore = (props: CanvasProps) => {
  return <Canvas {...props} />;
};

export default CanvasCore;
