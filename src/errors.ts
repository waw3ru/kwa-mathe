export class GenericError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GenericError';
  }
}

export class NotFoundError extends GenericError {
  override name = 'NotFoundError';
}

export class AlreadyExistsError extends GenericError {
  override name = 'AlreadyExistsError';
  readonly data: unknown;

  constructor(message: string, data: unknown) {
    super(message);
    this.data = data;
  }
}

export class OpError extends GenericError {
  override name = 'OpError';
  readonly opName: string;

  constructor(message: string, opName: string) {
    super(message);
    this.opName = opName;
  }
}
