export class Route {
    constructor(path, router) {
        this.path = path;
        this.router = router;
    }
}

export class ExcludedRoute {
    constructor(path, method) {
        this.path = path;
        this.method = method;
    }
}
