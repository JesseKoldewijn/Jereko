"use client";

import { useLocale } from "@/providers/LocaleProvider";

const LanguageSwitch = () => {
  const { locale } = useLocale();

  return (
    <div>
      {locale}
      <button>EN</button>
      <button>NL</button>
    </div>
  );
};

export default LanguageSwitch;
