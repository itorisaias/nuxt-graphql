export default {
  title: 'Button',
}

export const Button = () => `
  <div>
    <Button>Default</Button>
    <Button color="primary">primary button</Button>
    <Button color="secondary">secondary button</Button>
    <Button color="warning">warning button</Button>
    <Button color="error">error button</Button>
    <Button color="success" disabled>success disabled button</Button>
    <Button disabled>disabled button</Button>
    <Button outline>outline button</Button>
  </div>
`
