<script setup lang="ts">
import { HTB_PROFILE_URL, THM_PROFILE_URL } from '~/shared/site'

const content = usePortfolio()
const { lang } = useLang()
const contact = computed(() => content.value.contact)
const cvUrl = computed(() => CV_URLS[lang.value])
</script>

<template>
  <section class="contact" id="contact">
    <div class="container">
      <span class="section-label">{{ content.sectionLabels.contact }}</span>
      <h2 class="contact-title">{{ contact.title }}</h2>
      <p class="contact-lead">{{ contact.lead }}</p>
      <p class="contact-availability">{{ contact.availability }}</p>
      <a class="contact-email" :href="`mailto:${contact.email}`">
        <span class="contact-email-text">{{ contact.email }}</span>
        <span class="cta-arr" aria-hidden="true">→</span>
      </a>
      <div class="contact-socials">
        <a :href="cvUrl" target="_blank" rel="noopener noreferrer">CV PDF <span aria-hidden="true">↗</span></a>
        <a href="https://github.com/Deniz09OK" target="_blank" rel="noopener noreferrer">GITHUB <span aria-hidden="true">↗</span></a>
        <a href="https://www.linkedin.com/in/deniz-ok/" target="_blank" rel="noopener noreferrer">LINKEDIN <span aria-hidden="true">↗</span></a>
        <a :href="THM_PROFILE_URL" target="_blank" rel="noopener noreferrer">TRYHACKME <span aria-hidden="true">↗</span></a>
        <a :href="HTB_PROFILE_URL" target="_blank" rel="noopener noreferrer">HACKTHEBOX <span aria-hidden="true">↗</span></a>
        <a :href="`mailto:${contact.email}`">EMAIL <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>
</template>
