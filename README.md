![Github CI](https://github.com/Huluvu424242/liona-router/workflows/Github%20CI/badge.svg)
[![npm](https://img.shields.io/npm/v/@huluvu424242/liona-router.svg)](https://www.npmjs.com/package/@huluvu424242/liona-router)
[![npm](https://img.shields.io/npm/dm/@huluvu424242/liona-router.svg)](https://www.npmjs.com/package/@huluvu424242/liona-router)
[![Donate with paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://paypal.me/huluvu424242)
![Keybase BTC](https://img.shields.io/keybase/btc/huluvu424242)

# liona-router
Modul to realize an simple router for SPA.
## Installation 
```sh
npm install @huluvu424242/liona-router --save
yarn add @huluvu424242/liona-router
bower install @huluvu424242/liona-router --save
```
## Usage
Beispiel für die Verwendung in einer einfachen Stencil Webkomponente.
### TypeScript
```typescript jsx
    {!this.route || this.route === "/" || this.route === "/index.html" || this.route === "/news" ? <honey-news-feed ref={(el) => {
      // @ts-ignore
      this.newsFeed = el as HTMLHoneyNewsFeedElement
    }}/> : null}
    {this.route === "/feeds" ? <honey-news-feeds ref={(el) => {
      // @ts-ignore
      this.feedAdministration = el as HTMLHoneyNewsFeedsElement
    }
    }/> : null}
    {this.route === "/statistic" ? <honey-news-statistic/> : null}
    {this.route === "/about" ? <About/> : null}
```
```sh
Output should be an response
```
## Test 
```sh
npm run test
```
