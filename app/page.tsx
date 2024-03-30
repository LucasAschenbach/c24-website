import CubeGrid from '../components/CubeGrid';
import Image from 'next/image';
import c24Wordmark from '../public/c24-wordmark.svg';

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <Image src={c24Wordmark} alt="TUM Blockchain Conference 24" />
        <div className="flex flex-col text-center mt-8">
          <span className="text-lg">Munich, Deutsches Museum</span>
          <div className="h-2" />
          <span className="text-lg">12.09 - 13.09</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-center space-x-8 px-12 py-8">
        <div className="flex-grow" />
        <a className="text-neutral-500" href="https://www.tum-blockchain.com/imprint" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        <a className="text-neutral-500" href="https://tum-blockchain.notion.site/Privacy-Policy-3af6ed14b0b3429191a161f3dd0b379d" target="_blank" rel="noopener noreferrer">
          Impressum
        </a>
      </div>
      <CubeGrid />
    </div>
  );
}
