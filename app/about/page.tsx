import QuiltedImageList from "@/components/about/quilted-images";

export default function AboutMe() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-8 text-lg">
      <div className="flex justify-center">
        <QuiltedImageList />
      </div>

      <h1 className="text-3xl font-bold">About Me</h1>

      <p className="text-gray-900">
        I am a software engineer and cloud architect with a passion for building
        reliable, secure, and highly scalable systems. As a Master&apos;s student
        in Information Systems Management at BYU, my technical focus spans from
        intuitive front-end interfaces to robust back-end data pipelines. For
        me, development goes beyond just writing code—it&apos;s about understanding
        complex constraints, prioritizing data integrity, and designing
        architectural boundaries that ensure information remains accessible and
        secure.
      </p>

      <p className="text-gray-900">
        Currently, I&apos;m applying these methodologies to build Stu Recruiting, a
        platform that integrates with Applicant Tracking Systems to transform
        conventional resumes into structured, evidence-backed candidate profiles.
        Designing for the hiring space forces strict constraints, requiring
        rigorous employer data isolation and an uncompromising approach to
        interpretability. Rather than using AI as a black box to rank applicants,
        the system solves for data quality—normalizing unstructured inputs into
        verifiable capabilities. I treat robust data modeling as the bedrock
        requirement before any assistive intelligence can be reliably applied.
      </p>

      <p className="pb-10 text-gray-900">
        Time away from my computer is critical for maintaining my drive,
        creativity, and problem-solving skills. Whether I&apos;m exploring new
        technologies (my favorite Linux distro is Mint), hiking, biking,
        reading, or playing multiplayer video games with my family, I value the
        balance that life outside of code brings. I consistently find that
        understanding real-world complexities is what ultimately drives more
        resilient, empathetic, and pragmatic software design.
      </p>
    </div>
  );
}
