import React from "react";

const AboutHero: React.FC = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className="md:w-1/6 w-2/6 mb-10 object-cover object-center rounded-full"
            alt="hero"
            src="https://avatars.githubusercontent.com/u/96565730?v=4"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              About Me
            </h1>
            <p className="mb-8 leading-relaxed">
              My name is <b>Kartik Joshi</b>. I'm a passionate Full Stack Web Developer with expertise in MERN Stack and a strong background in programming languages like C, Python, C++, Java, and JavaScript. Also, I've a little experience in TypeScript. Currently, I'm learning DevOps tools like Docker, Ansible, Jenkins (CI/CD Pipelining) and Kubernetes. I'm an <b>AWS Certified Cloud Practitioner</b>. I'm committed to delivering user-friendly web applications and continuously exploring new technologies and am open to exciting opportunities in web development. Let's connect and create something amazing together!
            </p>
            <div className="flex justify-center">
              <a href="https://github.com/kartikjoshi267" target="_blank" className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
                Github Link
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHero;
