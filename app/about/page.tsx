import QuiltedImageList from "@/components/about/quilted-images";

export default function AboutMe() {
  return (
    <div className="max-w-4xl mx-auto px-8 text-lg space-y-8">
      <div className="flex justify-center">
        <QuiltedImageList />
      </div>

      <h1 className="text-3xl font-bold">About Me</h1>

      <p className="text-gray-900">
        I&apos;m a passionate software developer and cloud architect that loves creating the tools that make life easier and more enjoyable.
        As a student entering my first year of the Masters of Information Systems Management program at Brigham Young University,
        I have a strong foundation in the essential technologies that power the web and the world of data. Many of my projects focus on
        effective and secure data management, ensuring that your information is secure and accessible. Having worked in a variety of roles,
        I bring a well-rounded skillset to my projects, from front-end development to back-end systems. I also focus on creating intuitive user interfaces,
        data pipelines and visualizations, and robust cloud-based solutions that scale with your needs without breaking the bank.
      </p>

      <p className="text-gray-900">
        I specialize in building user-friendly interfaces and seamless user
        experiences, with an emphasis in predictive and secure software development. When I&apos;m not coding, you can find me exploring new
        technologies, debugging issues my teammates experience, and interacting with the end users of my software. Fun fact: My favorite distro of Linux is Mint.
      </p>

      <p className="text-gray-900 pb-10">
        Time away from my computer is critical for maintaining my drive, creativity, and problem-solving skills.
        I prioritize time outside spent hiking, biking, or running, but I also love to cook, read, and play multiplayer video games with my family.
        My personal belief is that a well-rounded life leads to a better understanding of the people whose lives I hope to improve through my work,
        so I&apos;m always looking for new experiences and challenges to take me out of my comfort zone. My vision is to spearhead the development of
        innovative solutions that utilize technology that improves productivity while prioritizing the well-being of users.
        I believe that technology and data can be a force for good, and I strive to create solutions that empower individuals to lead happier,
        healthier lives.
      </p>
    </div>
  );
}
