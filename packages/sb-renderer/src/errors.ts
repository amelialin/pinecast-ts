export class NotFoundError extends Error {}

export class RedirectException extends Error {
  toURL: string;
  code: number;

  constructor(toURL: string, code: number = 302) {
    super(`Redirected to ${toURL}`);
    this.toURL = toURL;
    this.code = code;
  }
}

export class AuthRequiredException extends Error {}
