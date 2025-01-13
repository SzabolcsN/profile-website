<script setup>
const projects = [
        {
          name: "GOmontir",
          description: "Built an administrative system that makes it easy to manage users and services, handle appointments, and process payments. Features include interactive statistical dashboards, an interactive map, and tools for scheduling appointments, providing a seamless experience for both users and administrators.",
          features: ["Node.js", "MongoDB", "Nuxt.js", "Vue.js", "Tailwind CSS", "Docker"],
          details: [
            "User Management: Listing, validation, and management of users with four levels of authorization.",
            "Role-Based UI: Rendering the UI dynamically based on user authorization.",
            "Data Insights: Filtering registration, login, transactions, and financial data by date and displaying them through interactive graphs.",
            "Map Integration: Displaying workshops on a map with advanced filtering options.",
            "Interactive Calendar: Managing and displaying tasks automatically after appointment booking using an interactive workshop calendar.",
            "Payment Integration: Integrated SimplePay and DokuPay for secure and efficient transactions.",
            "Time Zone Handling: Ensured consistent functionality across different time zones for scheduling and tasks.",
            "Backend API Updates: Edited and added new features to an existing backend API for enhanced functionality.",
            "Database Migrations: Designed and executed MongoDB migrations to support new features and data structures.",
            "Feature Planning: Strategically planned and implemented new features to streamline development across the backend and frontend.",
            "Feature Toggles: Developed new features with the flexibility to easily enable or disable them without unnecessary overhead.",
          ],
        },
        {
          name: "GOmontir mobile app",
          features: ["React Native", "Redux"],
          details: [
            "SDK Updates: Updated the SDK version to ensure compatibility and improved performance.",
            "App Deployment: Developed and published new versions of the application on Google Play and the App Store.",
            "Feature Enhancements: Added new functionalities and refactored existing features to improve usability and maintainability.",
            "Location-Based Services: Implemented location-based navigation and service search for a personalized user experience.",
            "User Communication: Enabled chat functionality between users and service providers for seamless communication.",
            "Transaction Management: Developed robust transaction and payment handling features to ensure secure and efficient operations.",
          ],
        },
        {
          name: "Solar panels sales",
          description: "Developed a web application for solar panel sales, designed to work offline and equipped with tools for sales representatives to create quotes and streamline contract agreements efficiently.",
          features: ["Nuxt.js", "Vue.js", "Tailwind CSS", "Apollo Client", "GraphQL"],
          details: [
            "Progressive Web App Development: Built a Progressive Web App (PWA) using the Nuxt framework for enhanced performance and usability.",
            "Offline Functionality: Ensured seamless offline access by making item data and prices available offline, allowing sales representatives to use the application without an internet connection.",
            "Data Synchronization: Implemented automatic synchronization with the database to update changes when reconnecting to an online environment.",
            "Version Control: Introduced version control for contract and item prices to ensure consistency and traceability.",
            "Contract Integrity: Ensured contracts accurately referenced the version of the item list they were generated from, maintaining reliability and accountability.",
            "Change Tracking: Enabled tracking of changes in prices or availability for existing contracts to provide transparency and up-to-date information.",
          ],
        },
      ]
</script>

<template>
  <Container>
    <Sectionhead>
      <template v-slot:title>Previous projects</template>
      <template v-slot:desc>Unfortunately, my previous projects are private, but I can provide a brief overview of the larger projects I worked on at my previous workplace.</template>
    </Sectionhead>
    <ProjectList :projects="projects" />
  </Container>
</template>