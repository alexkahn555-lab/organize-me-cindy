/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
    ],
  },
  async redirects() {
    return [
      // Group A: internal routes retired by the four-category restructure.
      // Tips content was cut; the single testimonial lives on the hoarding page.
      { source: '/tips', destination: '/', permanent: true },
      { source: '/testimonials', destination: '/', permanent: true },

      // Group B1: the previous nine room-by-room service slugs -> the four
      // categories. Garage, basement, storage, and photos are sections within
      // Home Organizing; going green folded into process.
      {
        source: '/services/closets',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/services/kitchens-pantries',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/services/garages-basements-attics',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/services/bedrooms-kids-rooms',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/services/photo-organizing',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/services/storage-units',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/services/home-pro-offices',
        destination: '/services/offices-paperwork',
        permanent: true,
      },
      {
        source: '/services/consulting-going-green',
        destination: '/services/offices-paperwork',
        permanent: true,
      },
      {
        source: '/services/moves',
        destination: '/services/moving-relocation',
        permanent: true,
      },

      // Group B2: old WordPress post URLs, sourced from public/videos.json
      // (found_on). The old blog carried the tips content, which was cut.
      { source: '/blog', destination: '/', permanent: true },
      {
        source: '/make-closet-redesigning-kellys-closet',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/mamas-closet',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/upgrading-closets-personal-touch',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/organizing-kellys-bedroom',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/organizing-kellys-bathroom',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/get-well-organized-pantry',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/spotless-kitchen',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/organized-garage',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/organizing-storage-units-first-steps',
        destination: '/services/home-organizing',
        permanent: true,
      },
      {
        source: '/organize-office',
        destination: '/services/offices-paperwork',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
