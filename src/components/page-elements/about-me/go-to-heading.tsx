"use client";

interface GoToHeadingProps extends React.HTMLAttributes<HTMLButtonElement> {
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
    <button onClick={goToNavigation} {...rest}>
      {children}
    </button>
  );
};

export default GoToHeading;
