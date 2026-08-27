import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Comments from "@/components/sections/Comments";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div><Hero /></div>
      <div><About /></div>
      <div><Projects /></div>
      <div><Experience /></div>
      <div><Skills /></div>
      <div><Comments /></div>
      <div><Contact /></div>
    </div>
  );
}
