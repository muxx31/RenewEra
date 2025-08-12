import React from 'react';
import { Link } from 'react-router-dom';

const roles = [
  {
    title: 'I have materials to give',
    description: 'Join as a Supplier and connect with startups seeking your raw materials.',
    role: 'supplier',
    path: '/login', // or signup path for supplier
  },
  {
    title: 'I need materials to make products',
    description: 'Join as a Startup and find reliable suppliers for your production needs.',
    role: 'startup',
    path: '/login', // or signup path for startup
  },
];

const successStories = [
  {
    title: 'From plastic bottles to school bags',
    description:
      'See how our platform helped transform waste materials into durable and stylish school bags.',
    path: '/stories/plastic-bottles-to-bags', // placeholder path
  },
  {
    title: 'Turning scrap metal into automotive parts',
    description:
      'Discover how startups sourced scrap metal to build sustainable vehicle components.',
    path: '/stories/scrap-metal-auto-parts',
  },
  {
    title: 'Turning cloth scraps into tote bags',
    description:
      'Learn how startups transformed discarded cloth scraps into stylish, eco-friendly tote bags, creating jobs and reducing textile waste.',
    path: '/stories/cloth-scraps-tote-bags',
  },  
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Banner */}
      <div className="bg-[url(/images/img1.jpeg)] bg-contain min-w-screen h-70 text-center text-7xl text-shadow-amber-950 text-shadow-2xs p-20 text-white  mb-0">
      The New Era of Waste Renewal
      <p className='text-3xl m-10'>Upcycling Today for a Greener Tomorrow</p>
      </div>


      <div className='flex w-screen m-4 h-120'>
      <div className='bg-[url(/images/img2.png)] w-700 bg-contain h-auto text-white text-center'>

      </div>
        <div className= 'text-white bg-cyan-800 w-auto text-center'>
        <h1 className='text-4xl text-white'>Our Mission</h1>
        <p className='text-3xl text-white m-8'>At RenewEra, we connect scrap materials to upcycling heroes — passionate startups and artisans who transform unused items into beautiful, valuable products.</p>
        <p className='text-4xl text-amber-100 m-8'>"What some see as scraps can become the foundation for innovation, sustainability, and positive change."</p>
        </div>
      </div>

      {/* Role Selection */}
      <section className="min-w-full w-full grid md:grid-cols-2 gap-10 mb-20">
        {roles.map(({ title, description, role, path }) => (
          <div
            key={role}
            className="bg-amber-100 rounded-xl shadow-md p-8 hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-2xl font-semibold mb-3 text-amber-950">{title}</h2>
            <p className="text-gray-600">{description}</p>
            <Link
              to={path}
              className="inline-block mt-6 px-5 py-2 bg-amber-950 text-amber-100 rounded hover:bg-indigo-700 transition"
            >
              Get Started as {role.charAt(0).toUpperCase() + role.slice(1)}
            </Link>
          </div>
        ))}
      </section>

      {/* Featured Success Stories */}
      <section className="max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-white underline underline-offset-2 mb-8 text-center">
          Featured Success Stories
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {successStories.map(({ title, description, path }, idx) => (
            <Link
              key={idx}
              to={path}
              className="bg-amber-100 h-100 rounded-lg shadow p-6 hover:shadow-lg transition block"
            >
              <h3 className="text-xl font-semibold mb-2 text-amber-950">{title}</h3>
              <p className="text-gray-700">{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

