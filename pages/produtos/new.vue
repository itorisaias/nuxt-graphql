<template>
  <div>
    <h1>Cadastro de produto</h1>

    <Button label="Voltar" to="/produtos" />

    <div v-show="!loading" class="flex flex-col p-2">
      <form ref="form" @submit.prevent="handleCreateProduto">
        <Input v-model="form.title" label="Nome" />

        <Input v-model="form.purchasePrice" label="Preco 1" type="number" />

        <Input v-model="form.resalePrice" label="Preco 2" type="number" />

        <Input label="Foto" type="file" @input="handleUploadImg" />

        <img
          v-if="form.photos.url"
          :src="form.photos.url"
          :alt="`Foto do produto ${form.title}`"
          srcset=""
        />

        <Button label="Cadastrar" type="submit" />
      </form>
    </div>
    <div v-show="loading">loading...</div>

    <pre>{{ form }}</pre>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const createProduto = gql`
  mutation(
    $title: String!
    $purchasePrice: Float!
    $resalePrice: Float!
    $photos: [ID!]
  ) {
    createProduto(
      input: {
        data: {
          title: $title
          purchase_price: $purchasePrice
          resale_price: $resalePrice
          photos: $photos
        }
      }
    ) {
      produto {
        id
      }
    }
  }
`

const uploadFile = gql`
  mutation($file: Upload!) {
    upload(file: $file) {
      id
      url
    }
  }
`

export default {
  data: () => ({
    form: {
      title: null,
      purchasePrice: null,
      resalePrice: null,
      photos: {
        url: null,
        id: null,
      },
    },
    loading: false,
  }),
  // asyncData({ app }) {
  //   const { apolloProvider } = app

  //   const r = apolloProvider.defaultClient.query

  //   console.log({ r, myquery })
  // },
  methods: {
    handleUploadImg(files) {
      const file = files[0]
      const fileReader = new FileReader()

      fileReader.onload = async (e) => {
        this.form.photos.url = e.target.result

        try {
          const { data } = await this.$apollo.mutate({
            mutation: uploadFile,
            variables: {
              file,
            },
          })

          this.form.photos.url = `http://localhost:1337${data.upload.url}`
          this.form.photos.id = data.upload.id
        } catch (error) {
          console.error(error)
        }
      }

      fileReader.readAsDataURL(file)
    },
    async handleCreateProduto() {
      try {
        if (
          !this.form.title ||
          !this.form.purchasePrice ||
          !this.form.resalePrice ||
          !this.form.photos.id
        )
          return

        this.loading = true

        await this.$apollo.mutate({
          mutation: createProduto,
          variables: {
            title: this.form.title,
            purchasePrice: Number(this.form.purchasePrice),
            resalePrice: Number(this.form.resalePrice),
            photos: [this.form.photos.id],
          },
        })

        this.$refs.form.reset()
        this.form = {
          title: null,
          purchasePrice: null,
          resalePrice: null,
          photos: {
            url: null,
            id: null,
          },
        }

        // console.log(data.createProduto.produto)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
