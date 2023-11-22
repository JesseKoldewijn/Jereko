"use client";

interface GoToHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GoToHeading = ({ children, ...rest }: GoToHeadingProps) => {
  const goToNavigation = () => {
    const navigationElem = document.getElementById("about-me-navigation");
    if (!navigationElem) return;
    window.scrollTo({
      top: navigationElem.offsetTop - 250,
      behavior: "smooth",
    });
  };

  return (
    <span onClick={goToNavigation} {...rest}>
      {children}
    </span>
  );
};

export default GoToHeading;
