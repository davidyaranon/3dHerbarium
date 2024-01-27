/**
 * @file /app/about/page.tsx
 * @fileoverview the About page containing a video from the Cal Poly Humboldt Youtube video,
 * a non-flora model, and paragraphical information about the project.
 */

import { getAllSiteReadyModels } from '@/api/queries';
import { SiteReadyModels } from '@/api/types';

import Header from '@/components/Header/Header';
import Foot from '@/components/Shared/Foot';
import PageWrapper from '@/components/Shared/PageWrapper';

const About = async () => {

  const siteReadyModels: SiteReadyModels[] = await getAllSiteReadyModels();

  return (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1'></meta>
      <title>3D Herbarium iNaturalist - About Page</title>

      <Header pageRoute='inaturalist' headerTitle='About' siteReadyModels={siteReadyModels} />
      <PageWrapper>

        <h1 className='text-2xl dark:text-white text-center p-5'>Welcome to the Cal Poly Humboldt 3D Digital Herbarium</h1>

        <section id='humboldt-now-video' className='flex flex-col justify-center items-center rounded h-[75vh] w-[100%] max-h-[900px]'>
          <div className='w-[95%] sm:w-[75%] h-[85%] rounded'>
            <iframe className='w-full h-full rounded' src='https://www.youtube.com/embed/kUW6duHD2e8?si=n7gDhKkDOyMdbGac&autoplay=1&mute=1' title='YouTube video player' frameBorder='0' allowFullScreen></iframe>
          </div>
          <cite className='italic text-center mt-2 text-black dark:text-white z-10'>Source: <span className='text-[#004C46] dark:text-[#C3D5D1]'><a href='https://www.youtube.com/@CalPolyHumboldt' target='_blank' rel='noopener noreferrer'>@CalPolyHumboldt</a></span> on YouTube</cite>
        </section>

        <section className='flex items-center pb-10 text-lg dark:text-white w-[90%] sm:w-[75%] m-auto'>
          <p>
            The 3D Digital Herbairum is an innovative educational platform dedicated to bringing the intricate world of botany to life through state-of-the-art 3D modeling. At the heart of our mission is the desire to transform how students learn about flora, transcending traditional boundaries by offering an immersive, interactive experience.
            Our herbarium is a unique resource, meticulously designed for botany students and enthusiasts. It features a diverse collection of flora, each represented in stunning three-dimensional detail. These models offer an unparalleled opportunity to study and appreciate the intricate structures and characteristics of various plant species, providing a level of detail that far surpasses what&apos;s available in textbooks or two-dimensional images.
          </p>
        </section>

        <section className='flex items-center text-lg pb-10 dark:text-white w-[90%] sm:w-[75%] m-auto'>
          <p> Beyond merely viewing, our platform allows users to interact with these models, rotating and examining plants from every angle. This hands-on approach facilitates a deeper understanding of plant morphology and taxonomy, making it an invaluable tool for education and research.</p>
        </section>

        <section className='flex items-center text-lg dark:text-white w-[90%] sm:w-[75%] m-auto'>
          <p>Looking towards the future, our vision extends beyond botany. We plan to evolve the Cal Poly Humboldt 3D Digital Herbarium into a general comprehensive 3D learning platform. This expansion will encompass an array of subjects, offering 3D models that catering to a wide spectrum of academic fields and interests. Find below a 3D model of a mushroom.</p>
        </section>

        <section className='text-lg'>
          <section id='basket-model' className='flex flex-col justify-center items-center rounded h-[75vh] w-[100%] max-h-[900px]'>
            <div className='w-[95%] sm:w-[75%] h-[85%] rounded'>
              <iframe className='w-full h-full rounded' title="Mushroom" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking" src="https://sketchfab.com/models/34d0564f4d664fc1afa982975662ce5c/embed"> </iframe>
            </div>
          </section>
        </section>

        <section className='flex items-center text-lg dark:text-white w-[90%] sm:w-[75%] m-auto pb-10'>
          <p>Join us in exploring this new dimension of learning, where curiosity meets innovation, fostering a deeper appreciation and understanding of the natural and designed world.</p>
        </section>

      </PageWrapper>
      <Foot />
    </>
  );

};

export default About;