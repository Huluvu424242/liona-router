import {ReplaySubject, Subject, Subscription} from "rxjs";

export class SimpleRouter {

    protected routes: Map<string, string>;

    protected route: Subject<string> = new ReplaySubject<string>();

    protected basePath: string;

    protected slot: HTMLElement | null;

    constructor() {
        this.slot = null;
        this.basePath = "";
        this.routes = new Map();
        this.activateWindowListener();
    }

    protected updateContextWith(route: string): void {
        if (this.slot) {
            // push route context
            const context: string | undefined = this.routes.get(route);
            if (context) {
                this.slot.innerHTML = context;
            } else {
                this.slot.innerHTML = "";
            }
        }
    }

    public activateWindowListener() {
        if (!window) return;
        window.onpopstate = () => {
            // push route name
            const route: string = window.location.pathname;
            this.route.next(route.replace(this.basePath, ""));
            this.updateContextWith(route);
        }
    }

    public setBasePath(routenprefix: string): void {
        if (routenprefix) {
            this.basePath = routenprefix;
        }
    }

    public setSlotElement(slot: HTMLElement): void {
        this.slot = slot;
    }

    public addRouteToSlot(route: string, content: string): void {
        // assign context to route
        this.routes.set(route, content);
    }

    public navigateToRoute(route: string): void {
        // push route name to browser history
        window.history.pushState({}, route, window.location.origin + this.basePath + route);
        // push route name
        this.route.next(route);
        this.updateContextWith(route);
    }

    public getRouteListener(): Subject<string> {
        return this.route;
    }
}

export const router: SimpleRouter = new SimpleRouter();

export const activateWindowListener = (): void => {
    router.activateWindowListener();
};

export const subscribeRoute = (next: (route: string) => void, error: (error: string) => void, complete: () => void): Subscription => {
    return router.getRouteListener().subscribe(next, error, complete);
};

export const setBasePath = (basePath: string) => {
    router.setBasePath(basePath);
};

export const setRouterSlotElement = (slot: HTMLElement): void => {
    router.setSlotElement(slot);
};

export const addRoute = (route: string, content: string): void => {
    router.addRouteToSlot(route, content);
};

export const navigateToRoute = (route: string) => {
    router.navigateToRoute(route);
};




