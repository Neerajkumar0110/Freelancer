/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
      { protocol: 'https', hostname: 'avatars.dicebear.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'random.imagecdn.app' },
      { protocol: 'https', hostname: 'cdn.worldvectorlogo.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'www.vectorlogo.zone' },
      { protocol: 'https', hostname: 'media.licdn.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'videocdn.cdnpk.net' },
      { protocol: 'https', hostname: 'img.freepik.com' },
      { protocol: 'https', hostname: 'cdn-icons-png.flaticon.com' },
      { protocol: 'https', hostname: 'cdnjs.cloudflare.com' },
        { protocol: 'https', hostname: 'www.careerlabconsulting.com' },
    ],
  },
};

export default nextConfig;