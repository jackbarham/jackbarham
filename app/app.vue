<script setup lang="ts">
const query = groq`*[_type == "homePage"][0]{ title, intro }`
const { data: home } = await useSanityQuery<{ title: string; intro?: string } | null>(query)
</script>

<template>
  <div>
    <h1>{{ home?.title || 'Jack Barham' }}</h1>
    <p v-if="home?.intro">{{ home.intro }}</p>
  </div>
</template>
