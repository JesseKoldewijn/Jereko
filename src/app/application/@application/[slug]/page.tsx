import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import Avatar from "@/images/profile.webp";
import { db } from "@/server/db/conn";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

export async function generateStaticParams() {
  const applications = await db.query.Application.findMany();

  if (!applications || applications.length == 0) return [];

  return applications.map((application) => ({
    slug: application.slug,
  }));
}

const ApplicationPage = async ({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) => {
  const applicationData = await db.query.Application.findFirst({
    where: (x, { eq }) => {
      return eq(x.slug, slug);
    },
  });

  if (!applicationData || !slug) {
    notFound();
  }

  return (
    <div>
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: "Application",
          description: applicationData?.title ?? "",
        }}
      />
      <div
        className="prose prose-p:text-pretty lg:prose-xl prose-strong:text-foreground mx-4 flex max-w-2xl flex-col flex-wrap break-words text-foreground opacity-90 md:mx-auto"
        dangerouslySetInnerHTML={{
          __html: applicationData?.content_html ?? "",
        }}
      ></div>
    </div>
  );
};

export default ApplicationPage;
