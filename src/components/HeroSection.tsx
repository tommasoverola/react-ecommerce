import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="w-full relative flex items-center  bg-gray-100">
      {/* Background image */}
      <img
        src="/hero.png" // replace with your image path
        alt="Hero background"
        className="h-full w-full object-cover"
      />

      {/* Content overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 items-center h-full">
          {/* Text section */}
          <div className="space-y-4 max-w-lg">
            <p className="text-main uppercase tracking-wide text-base font-poppins">
              Winter Comfort, Timeless Design
            </p>
            <h1 className="text-4xl font-semibold text-variant4 font-poppins">
              Discover Our Winter Furniture Collection
            </h1>
            <p className="text-variant4 text-base font-normal font-poppins">
              Transform your space with pieces designed for warmth and style this season.
            </p>
            <Link
              to="/"
              className=" uppercase inline-block px-6 py-3 bg-main text-white font-normal rounded-3xl hover:bg-main transition duration-300 font-poppins"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
