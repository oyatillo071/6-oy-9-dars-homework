import React from "react";

function About() {
  return (
    <div>
      <section class="align-element py-20">
        <div class="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
          <h1 class="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
            We love
          </h1>
          <div class="stats bg-primary shadow">
            <div class="stat">
              <div class="stat-title text-primary-content text-4xl font-bold tracking-widest">
                comfy
              </div>
            </div>
          </div>
        </div>
        <p class="mt-6 text-lg leading-8 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae
          quam blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia
          optio aut! Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo
          sed officiis ea tempore! Similique eos minima sit porro, ratione
          aspernatur!
        </p>
      </section>
    </div>
  );
}

export default About;
