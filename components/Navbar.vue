<template>
  <Container>
    <header class="flex flex-col lg:flex-row justify-between items-center mb-5 pt-5">
      <div class="flex w-full lg:w-auto items-center justify-between rounded-full">
        <a href="/" class="text-lg">
          <img src="~/assets/images/logo1.png" width="70" height="100" alt="logo" />
        </a>

        <div class="block lg:hidden">
          <button @click="open = !open" class="text-gray-800">
            <svg fill="currentColor" class="w-4 h-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path v-show="open" fill-rule="evenodd" clip-rule="evenodd"
                d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z">
              </path>
              <path v-show="!open" fill-rule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z">
              </path>
            </svg>
          </button>
        </div>
      </div>
      <nav class="w-full lg:w-auto lg:flex lg:mt-0" :class="{ block: open, hidden: !open }">
        <ul class="flex flex-col lg:flex-row lg:gap-3">
          <li v-for="item of menuitems" :key="item.title">
            <NavLink :href="item.path" styleName="default">
              {{ item.title }}
            </NavLink>
          </li>
        </ul>
        <div class="lg:hidden flex w-16 items-start relative">
          <div class="dropdown my-2">
            <Button @click="isMobileDropdownOpen = !isMobileDropdownOpen" styleName="outline"
              class="dropdown-toggle cursor-pointer">CV</Button>
            <div v-show="isMobileDropdownOpen"
              class="dropdown-menu absolute bg-white shadow-md mt-2 left-0 flex flex-col space-y-2">
              <NavLink href="/cv/szabolcs-nogradi.pdf" :isBlank="true" block styleName="outline">ENG</NavLink>
              <NavLink href="/cv/nogradi-szabolcs.pdf" :isBlank="true" block styleName="outline">HU</NavLink>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <div class="hidden lg:flex w-16 items-start relative">
          <div class="dropdown mb-2">
            <Button @click="isDesktopDropdownOpen = !isDesktopDropdownOpen" styleName="outline"
              class="dropdown-toggle cursor-pointer">CV</Button>
            <div v-show="isDesktopDropdownOpen"
              class="dropdown-menu absolute bg-white shadow-md mt-2 flex flex-col space-y-1">
              <NavLink href="/cv/szabolcs-nogradi.pdf" :isBlank="true" block styleName="outline">ENG</NavLink>
              <NavLink href="/cv/nogradi-szabolcs.pdf" :isBlank="true" block styleName="outline">HU</NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  </Container>
</template>

<script setup>
const menuitems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Fun?",
    path: "/fun",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const open = ref(false);
const isMobileDropdownOpen = ref(false);
const isDesktopDropdownOpen = ref(false);
</script>
