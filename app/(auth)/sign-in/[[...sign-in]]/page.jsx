import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <div className='relative grid grid-cols-1 md:grid-cols-2 min-h-screen'>
      <div className="relative w-full h-[50vh] md:h-full">
        <Image
          src={'/login.jpg'}
          alt='login'
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center md:relative bg-opacity-50 md:bg-transparent backdrop-blur md:backdrop-none">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md md:max-w-lg">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
