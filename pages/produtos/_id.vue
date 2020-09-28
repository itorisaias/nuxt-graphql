<template>
  <div class="w-full rounded shadow bg-blue-500 bg-opacity-25 p-1 m-2">
    <Button> teste </Button>
    <NuxtLink to="/produtos"> Voltar </NuxtLink>

    <h1>Detalhe do produto</h1>

    <div class="flex flex-col">
      <span><strong>id:</strong> {{ produto.id }}</span>
      <span><strong>title:</strong> {{ produto.title }}</span>
      <span><strong>purchase_price:</strong> {{ produto.purchase_price }}</span>
      <span><strong>resale_price:</strong> {{ produto.resale_price }}</span>
      <span><strong>created_at:</strong> {{ produto.created_at }}</span>
      <span><strong>updated_at:</strong> {{ produto.updated_at }}</span>
    </div>

    <Input
      id="email"
      v-model="email"
      label="E-mail"
      placeholder="Digite seu e-mail"
      type="text"
    />

    {{ email }}

    <img
      v-for="photo in produto.photos"
      :key="photo.id"
      :src="`http://localhost:1337${photo.url}`"
      :alt="photo.name"
      class="rounded"
      width="200"
      srcset=""
    />
  </div>
</template>

<script>
import gql from 'graphql-tag'

const productQuery = gql`
  query produto($id: ID!) {
    produto(id: $id) {
      id
      title
      purchase_price
      resale_price
      created_at
      updated_at
      photos {
        id
        created_at
        updated_at
        name
        caption
        formats
        url
        previewUrl
        provider
        ext
      }
    }
  }
`

export default {
  data: () => ({
    produto: {},
    email: 'itor.isaias@gmail.com.br',
  }),
  apollo: {
    produto: {
      prefetch: true,
      query: productQuery,
      variables() {
        return { id: parseInt(this.$route.params.id) }
      },
    },
  },
}
</script>
