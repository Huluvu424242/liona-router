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
@Component({
  tag: "honey-news",
  styleUrl: "AppShell.css",
  assetsDirs: ['assets'],
  shadow: true
})
export class AppShell {

/**
   * base of remote site
   */
  @Prop({reflect: true, attribute: "site-basepath"}) siteBasePath;
  /**
   * base of local site
   */
  @Prop({reflect: true, attribute: "local-basepath"}) localBasePath;
  routerSubscription: Subscription = null;
  @State() route: string = "";

public connectedCallback() {
    // attribute initialisieren wenn defaults notwendig
    this.localBasePath = this.hostElement.getAttribute("local-basepath") || "/";
    this.siteBasePath = this.hostElement.getAttribute("site-basepath") || "/";
    /// base initialisieren
    const curLocation:string = window.location.origin;
    const isLocal:boolean = curLocation.startsWith("http://localhost") 
                         || curLocation.startsWith("https://localhost");
    const basePath = isLocal? this.localBasePath:this.siteBasePath;
    router.setRoutenPrefix(basePath);
    // route initialisieren
    if (basePath === "/") {
      this.route = window.location.pathname;
    }else{
      this.route = window.location.pathname.replace(basePath, "");
    }
    this.routerSubscription = subscribeRoute((route: string) => {
        this.route = route;
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.info("Router Subject' complete");
      });
  }

  public disconnectedCallback() {
    this.routerSubscription.unsubscribe();
  }

  public render() {
    return (
      <Host class="paper">

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

      </Host>
    );
  }
}
```
```sh
Output should be an response
```
## Test 
```sh
npm run test
```
