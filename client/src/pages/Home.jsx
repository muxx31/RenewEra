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
    title: 'From Paper waste to Handmade notebooks',
    description:
      'See how startups transform office and school paper waste into eco-friendly notebooks.',
    path: '/stories/plastic-bottles-to-bags', // placeholder path
    image: '/images/card1.jpeg',
  },
  {
    title: 'Turning scrap metal into automotive parts',
    description:
      'Discover how startups sourced scrap metal to build sustainable vehicle components.',
    path: '/stories/scrap-metal-auto-parts',
    image: '/images/card2.jpeg',
  },
  {
    title: 'Turning cloth scraps into tote bags',
    description:
      'Learn how startups transformed discarded cloth scraps into eco-friendly totes.',
    path: '/stories/cloth-scraps-tote-bags',
    image: '/images/card3.jpeg',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Hero Banner */}
      <div className="bg-[url(/images/img1.jpeg)] bg-cover min-w-screen  h-70 text-center text-shadow-amber-950 text-shadow-2xs p-20 text-white  mb-0">
        <p className='text-2xl sm:text-4xl md:text-6xl'>The New Era of Waste Renewal</p>
        <p className='text-xl m-10 sm:text-2xl md:text-4xl'>Upcycling Today for a Greener Tomorrow</p>
      </div>


      <div className='w-screen h-120 flex flex-col md:flex-row '>
        <div className='bg-[url(/images/imgg1.jpeg)] w-700 bg-cover h-auto text-white text-center'>

        </div>
        <div className='text-white bg-stone-600 w-auto text-center'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl text-white'>Our Mission</h1>
          <p className='text-xl sm:text-xl md:text-3xl text-white m-8'>At RenewEra, we connect scrap materials to upcycling heroes — passionate startups and artisans who transform unused items into beautiful, valuable products.</p>
          <p className='text-xl sm:text-2xl md:text-4xl text-amber-100 m-8'>"What some see as scraps can become the foundation for innovation, sustainability, and positive change."</p>
        </div>
      </div>

      {/* Role Selection */}
      <section className="w-full grid md:grid-cols-2 gap-10 m-10 ml-20">
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
      <section className=" w-full">
        <h2 className="text-3xl font-bold text-white underline underline-offset-2 mb-10 ml-20 text-center">
          Featured Success Stories
        </h2>
        <div className="grid md:grid-cols-3 gap-20 justify-center ml-30 mr-0 ">
          {successStories.map(({ title, description, path, image }, idx) => (
            <Link
              key={idx}
              to={path}
              className="bg-amber-100 h-100 w-2xs rounded-lg shadow p-6 hover:shadow-lg transition block"
            >
              <h3 className="text-xl font-semibold mb-2 text-amber-950">{title}</h3>
              <p className="text-gray-700">{description}</p>
              <div
                style={{ backgroundImage: `url(${image})` }}
                className="bg-cover bg-center h-50 rounded-2xl mt-4"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
