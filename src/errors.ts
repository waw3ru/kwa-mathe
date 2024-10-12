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
}
