export default {
  template: `
    <div>
     <h1>Single-file JavaScript Component</h1>
     <p>{{ message }}</p>
    </div>
  `,
  data() {
    return {
      message: 'the component'
    }
  }
};