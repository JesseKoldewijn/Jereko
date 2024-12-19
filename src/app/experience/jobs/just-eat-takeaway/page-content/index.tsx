import { JetLogo } from "@/components/just-eat-takeaway/logos";
import "@/components/just-eat-takeaway/pie-common.css";
import { db } from "@/server/db/conn";

import { JetJobPageLoader } from "./loading/lazy";

const JetJobPageContentLayout = () => {
  return (
    <>
      <JetJobPageLoader content={<JetJobPageContent />} />
    </>
  );
};

const JetJobPageContent = async () => {
  const jetJob = await db.query.experiences.findFirst({
    where: (exp, { eq }) => eq(exp.company_name, "Just Eat Takeaway.com"),
  });
  if (!jetJob) {
    throw new Error("Job details not found");
  }

  return (
    <div className="flex min-h-[90svh] flex-col justify-center gap-10">
      <section className="flex w-full flex-col items-center justify-center gap-3">
        <JetLogo className="text-company-justeat-brand h-auto w-64 md:w-80" />
        <p className="text-sm">
          Role: <span>{jetJob.title}</span>
        </p>
      </section>
      <section className="flex w-full flex-col items-center justify-center gap-3">
        <span className="text-muted-foreground">More details to come!</span>
      </section>
    </div>
  );
};

export default JetJobPageContentLayout;
