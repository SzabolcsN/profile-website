<template>
    <div class="project-list container mx-auto px-4 py-8">
        <ul class="space-y-6">
            <li v-for="(project, index) in projects" :key="index"
                class="project-item bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <h2 class="text-2xl font-semibold text-gray-800">
                    {{ project.name }}
                </h2>
                <p class="text-gray-600 italic mb-2">
                    {{ project.features.join(', ') }}
                </p>
                <p v-if="project.description" class="text-gray-600">
                    <strong class="font-medium text-gray-800">About:</strong> {{ project.description }}
                </p>
                <ul class="list-disc list-inside text-gray-600">
                    <li v-for="(detail, i) in project.details" :key="i">{{ detail }}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "ProjectList",
    props: {
        projects: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
};
</script>