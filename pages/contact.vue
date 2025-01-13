<template>
  <Container>
    <div class="grid md:grid-cols-2 gap-10 mx-auto max-w-4xl mt-16">
      <div>
        <h2 class="font-medium text-2xl text-gray-800">
          Contact me
        </h2>
        <p class="text-lg leading-relaxed text-slate-500 mt-3">
          Got something on your mind? Let's chat about your ideas, projects, or whatever else
        </p>
        <div class="mt-5">
          <div class="flex items-center mt-2 space-x-2 text-gray-600">
            <Icon class="text-gray-400 w-4 h-4" name="uil:map-marker" />
            <span>Mórahalom, Hungary</span>
          </div>
          <div class="flex items-center mt-2 space-x-2 text-gray-600">
            <Icon class="text-gray-400 w-4 h-4" name="uil:envelope" /><a
              href="mailto:nogradiszabolcs24@gmail.com">nogradiszabolcs24@gmail.com</a>
          </div>
          <div class="flex items-center mt-2 space-x-2 text-gray-600">
            <Icon class="text-gray-400 w-4 h-4" name="uil:phone" /><a href="tel:+36 30 811 6043">+36 30 811 6043</a>
          </div>
        </div>
      </div>
      <div>
        <Contact />
      </div>
    </div>
  </Container>
</template>