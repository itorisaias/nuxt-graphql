export default {
  title: 'Input',
}

export const Input = () => `
  <div>
    <Input
      label="E-mail"
      id="email"
      placeholder="Digite seu e-mail"
      type="text"
      error="E-mail invalido"
    />
    <Input
      label="Senha"
      id="password"
      placeholder="Digite sua senha"
      type="password"
    />
  </div>
`
