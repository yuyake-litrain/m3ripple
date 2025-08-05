<h1 align="center">✨ m3ripple</h1>
<p align="center">Bring Material 3(You) Ripple Effect to your <b>React</b> projects!</p>
<div align="center">

[![NPM Version](https://img.shields.io/npm/v/%40m_three_ui%2Fm3ripple?style=for-the-badge&logo=npm&logoColor=white&labelColor=%235c4b39&color=%23363024)](https://www.npmjs.com/package/@m_three_ui/m3ripple)
[![npm package minimized gzipped size (scoped)](https://img.shields.io/bundlejs/size/%40m_three_ui/m3ripple?style=for-the-badge&labelColor=%235c4b39&color=%23363024)](#)
[![GitHub License](https://img.shields.io/github/license/yuyake-litrain/m3ripple?style=for-the-badge&labelColor=%235c4b39&color=%23363024)](https://github.com/yuyake-litrain/m3ripple/blob/main/LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dy/%40m_three_ui%2Fm3ripple?style=for-the-badge&logo=npm&logoColor=white&labelColor=%235c4b39&color=%23363024)](https://npmtrends.com/@m_three_ui/m3ripple)
[![GitHub Repo stars](https://img.shields.io/github/stars/yuyake-litrain/m3ripple?style=for-the-badge&labelColor=%235c4b39&color=%23363024)](#)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/yuyake-litrain/m3ripple/main.yml?style=for-the-badge&labelColor=%235c4b39&color=%23363024)](https://github.com/yuyake-litrain/m3ripple/actions/workflows/main.yml)
</div>
<div align="center"><a href="https://m3ripple.js.org/"><b>Live Demo</b></a></div><br />

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
import '@m_three_ui/m3ripple/css' // import css

import styles from './some_css_file.module.css';

const YourComponent = () => {
  return (
    <RippleContainer
      isMaterial3 = {true}
      beforeRippleFn = {(event) =>{}}
      className = {styles.rippleContainer}
      rippleColor = "hsla(29,81%,84%,0.15)"
      sparklesColorRGB = "255 255 255"
      opacity_level1 = "0.4"
      opacity_level2 = "0.1"
      sparklesMaxCount = 2048
      divProps = {{}}
      onMouseDown = {() => {}}
      onTouchStart = {() => {}}
      onTouchMove = {() => {}}
      onMouseUp = {() => {}}
      onTouchEnd = {() => {}}
      onMouseLeave = {() => {}}
      onTouchCancel = {() => {}}
    >
      <div className={styles.children} />
    </RippleContainer>
  );
};

export default YourComponent;
```
<div align="center">

|Property|optional|explanation|default|type|
|----|----|----|----|----|
|`isMaterial3`|yes|Whether to use ripple of Material 3|`true`|`boolean`|
|`beforeRippleFn`|yes|A function to be executed when a click occurs and just before the ripple is displayed (used for example to display a button shadow)|`()=>{}`|`(event: React.MouseEvent \| React.TouchEvent) => void`|
|`className`|yes|Since RippleContainer is rendered as a div element, this is the ClassName of that div element.|`""`|`string`|
|`children`|yes|Child Elements of RippleContainer|`undefined`|`ReactNode`|
|`rippleColor`|yes|Ripple Effect Colors. If transparency is not specified, the overlap will not be visible when multiple clicks are made.|`"#ffffff35"`|`string`|
|`sparklesColorRGB`|yes|Specify sparkle color as space-separated RGB. Transparency cannot be specified.|`"255 255 255"`|`string`|
|`opacity_level1`|yes|Transparency just before the sparkle disappears. *The transparency when initially displayed is calculated by the current progress of the Ripple Effect|`"0.2"`|`string`|
|`opacity_level2`|yes|Transparency just before Sparkles disappear.Set after opacity_level1.|`"0.1"`|`string`|
|`sparklesMaxCount`|yes|Total amount of dots representing sparkle.|`2048`|`number`|
|`divProps`|yes|Since the RippleContainer is rendered as a Div element, you can pass Div element Props.|`{}`|`Omit<ComponentPropsWithoutRef<'div'>, \| 'className' \| 'onMouseDown' \| 'onMouseUp' \| 'onMouseLeave' \| 'onTouchStart' \| 'onTouchMove' \| 'onTouchEnd' \| 'onTouchCancel'>`|
|`onMouseDown`, `onMouseUp`, `onMouseLeave`, `onTouchStart`, `onTouchMove`, `onTouchEnd`, `onTouchCancel`|yes|Props to handle events without interfering with the Ripple Effect implementation. one function is accepted. *Rather than using this, we recommend wrapping the RippleContainer itself in another HTML element and defining a handler for that element.|`()=>{}`|`(event) => void`|
</div>
