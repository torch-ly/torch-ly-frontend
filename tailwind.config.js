module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        "background": "#eae2b7",
        "primary": "#003049",
        "primary-light": "#1a4a63",
        "accent-light": "#F77F00",
        "accent": "#D62828",
        "popup": "rgba(0,0,0,0.33)",
        "highlight": "rgba(255, 255, 255, 0.2)"
      },
      borderColor: {
        "background": "#EAE2B7",
        "primary": "#003049",
        "primary-light": "#1a4a63",
        "accent": "#D62828",
        "accent-light": "#F77F00"
      },
      textColor: {
        "background": "#EAE2B7",
        "primary": "#003049",
        "primary-light": "#1a4a63",
        "accent": "#D62828",
        "accent-light": "#F77F00"
      }
    }
  },
  variants: {
    borderWidth: ['responsive', "hover", "active"],
    margin: ["responsive", "last"]
  },
  plugins: []
}
