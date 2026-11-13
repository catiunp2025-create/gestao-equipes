import { HttpNotFoundError } from '../../common/errors/base/HttpNotFoundError.js';

const message = 'Usuário não encontrado';
const error = 'UserNotFound';

export class UserNotFound extends HttpNotFoundError {
  constructor() {
    super(message, error);
  }
}
