import React from 'react';
import { Link } from 'react-router-dom';

const roles = [
  {
    title: 'I have materials to give',
    description: 'Join as a Supplier and connect with startups seeking your raw materials.',
    role: 'supplier',
    path: '/auth', // or signup path for supplier
  },
  {
    title: 'I need materials to make products',
    description: 'Join as a Startup and find reliable suppliers for your production needs.',
    role: 'startup',
    path: '/auth', // or signup path for startup
  },
];

const successStories = [
  {
    title: 'From Paper waste to Handmade notebooks',
    description:
      'See how startups transform office and school paper waste into eco-friendly notebooks.',
    //path: '/stories/plastic-bottles-to-bags', // placeholder path
    image: '/images/card1.jpeg',
  },
  {
    title: 'Turning scrap metal into automotive parts',
    description:
      'Discover how startups sourced scrap metal to build sustainable vehicle components.',
    //path: '/stories/scrap-metal-auto-parts',
    image: '/images/card2.jpeg',
  },
  {
    title: 'Turning cloth scraps into tote bags',
    description:
      'Learn how startups transformed discarded cloth scraps into eco-friendly totes.',
    //path: '/stories/cloth-scraps-tote-bags',
    image: '/images/card3.jpeg',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <div className="bg-[url(/images/img1.jpeg)] bg-cover bg-center w-full text-center text-shadow-amber-950 text-shadow-2xs px-4 sm:px-6 md:px-20 py-16 sm:py-20 md:py-24 text-white">
        <p className="text-xl sm:text-3xl md:text-6xl leading-tight">
          The New Era of Waste Renewal
        </p>
        <p className="text-lg sm:text-2xl md:text-4xl mt-4 sm:mt-6 md:mt-10">
          Upcycling Today for a Greener Tomorrow
        </p>
      </div>

      {/* Our Mission */}
      <div className="w-full flex flex-col md:flex-row">
        <div className="bg-[url(/images/imgg1.jpeg)] bg-cover bg-center w-full md:w-1/2 h-64 md:h-auto"></div>
        <div className="text-white bg-stone-600 w-full md:w-1/2 text-center p-6 sm:p-8 md:p-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">Our Mission</h1>
          <p className="text-base sm:text-lg md:text-2xl text-white mt-4 sm:mt-6">
            At RenewEra, we connect scrap materials to upcycling heroes — passionate startups and artisans who transform unused items into beautiful, valuable products.
          </p>
          <p className="text-base sm:text-xl md:text-2xl text-amber-100 mt-4 sm:mt-6">
            "What some see as scraps can become the foundation for innovation, sustainability, and positive change."
          </p>
        </div>
      </div>

      {/* Role Selection */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 p-4 sm:p-8 md:px-20">
        {roles.map(({ title, description, role, path }) => (
          <div
            key={role}
            className="bg-amber-100 rounded-xl shadow-md p-6 sm:p-8 hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-amber-950">
              {title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">{description}</p>
            <Link
              to={path}
              className="inline-block mt-6 px-4 sm:px-5 py-2 bg-amber-950 text-amber-100 rounded hover:bg-indigo-700 transition text-sm sm:text-base"
            >
              Get Started as {role.charAt(0).toUpperCase() + role.slice(1)}
            </Link>
          </div>
        ))}
      </section>

      {/* Featured Success Stories */}
      <section className="w-full px-4 sm:px-6 md:px-20 mt-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white underline underline-offset-2 mb-6 sm:mb-10 text-center">
          Featured Success Stories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 justify-center">
          {successStories.map(({ title, description, path, image }, idx) => (
            <Link
              key={idx}
              to={path}
              className="bg-amber-100 rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition block"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-amber-950">
                {title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">{description}</p>
              <div
                style={{ backgroundImage: `url(${image})` }}
                className="bg-cover bg-center h-40 sm:h-50 md:h-60 rounded-2xl mt-4"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
