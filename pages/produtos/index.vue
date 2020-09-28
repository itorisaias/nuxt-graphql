<template>
  <div>
    <h1>Lista de produtos</h1>

    <Button label="Cadastrar Produto" to="/produtos/new" />

    <ul>
      <li
        v-for="produto in produtos"
        :key="produto.id"
        class="bg-blue-500 my-1 mx-10 rounded"
      >
        <NuxtLink :to="`/produtos/${produto.id}`" class="flex justify-center">
          <p>title: {{ produto.title }}</p>
          <p>purchase_price: {{ produto.purchase_price }}</p>
          <p>resale_price: {{ produto.resale_price }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const productsQuery = gql`
  query produtos {
    produtos {
      id
      title
      purchase_price
      resale_price
    }
  }
`

export default {
  async asyncData({ app }) {
    const result = await app.apolloProvider.defaultClient.query({
      query: productsQuery,
    })

    return result.data
  },
  data: () => ({
    produtos: [],
  }),
  mounted() {
    console.log('ok')
  },
}
</script>
