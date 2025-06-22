<h1 align="center">✨ m3ripple</h1>
<p align="center">Bring Material 3(You) Ripple Effect to your <b>React</b> projects!</p>

<div align="center"><a href="https://m3ripple.js.org/">Live Demo</a></div><br />

<div align="center">
  <video src="https://github.com/user-attachments/assets/5b8cd5e6-5c91-4ca1-bc4d-50d5781a8be9" />
</div>
  
## Features
- ✨ Ripple Effect with sparkle easily realized on the web
- 😍 Well-tuned behavior with no faltering
- 🎨 Highly customizable in terms of ripple color, number of sparkles, clarity, etc.
- ⚡ High speed drawing for Sparkles by canvas
- ✅ Ripple effect in Material 2 is also supported

## Getting Started
### Install
#### Bun
```bash
bun install @m_three_ui/m3ripple
```
#### Others
<details>
  <summary>npm</summary>
  <pre>npm i @m_three_ui/m3ripple</pre>
</details>
<details>
  <summary>pnpm</summary>
  <pre>pnpm add @m_three_ui/m3ripple</pre>
</details>
<details>
  <summary>Yarn</summary>
  <pre>yarn add @m_three_ui/m3ripple</pre>
</details>

### Use
Import `<RippleContainer>` component(based on `<div />`) and set props.

#### Example
```tsx
import { RippleContainer } from '@m_three_ui/m3ripple'; //import it
import styles from './some_css_file.module.css';

const YourComponent = () => {
  return (
    <RippleContainer
      isMaterial3={true} {/* optional, default: true */}
      className={styles.rippleContainer} {/* optional */}
      rippleColor="hsla(29,81%,84%,0.15)" {/* optional */}
      sparklesColorRGB="255 255 255" {/* optional */}
      opacity_level1="0.4" {/* optional */}
      opacity_level2="0.1" {/* optional */}
    >
      <div className={styles.children} /> {/* children here */}
    </RippleContainer>
  );
};

export default YourComponent;
```
