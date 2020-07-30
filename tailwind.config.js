module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        "background": "#EAE2B7",
        "primary": "#003049",
        "accent-light": "#F77F00",
        "accent": "#D62828",
        "popup": "rgba(0,0,0,0.33)",
        "highlight": "rgba(255, 255, 255, 0.2)"
      },
      borderColor: {
        "background": "#EAE2B7",
        "primary": "#003049",
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
