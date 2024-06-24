import { title } from "@/components/primitives";
// import { ScrollToTop } from "@/components/scrollToTop";

export default function RecipesPage() {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container gap-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Recipes
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore a curated selection of my most famous recipes.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group relative rounded-2xl overflow-hidden">
            <img
              src="https://placeholder.pics/svg/400x300"
              width="400"
              height="300"
              alt="Project 1"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white">
                Futuristic UI Design 1
              </h3>
              <p className="text-gray-300">
                An innovative and visually striking UI design for a cutting-edge
                technology platform.
              </p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden">
            <img
              src="https://placeholder.pics/svg/400x300"
              width="400"
              height="300"
              alt="Project 2"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white">
                Minimalist Branding 2
              </h3>
              <p className="text-gray-300">
                A clean and modern branding design for a sustainable lifestyle
                brand.
              </p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden">
            <img
              src="https://placeholder.pics/svg/400x300"
              width="400"
              height="300"
              alt="Project 3"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white">
                Interactive Web Experience 3
              </h3>
              <p className="text-gray-300">
                An engaging and immersive web experience that blends
                cutting-edge technology and creative design.
              </p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden">
            <img
              src="https://placeholder.pics/svg/400x300"
              width="400"
              height="300"
              alt="Project 4"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white">
                Responsive Mobile App
              </h3>
              <p className="text-gray-300">
                A beautifully designed and highly intuitive mobile application
                that delivers a seamless user experience.
              </p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden">
            <img
              src="https://placeholder.pics/svg/400x300"
              width="400"
              height="300"
              alt="Project 5"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white">
                Innovative Data Visualization
              </h3>
              <p className="text-gray-300">
                A visually stunning and highly informative data visualization
                project that brings complex information to life.
              </p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden">
            <img
              src="https://placeholder.pics/svg/400x300"
              width="400"
              height="300"
              alt="Project 6"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white">
                Immersive AR Experience
              </h3>
              <p className="text-gray-300">
                A groundbreaking augmented reality experience that transports
                users to a captivating virtual world.
              </p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden">
            <img
              src="https://placeholder.pics/svg/400x300"
              width="400"
              height="300"
              alt="Project 1"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white">
                Futuristic UI Design
              </h3>
              <p className="text-gray-300">
                An innovative and visually striking UI design for a cutting-edge
                technology platform.
              </p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden">
            <img
              src="https://placeholder.pics/svg/400x300"
              width="400"
              height="300"
              alt="Project 2"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white">
                Minimalist Branding
              </h3>
              <p className="text-gray-300">
                A clean and modern branding design for a sustainable lifestyle
                brand.
              </p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden">
            <img
              src="https://placeholder.pics/svg/400x300"
              width="400"
              height="300"
              alt="Project 3"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white">
                Interactive Web Experience
              </h3>
              <p className="text-gray-300">
                An engaging and immersive web experience that blends
                cutting-edge technology and creative design.
              </p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden">
            <img
              src="https://placeholder.pics/svg/400x300"
              width="400"
              height="300"
              alt="Project 4"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white">
                Responsive Mobile App
              </h3>
              <p className="text-gray-300">
                A beautifully designed and highly intuitive mobile application
                that delivers a seamless user experience.
              </p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden">
            <img
              src="https://placeholder.pics/svg/400x300"
              width="400"
              height="300"
              alt="Project 5"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white">
                Innovative Data Visualization
              </h3>
              <p className="text-gray-300">
                A visually stunning and highly informative data visualization
                project that brings complex information to life.
              </p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden">
            <img
              src="https://placeholder.pics/svg/400x300"
              width="400"
              height="300"
              alt="Project 6"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white">
                Immersive AR Experience
              </h3>
              <p className="text-gray-300">
                A groundbreaking augmented reality experience that transports
                users to a captivating virtual world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
