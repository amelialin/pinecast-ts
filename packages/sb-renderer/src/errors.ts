export class NotFoundError extends Error {}

export class RedirectException extends Error {
  toURL: string;

  constructor(toURL) {
    super(`Redirected to ${toURL}`);
    this.toURL = toURL;
  }
}
