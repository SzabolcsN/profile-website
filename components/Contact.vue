<script setup>
import { ref, onMounted } from "vue";
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

const formRef = ref(null);
const resultRef = ref(null);

const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.value;
    const result = resultRef.value;

    form.classList.add("was-validated");

    if (!form.checkValidity()) {
        form.querySelectorAll(":invalid")[0].focus();
        return;
    }
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData.entries());

    result.innerHTML = "Sending...";
    result.style.display = "block";
    const config = useRuntimeConfig();

    try {
        const response = await emailjs.send(
            config.public.emailjsServiceId,
            config.public.emailjsTemplateId,
            formDataObject,
            {
                publicKey: config.public.emailjsPublicKey,
            },
        );
        console.log(response)

        if (response.status === 200) {
            result.classList.add("text-green-500");
            result.innerHTML = "Message sent successfully.";
        } else {
            result.classList.add("text-red-500");
            result.innerHTML = response.message || "Failed to send the message.";
        }
    } catch (error) {
        if (error instanceof EmailJSResponseStatus) {
            console.log('EMAILJS FAILED...', error);
            return;
        }
        console.error("Error:", error);
        result.classList.add("text-red-500");
        result.innerHTML = "Something went wrong. Please try again later.";
    } finally {
        form.reset();
        form.classList.remove("was-validated");
        setTimeout(() => {
            result.style.display = "none";
        }, 5000);
    }
};

onMounted(() => {
    const form = formRef.value;
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
});
</script>

<template>
    <form id="form" ref="formRef" class="needs-validation" novalidate>
        <input type="checkbox" class="hidden" style="display: none" name="botcheck" />

        <div class="mb-5">
            <input id="full_name" type="text" name="name" placeholder="Full Name" required
                class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100" />
            <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
                Please provide your full name.
            </div>
        </div>

        <div class="mb-5">
            <label for="email_address" class="sr-only">Email Address</label>
            <input id="email_address" type="email" name="email" placeholder="Email Address" required
                class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100" />
            <div class="empty-feedback text-red-400 text-sm mt-1">
                Please provide your email address.
            </div>
            <div class="invalid-feedback text-red-400 text-sm mt-1">
                Please provide a valid email address.
            </div>
        </div>

        <div class="mb-3">
            <textarea id="message" name="message" placeholder="Your Message" required
                class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none h-36 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"></textarea>
            <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
                Please enter your message.
            </div>
        </div>

        <button type="submit" class="w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Send Message
        </button>

        <div id="result" ref="resultRef" class="mt-3 text-center"></div>
    </form>
</template>

<style scoped>
.invalid-feedback,
.empty-feedback {
    display: none;
}

.was-validated :placeholder-shown:invalid~.empty-feedback {
    display: block;
}

.was-validated :not(:placeholder-shown):invalid~.invalid-feedback {
    display: block;
}

.is-invalid,
.was-validated :invalid {
    border-color: #dc3545;
}
</style>
