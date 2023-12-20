import GeistMono from "@/fonts/geist-mono/GeistMono-Variable.woff2";
import GeistSans from "@/fonts/geist-sans/Geist-Variable.woff2";

const FontLoader = ({ isNextjs }: { isNextjs?: boolean }) => {
  if (!isNextjs) {
    return (
      <>
        <link
          rel="prefetch"
          href={GeistSans}
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="prefetch"
          href={GeistMono}
          as="font"
          crossOrigin="anonymous"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Geist';
                font-display: swap;
                src: url(${GeistSans}) format('woff2-variations');
              }
              @font-face {
                font-family: 'Geist Mono';
                font-display: swap;
                src: url(${GeistMono}) format('woff2-variations');
              }
              :root {
                --font-sans: 'Geist', Roboto, "Helvetica Neue", sans-serif;
                --font-mono: 'Geist Mono', monospace;
  
                font-family: var(--font-sans)!important;
              }
            `,
          }}
        ></style>
      </>
    );
  }
};
export default FontLoader;
