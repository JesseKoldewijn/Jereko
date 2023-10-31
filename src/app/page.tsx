import LanguageSwitch from "@/components/i18n/LanguageSwitch";

const Home = () => {
  return (
    <main>
      <div className="flex h-full w-full flex-1 flex-col">
        <LanguageSwitch />
      </div>
    </main>
  );
};

export default Home;
