'use client'
import Image from "next/image";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <Button text="Clic aquí" onClick={() => {alert:'ONVONN'}}/>
    </>
  );
}
