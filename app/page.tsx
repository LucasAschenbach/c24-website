import CubeGrid from "../components/CubeGrid";
import Image from "next/image";
import c24Wordmark from "../public/c24-wordmark.svg";
import tbcWordmark from "../public/tbc-wordmark.svg";
import { RiArrowRightUpLine } from "react-icons/ri";

export default function Home() {
  return (
    <div className="relative">
      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 flex flex-row justify-center items-center space-x-8 px-12 py-8 z-50">
        <a
          href="https://tum-blockchain.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={tbcWordmark} alt="TUM Blockchain Club" height={54} />
        </a>
        <div className="flex-grow" />
        <a
          className="group flex flex-row space-x-4 items-center"
          href="https://www.tum-blockchain.com/conference2023"
          target="_blank"
          rel="noopener noreferrer"
        >
          Conference 2023
          <RiArrowRightUpLine />
        </a>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <div className="flex-[3_3_0%]" />
        <div className="">
          <Image src={c24Wordmark} alt="TUM Blockchain Conference 24" />
        </div>
        <div className="flex-[5_5_0%]">
          <div className="flex flex-col items-center text-center mt-12">
            <span className="text-lg">Munich, Deutsches Museum</span>
            <div className="h-1" />
            <span className="text-lg">September 12th - 13th</span>
            <div className="h-12" />
            <div className="flex flex-col">
              Last Year&apos;s Conference
              <div className="h-4" />
              <div className="flex flex-row items-center space-x-8">
                <div className="flex flex-col items-center">
                  <span className="text-2xl">1000+</span>
                  <span className="text-sm">Attendees</span>
                </div>
                <div className="h-8 w-0.5 bg-neutral-500" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl">100+</span>
                  <span className="text-sm">Speakers</span>
                </div>
                <div className="h-8 w-0.5 bg-neutral-500" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl">40+</span>
                  <span className="text-sm">Talks</span>
                </div>
                <div className="h-8 w-0.5 bg-neutral-500" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl">20+</span>
                  <span className="text-sm">Sponsors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-center space-x-8 px-12 py-8 z-10">
        {/* <span className="text-neutral-500">© 2024 TUM Blockchain Club</span> */}
        <div className="flex-grow" />
        <a
          className="text-neutral-500"
          href="https://tum-blockchain.notion.site/Privacy-Policy-3af6ed14b0b3429191a161f3dd0b379d"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
        <a
          className="text-neutral-500"
          href="mailto:info@tum-blockchain.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        <a
          className="text-neutral-500"
          href="https://www.tum-blockchain.com/imprint"
          target="_blank"
          rel="noopener noreferrer"
        >
          Impressum
        </a>
      </div>
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-tbc-yellow via-tbc-pink to-tbc-blue" />
      <div className="blur-[64px] translate-y-6 absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-tbc-yellow via-tbc-pink to-tbc-blue" /> */}
      <CubeGrid />
    </div>
  );
}
