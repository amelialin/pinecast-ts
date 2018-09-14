export class NotFoundError extends Error {}

export class RedirectException extends Error {
  toURL: string;

  constructor(toURL: string) {
    super(`Redirected to ${toURL}`);
    this.toURL = toURL;
  }
}

export class AuthRequiredException extends Error {}
