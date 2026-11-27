export default () => ({
  props: {
    title: { type: 'string', required: true },
    description: { type: 'string', default: '' },
  },
});
