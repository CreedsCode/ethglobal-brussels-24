"use client"

import React from "react";
import UserTag from "../../components/UserTag";
import ProjectCard from "../../components/ProjectCard";
import { Zighead } from "~~/public/fonts/fonts";

export default function Page() {
  return (
    <div className="container mx-auto h-screen max-w-md flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-end items-end">
        <UserTag 
          username="JohnDoe"
          profileImage="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-start items-start">
          <h1 className={`${Zighead.className} text-9xl leading-[0.8]`}>Funder Quest</h1>
        </div>
        <div className="flex flex-row justify-start items-start">
          <h2 className="text-[40px] italic font-extralight leading-tight">Funding humanity through giving</h2>
        </div>
      </div>  
      <div className="flex flex-col gap-4">
        <ProjectCard
          title="This title is too cool"
          userImageUrl="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
          username="darph"
          imageUrl="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" 
          description="Cool description"
          />
          <ProjectCard
          title="This title is too cool"
          userImageUrl="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
          username="darph"
          imageUrl="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" 
          description="Cool description"
          />
      </div>
    </div>
  );
}