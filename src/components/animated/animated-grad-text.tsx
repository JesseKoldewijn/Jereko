import { cn } from "@/lib/utils";
import { animatedGradient } from "@/utils/prog-classes";

type UnionTextHtmlAttrs = React.HTMLAttributes<
  HTMLHeadingElement | HTMLSpanElement | HTMLParagraphElement
>;

interface AnimatedGradientText extends UnionTextHtmlAttrs {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  text: string;
  noSplit?: boolean;
}

const AnimatedGradientText = ({
  text,
  variant,
  noSplit,
  ...props
}: AnimatedGradientText) => {
  const textArray = text.split("");

  const TextWrapping = ({ variant, text, ...rest }: AnimatedGradientText) => {
    switch (variant) {
      case "h1":
        return <h1 {...rest}>{text}</h1>;
      case "h2":
        return <h2 {...rest}>{text}</h2>;
      case "h3":
        return <h3 {...rest}>{text}</h3>;
      case "h4":
        return <h4 {...rest}>{text}</h4>;
      case "h5":
        return <h5 {...rest}>{text}</h5>;
      case "h6":
        return <h6 {...rest}>{text}</h6>;
      case "span":
        return <span {...rest}>{text}</span>;
      case "p":
        return <p {...rest}>{text}</p>;
      default:
        return <span {...rest}>{text}</span>;
    }
  };

  const TextOutput = ({
    text,
    variant,
    className,
    ...rest
  }: AnimatedGradientText) => {
    return (
      <TextWrapping
        variant={variant}
        className={cn(animatedGradient(), className)}
        text={text}
        {...rest}
      />
    );
  };

  return (
    <>
      {!noSplit && textArray.length > 2 && text.length > 28 ? (
        textArray.map((word, index) => (
          <TextOutput key={index} text={word} variant={variant} {...props} />
        ))
      ) : (
        <TextOutput text={text} variant={variant} {...props} />
      )}
    </>
  );
};

export default AnimatedGradientText;
