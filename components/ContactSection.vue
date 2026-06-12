<script setup lang="ts">
const content = usePortfolio()
const contact = computed(() => content.value.contact)
</script>

<template>
  <section class="contact" id="contact">
    <div class="container">
      <h2 class="contact-title">{{ contact.title }}</h2>
      <p class="contact-lead">{{ contact.lead }}</p>
      <a class="contact-email" :href="`mailto:${contact.email}`">
        <span class="contact-email-text">{{ contact.email }}</span>
        <span class="cta-arr">→</span>
      </a>
      <div class="contact-socials">
        <a href="https://github.com/Deniz09OK" target="_blank" rel="noopener">GITHUB ↗</a>
        <a href="https://www.linkedin.com/in/deniz-ok/" target="_blank" rel="noopener">LINKEDIN ↗</a>
        <a :href="`mailto:${contact.email}`">EMAIL ↗</a>
      </div>
    </div>
  </section>
</template>
