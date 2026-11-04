import { HttpConflictError } from '../../common/errors/base/HttpConflictError.js';

const message = 'Email já em uso';
const error = 'UserEmailAlreadyExist';

export class UserEmailAlreadyExist extends HttpConflictError {
  constructor() {
    super(message, error);
  }
}
